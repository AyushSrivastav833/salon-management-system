require("dotenv").config();

console.log("THIS IS THE NEW FILE");
console.log("KEY:", process.env.GEMINI_API_KEY);

module.exports = {
  getHairstyleRecommendation: async () => {
    console.log("INSIDE DUMMY AI");
    return JSON.stringify({
      recommendedStyles: ["Fade"],
      reason: "Dummy",
      maintenance: "Every 3 weeks",
      estimatedPrice: "₹300",
    });
  },
};