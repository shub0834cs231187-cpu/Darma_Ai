const SkinAnalysis = require("../models/SkinAnalysis");
const { analyzeSkinImage } = require("../utils/analysis");
const { askGeminiSkinAssistant } = require("../utils/gemini");
const { uploadFileOrFallbackDataUrl } = require("../utils/uploads");
const { createHttpError, getRequestUserId } = require("../utils/request");

async function uploadImage(req, res) {
  if (!req.file) {
    throw createHttpError(400, "File is required");
  }

  const imageUrl = await uploadFileOrFallbackDataUrl(req.file, "dermaai/analysis");
  res.json({ image_url: imageUrl });
}

async function skinChat(req, res) {
  const message = req.body?.message || "";
  const history = Array.isArray(req.body?.history) ? req.body.history : [];

  if (!message.trim()) {
    throw createHttpError(400, "Message is required");
  }

  const reply = await askGeminiSkinAssistant(message, history);
  res.json({ reply });
}

async function analyzeImage(req, res) {
  const imageUrl = req.body?.image_url;
  if (!imageUrl) {
    throw createHttpError(400, "image_url is required");
  }

  const userId = getRequestUserId(req);
  const result = analyzeSkinImage(imageUrl);

  const analysis = await SkinAnalysis.create({
    user_id: userId,
    image_url: imageUrl,
    ...result,
  });

  res.json({
    id: analysis.id,
    image_url: analysis.image_url,
    skin_score: analysis.skin_score,
    hydration_score: analysis.hydration_score,
    acne_score: analysis.acne_score,
    risk_score: analysis.risk_score,
    skin_type: analysis.skin_type,
    conditions: analysis.conditions,
    recommendations: analysis.recommendations,
    created_at: analysis.created_at,
  });
}

async function getAnalysisHistory(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;

  const analyses = await SkinAnalysis.find({ user_id: req.user.sub })
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    items: analyses.map((analysis) => ({
      id: analysis.id,
      image_url: analysis.image_url,
      skin_score: analysis.skin_score,
      hydration_score: analysis.hydration_score,
      acne_score: analysis.acne_score,
      risk_score: analysis.risk_score,
      skin_type: analysis.skin_type,
      conditions: analysis.conditions,
      created_at: analysis.created_at,
    })),
    page,
    limit,
  });
}

async function getAnalysis(req, res) {
  const analysis = await SkinAnalysis.findOne({
    id: req.params.analysis_id,
    user_id: req.user.sub,
  });
  if (!analysis) {
    throw createHttpError(404, "Analysis not found");
  }

  res.json({
    id: analysis.id,
    image_url: analysis.image_url,
    skin_score: analysis.skin_score,
    hydration_score: analysis.hydration_score,
    acne_score: analysis.acne_score,
    risk_score: analysis.risk_score,
    skin_type: analysis.skin_type,
    conditions: analysis.conditions,
    recommendations: analysis.recommendations,
    created_at: analysis.created_at,
  });
}

async function deleteAnalysis(req, res) {
  const analysis = await SkinAnalysis.findOneAndDelete({
    id: req.params.analysis_id,
    user_id: req.user.sub,
  });
  if (!analysis) {
    throw createHttpError(404, "Analysis not found");
  }

  res.json({ message: "Analysis deleted" });
}

module.exports = {
  uploadImage,
  skinChat,
  analyzeImage,
  getAnalysisHistory,
  getAnalysis,
  deleteAnalysis,
};
