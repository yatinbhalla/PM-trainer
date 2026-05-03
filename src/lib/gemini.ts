import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDailyChallenge() {
  const categories = ['Prioritization', 'Metrics', 'Strategy', 'Execution', 'User Research'];
  const topic = categories[Math.floor(Math.random() * categories.length)];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a daily product management challenge about ${topic}. Provide a realistic scenario that a junior/mid-level PM might face, the exact task they need to perform, and a hint pointing to a helpful framework.`,
    config: {
      responseMimeType: "application/json",
      systemInstruction: "You are an expert product management mentor generating engaging daily challenges.",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          topic: { type: Type.STRING },
          scenario: { type: Type.STRING, description: "A paragraph detailing the context and problem." },
          task: { type: Type.STRING, description: "A clear specific question or task for the user to answer." },
          hint: { type: Type.STRING, description: "A short hint referencing a framework to use (e.g. RICE, HEART)." }
        },
        required: ["title", "topic", "scenario", "task", "hint"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function evaluateChallengeResponse(challengeDetails: any, userResponse: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Challenge context:\n\nScenario: ${challengeDetails.scenario}\nTask: ${challengeDetails.task}\n\User Response: ${userResponse}\n\nEvaluate the user's response like a Senior Product Manager. Be constructive.`,
    config: {
      responseMimeType: "application/json",
      systemInstruction: "You are a Senior Product Manager evaluating a junior PM's approach. Be direct, constructive, and highlight both strengthes and areas for improvement. Assign an XP score from 10 to 50 based on quality.",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          feedback: { type: Type.STRING, description: "Markdown-formatted detailed feedback on their answer." },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
          score: { type: Type.NUMBER, description: "Score out of 50" },
          reflectionPrompt: { type: Type.STRING, description: "A follow-up thought question to deepen their learning." }
        },
        required: ["feedback", "strengths", "improvements", "score", "reflectionPrompt"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}
