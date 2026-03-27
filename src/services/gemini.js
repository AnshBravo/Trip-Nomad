import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure your .env has VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Helper to extract JSON from AI markdown.
 * High-contrast/Dark-vibe logic: Ensuring we only get clean data.
 */
const parseJSON = (text) => {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    throw new Error("No JSON array found");
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
};

/**
 * 🛠️ SMART FETCH ENGINE
 * Tries multiple models to bypass 503 (High Demand) and 404 (Not Found) errors.
 */
const fetchWithFallback = async (prompt) => {
  // 2026 Model Priority List
  const models = [
    "gemini-3.1-flash-lite-preview", // 1st: Built for high-volume 2026 traffic
    "gemini-3-flash-preview",      // 2nd: Frontier speed
    "gemini-2.5-flash",            // 3rd: Stable but often busy (503)
  ];

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const data = parseJSON(text);
      
      if (data) return data;
    } catch (error) {
      // If it's a 503 (busy) or 404 (wrong ID), try the next model
      if (error.message.includes("503") || error.message.includes("404")) {
        console.warn(`⚠️ ${modelName} failed, switching models...`);
        continue;
      }
      // If it's an Auth error (401), stop immediately
      throw error;
    }
  }
  return null;
};

// 1. GET TRENDING PLACES (Landing Page)
export const getTrendingPlaces = async (count = 6) => {
  const prompt = `You are a travel expert for 'Trip Nomad'. 
  List ${count} globally trending travel destinations. 
  Return ONLY a JSON array. Each object MUST have:
  "city", "country", "description" (short), "level" (Beginner, Intermediate, Expert), "vibe" (Nature, Romantic, Adventure, Urban, Cultural, Beach).`;

  try {
    const data = await fetchWithFallback(prompt);
    if (data) return data;

    // Static Fallback if all API attempts fail
    return [
      { city: "Bali", country: "Indonesia", description: "Tropical paradise.", level: "Beginner", vibe: "Nature" },
      { city: "Tokyo", country: "Japan", description: "Neon cityscapes.", level: "Intermediate", vibe: "Urban" },
    ].slice(0, count);
  } catch (err) {
    console.error("Trending API Error:", err);
    return [];
  }
};

// 2. GET AI TRAVEL SUGGESTIONS (Search Feature)
export const getAITravelSuggestions = async (query) => {
  const prompt = `Suggest 20 travel destinations for search: "${query}". 
  Return ONLY a JSON array with: "city", "country", "description", "level", "vibe".`;

  try {
    console.log("🚀 AI is fetching for:", query);
    const data = await fetchWithFallback(prompt);
    
    if (data) {
      console.log("✅ AI Success!");
      return data;
    }

    // Static search fallback to keep UI alive
    return [
      { city: "Kyoto", country: "Japan", description: "Zen gardens.", level: "Intermediate", vibe: "Cultural" },
      { city: "Reykjavik", country: "Iceland", description: "Northern lights.", level: "Expert", vibe: "Adventure" },
    ];
  } catch (err) {
    console.error("Search API Error:", err);
    return [];
  }
};

// ... existing imports and fetchWithFallback ...

export const getSpecificPlacesInCountry = async (country) => {
  const prompt = `Provide exactly 5 of the best specific places/attractions to visit in ${country}.
  For each place, include:
  - "name": Name of the attraction or city
  - "description": A short, high-end travel description
  - "activities": An array of 3 top things to do there
  - "food": A specific must-try dish for that exact area
  Return ONLY a JSON array.`;

  try {
    const data = await fetchWithFallback(prompt);
    return data || [];
  } catch (err) {
    console.error("Country Details API Error:", err);
    return [];
  }
};