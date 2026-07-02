const {
  getHairstyleRecommendation,
} = require("../services/openaiService");

const hairstyleRecommendation = async (req, res) => {
  try {
    console.log("Received:", req.body);

    const result = await getHairstyleRecommendation(req.body);

    console.log("AI Result:", result);

    res.json({
      success: true,
      recommendation: JSON.parse(result),
    });

  } catch (error) {
    console.error("FULL ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  hairstyleRecommendation,
};