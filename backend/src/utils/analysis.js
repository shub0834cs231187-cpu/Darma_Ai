function analyzeSkinImage(_imageUrl) {
  const skinTypes = ["dry", "oily", "combination", "sensitive", "normal"];
  const conditionsList = [
    ["slight_acne", "oily_forehead"],
    ["dryness", "sensitivity"],
    ["acne", "oily_t_zone"],
    ["wrinkles", "age_spots"],
    ["redness", "rosacea"],
    ["blackheads", "enlarged_pores"],
    ["pigmentation", "sun_damage"],
    ["dehydration"],
  ];

  const randomInRange = (min, max) =>
    Math.round((Math.random() * (max - min) + min) * 10) / 10;

  return {
    skin_score: randomInRange(4.5, 9.5),
    hydration_score: randomInRange(3.0, 9.0),
    acne_score: randomInRange(1.0, 8.0),
    risk_score: randomInRange(0.5, 7.0),
    skin_type: skinTypes[Math.floor(Math.random() * skinTypes.length)],
    conditions: conditionsList[Math.floor(Math.random() * conditionsList.length)],
    recommendations: ["gentle_cleanser", "moisturizer"],
  };
}

module.exports = { analyzeSkinImage };
