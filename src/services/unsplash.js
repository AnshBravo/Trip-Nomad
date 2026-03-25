// src/services/unsplash.js
export const getCityImage = async (cityName) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${cityName}+travel&orientation=portrait&per_page=1&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Return the "regular" size image, or a fallback if nothing is found
    return data.results[0]?.urls?.regular || "https://images.unsplash.com/photo-1488646953014-85cb44e25828";
  } catch (error) {
    console.error("Unsplash Error:", error);
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828";
  }
};