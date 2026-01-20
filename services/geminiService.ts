import { GoogleGenAI } from "@google/genai";
import { SECTORS } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize the client only when needed to handle potential missing key gracefully
const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables");
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const getSectorAnalysis = async (
  message: string,
  currentSectorId: string | null
): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "I'm sorry, but I can't connect to the AI service right now. Please check your API key configuration.";
  }

  const currentSector = SECTORS.find((s) => s.id === currentSectorId) || SECTORS[0];
  
  // Construct a context-aware prompt with safe optional access
  const systemInstruction = `
    You are an expert Venture Capital Analyst specializing in the Chicago startup ecosystem for the year 2025.
    You are assisting a user reading a report titled "Chicago 2025: Venture Landscape".
    
    Current Context: The user is currently looking at the section: "${currentSector.title}".
    
    Here is the data for this section:
    Overview: ${currentSector.overview}
    Key Stats: ${currentSector.stats ? JSON.stringify(currentSector.stats) : 'N/A'}
    Notable Startups: ${currentSector.startups ? JSON.stringify(currentSector.startups) : 'N/A'}
    Insights: ${currentSector.insights || 'N/A'}
    Future Trends: ${currentSector.futureTrend || 'N/A'}
    
    Historical Data (2020-2025): ${currentSector.chartData ? JSON.stringify(currentSector.chartData) : 'N/A'}
    
    Your Goal: Answer the user's question concisely and professionally. 
    Use the provided data to back up your claims. 
    If the user asks about something outside this specific sector, you can refer to general Chicago tech trends (Fintech, Logistics, Health, Food, Manufacturing) but bring it back to the current context if relevant.
    Keep answers under 100 words unless asked for a deep dive.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error analyzing the market data. Please try again.";
  }
};