const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getHairstyleRecommendation(data) {
  const prompt = `
You are an expert professional barber.

Suggest hairstyles based on:

Face Shape: ${data.faceShape}
Hair Type: ${data.hairType}
Hair Length: ${data.hairLength}
Lifestyle: ${data.lifestyle}

Return ONLY valid JSON like this:

{
  "recommendedStyles": ["Style1","Style2","Style3"],
  "reason":"Explain why.",
  "maintenance":"Every X weeks.",
  "estimatedPrice":"₹300-₹700"
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  getHairstyleRecommendation,
};