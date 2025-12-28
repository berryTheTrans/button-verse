import { GoogleGenAI, Type } from "@google/genai";
import { ButtonStyle, ButtonCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateButtonWithAI = async (prompt: string): Promise<ButtonStyle | null> => {
  try {
    const model = "gemini-3-flash-preview";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Create a beautiful, animated React Tailwind CSS button based on this description: "${prompt}".
      
      Requirements:
      1. Use ONLY standard Tailwind CSS utility classes.
      2. Ensure it has hover and active states for animation.
      3. Do NOT use external CSS.
      4. Make it visually impressive.
      
      Return a JSON object matching the schema.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "A creative name for the button style" },
            classes: { type: Type.STRING, description: "The full string of tailwind classes for the button className" },
            category: { type: Type.STRING, description: "One of: Minimal, Glow, 3D, Gradient, Retro, Glassmorphism" }
          },
          required: ["name", "classes", "category"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    
    if (!data.classes) return null;

    return {
      id: `ai-${Date.now()}`,
      name: data.name || "AI Magic Button",
      classes: data.classes,
      category: ButtonCategory.AI_GENERATED,
      tags: ["ai", "generated", "custom"]
    };

  } catch (error) {
    console.error("Error generating button:", error);
    return null;
  }
};