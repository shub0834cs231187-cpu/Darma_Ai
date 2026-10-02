const Recommendation = require("../models/Recommendation");
const { generateRecommendations } = require("../utils/recommendations");
const { getRequestUserId } = require("../utils/request");

async function generateRecommendationsEndpoint(req, res) {
  const skinType = req.body?.skin_type || "combination";
  const userId = getRequestUserId(req);
  const recommendationsData = generateRecommendations(skinType);

  const recommendation = await Recommendation.create({
    user_id: userId,
    skin_type: skinType,
    morning_routine: recommendationsData.morning_routine,
    night_routine: recommendationsData.night_routine,
    weekly_routine: recommendationsData.weekly_routine,
  });

  res.json({
    id: recommendation.id,
    skin_type: recommendation.skin_type,
    morning_routine: recommendation.morning_routine,
    night_routine: recommendation.night_routine,
    weekly_routine: recommendation.weekly_routine,
    created_at: recommendation.created_at,
  });
}

async function getRecommendations(req, res) {
  const userId = req.user?.sub || "demo-user";
  const recommendation = await Recommendation.findOne({ user_id: userId }).sort({
    created_at: -1,
  });

  if (!recommendation) {
    const recommendationsData = generateRecommendations("combination");
    return res.json({
      morning_routine: recommendationsData.morning_routine,
      night_routine: recommendationsData.night_routine,
      weekly_routine: recommendationsData.weekly_routine,
    });
  }

  return res.json({
    id: recommendation.id,
    morning_routine: recommendation.morning_routine,
    night_routine: recommendation.night_routine,
    weekly_routine: recommendation.weekly_routine,
    created_at: recommendation.created_at,
  });
}

async function getSkinRoutine(req, res) {
  const skinType = String(req.query.skin_type || "combination");
  res.json(generateRecommendations(skinType));
}

module.exports = {
  generateRecommendationsEndpoint,
  getRecommendations,
  getSkinRoutine,
};
