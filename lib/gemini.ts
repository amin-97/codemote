import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const gemini = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function getAIRecommendations(context: string): Promise<string> {
  const result = await gemini.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an expert coding interview coach. Based on the following LeetCode and system design progress data, provide personalized recommendations covering BOTH areas.

Respond ONLY with valid JSON in this exact format (no markdown, no code fences):
{
  "recommendations": [
    {
      "topic": "Topic Name",
      "reason": "Why they should focus on this",
      "suggested_questions": ["Question 1", "Question 2", "Question 3"],
      "priority": "high" | "medium" | "low"
    }
  ],
  "summary": "A brief overall assessment covering both LeetCode and system design readiness"
}

Include recommendations for both LeetCode topics AND system design topics where relevant. If the student hasn't started system design yet, strongly recommend they begin.

Student's progress data:
${context}`,
          },
        ],
      },
    ],
  });

  return result.response.text();
}

export async function getDailyInsight(context: string): Promise<string> {
  const result = await gemini.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a supportive coding interview coach. Based on yesterday's practice session, give a brief encouraging insight (2-3 sentences). Mention what topics they covered, what went well, and one thing to try today.

Yesterday's session:
${context}`,
          },
        ],
      },
    ],
  });

  return result.response.text();
}
