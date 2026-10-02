function buildGeminiContents(message, history) {
  const contents = [];

  for (const item of history.slice(-8)) {
    const role = item.role === "assistant" ? "model" : "user";
    if ((item.content || "").trim()) {
      contents.push({
        role,
        parts: [{ text: item.content.trim() }],
      });
    }
  }

  contents.push({
    role: "user",
    parts: [{ text: message.trim() }],
  });

  return contents;
}

function getFallbackSkinGuidance(message) {
  const concern = message.toLowerCase();
  const guidance = [
    "Keep your routine gentle: use a mild cleanser, fragrance-free moisturizer, and broad-spectrum SPF 30+ every morning.",
  ];

  if (/(dry|dull|dehydrat|flak)/.test(concern)) {
    guidance.push(
      "For dryness, apply moisturizer to slightly damp skin and look for glycerin, hyaluronic acid, ceramides, or squalane. Avoid hot water and strong scrubs."
    );
  }

  if (/(acne|pimple|breakout|mark|spot)/.test(concern)) {
    guidance.push(
      "For acne or marks, introduce one active at a time. Niacinamide or azelaic acid can be gentler starting options; do not pick active spots."
    );
  }

  if (/(sensitive|irritat|redness|rash|burn)/.test(concern)) {
    guidance.push(
      "For sensitive skin, choose fragrance-free products, patch test new products, and pause exfoliating acids or retinoids if your skin stings or burns."
    );
  }

  guidance.push(
    "If symptoms are painful, spreading, bleeding, infected, or do not improve, please see a dermatologist."
  );

  return `Here is general skincare guidance:\n\n${guidance.map((item) => `- ${item}`).join("\n")}`;
}

function readGeminiJson(text) {
  const json = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(json);
}

async function searchProductWithGemini(query) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const payload = {
    systemInstruction: {
      parts: [{
        text: 'You are a skincare product information assistant. Return only valid JSON, never markdown. Do not invent an exact ingredient list, price, rating, or product when you are not confident it exists. For a recognizable skincare product, return {name, brand, description, safe_ingredients, acne_triggers, comedogenic_score}. safe_ingredients and acne_triggers must be short arrays of notable ingredients or concerns based on publicly known product information; use [] when uncertain. comedogenic_score is a cautious 0 to 5 estimate. description must include a brief uncertainty note if formula may vary by region or version. For an unrecognizable query return {"notFound":true}. This is educational information, not medical advice.',
      }],
    },
    contents: [{ role: "user", parts: [{ text: `Find and summarize this skincare product: ${query.trim()}` }] }],
    generationConfig: {
      temperature: 0.15,
      maxOutputTokens: 500,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = new Error(`Gemini product search failed with status ${response.status}`);
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();
  if (!text) return null;

  let product;
  try {
    product = readGeminiJson(text);
  } catch {
    return null;
  }

  if (!product || product.notFound || !product.name || !product.brand) return null;
  return {
    id: `gemini-${Buffer.from(`${product.brand}-${product.name}`).toString("base64url")}`,
    name: String(product.name),
    brand: String(product.brand),
    description: String(product.description || "AI-generated skincare product summary. Check the package label before use."),
    safe_ingredients: Array.isArray(product.safe_ingredients) ? product.safe_ingredients.map(String).slice(0, 8) : [],
    acne_triggers: Array.isArray(product.acne_triggers) ? product.acne_triggers.map(String).slice(0, 8) : [],
    comedogenic_score: Math.max(0, Math.min(5, Number(product.comedogenic_score) || 0)),
    source: "gemini",
  };
}

async function askGeminiSkinAssistant(message, history) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackSkinGuidance(message);
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const payload = {
    systemInstruction: {
      parts: [
        {
          text: "You are DermaAI, a friendly skincare assistant. Give practical, general skincare guidance, routine suggestions, ingredient explanations, and questions that help understand the user's skin concern. Keep answers concise and easy to follow. Do not diagnose diseases or claim certainty from text alone. For severe, painful, spreading, bleeding, infected, or persistent symptoms, advise consulting a qualified dermatologist.",
        },
      ],
    },
    contents: buildGeminiContents(message, history),
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 700,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = new Error(`Gemini request failed with status ${response.status}`);
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    const error = new Error("Gemini returned an unexpected response");
    error.statusCode = 502;
    throw error;
  }

  return parts.map((part) => part.text || "").join("\n").trim();
}

module.exports = { askGeminiSkinAssistant, getFallbackSkinGuidance, searchProductWithGemini };
