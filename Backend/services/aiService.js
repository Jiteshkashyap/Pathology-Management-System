import { GoogleGenAI } from "@google/genai";
import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GEMINI_API_KEY
})


const aiHealthSchema = z.object({

  healthIssues: z.array(
    z.object({
    testName: z.string().describe("Name of the medical test (e.g., Haemoglobin, Cholesterol)"),
    issue: z.string().describe("Clearly state the abnormal condition based on the result (e.g., Low Hemoglobin, High Cholesterol)"),
    severity: z.string().describe("Severity level of the issue: LOW, MEDIUM, or HIGH based on deviation from normal range"),
    reason: z.string().describe("Possible medical or lifestyle reason for this issue (e.g., iron deficiency, poor diet, lack of exercise)")
    })
  ).describe("List of all abnormal test results with medical explanation"),


  improvementPlan: z.array(
    z.object({
    diet: z.string().describe("Specific food recommendation to improve the condition (e.g., spinach, fruits, low-fat diet)"),
    exercise: z.string().describe("Recommended physical activity (e.g., walking, yoga, cardio) based on health condition"),
    habit: z.string().describe("Lifestyle habit to adopt (e.g., proper sleep, hydration, reduce stress, avoid smoking)")
    })
  ).describe("Actionable recommendations to improve overall health"),


  recoveryPlan: z.array(
    z.object({
      day: z.number().describe("Day number in the recovery plan (1 to 10)"),
      plan: z.string().describe("Daily actionable step combining diet, exercise, and habits for that day"),
      focus: z.string().describe("Main goal of the day (e.g., improve iron intake, boost immunity, reduce cholesterol)")
    })
  ).describe("Structured 10-day recovery plan to normalize health values"),


  userQuestions: z.array(
    z.object({
      question: z.string().describe("User's health-related question about their report (e.g., Why is my haemoglobin low?)"),
      answer: z.string().describe("Clear, simple, medically relevant answer based only on the report data")
    })
  ).describe("List of possible user questions and AI-generated answers based on report"),


  goodIndicators:z.array(z.string()).describe(
    "Mention test results that are within normal range and indicate good health"
  ),

  risks:z.array(z.string()).describe(
    "Potential health risks if abnormal values are not improved (e.g., fatigue, heart issues)"
  ),

  summary: z.string().describe(
    "Overall health summary explaining key findings in simple and concise language"
  )
//   possibleCauses: z.array(
//   z.string().describe("Possible medical causes behind the abnormal test results")
// ).describe("List of likely medical causes for the detected issues"),

// severityScore: z.object({
//   hemoglobin: z.number().describe("Severity score from 0-100 representing risk related to hemoglobin level"),
//   bilirubin: z.number().describe("Severity score from 0-100 representing risk related to bilirubin level"),
//   overallRisk: z.string().describe("Overall health risk level such as LOW, MODERATE, HIGH, or CRITICAL")
// }).describe("Risk scoring based on abnormal lab values"),

});

export const  generateHealthReport=async({ report, userQuestions })=> {

  const prompt = `
You are a medical report analysis AI.

Analyze the lab test results and generate a complete health analysis.

STRICT RULES:

1. If a test is LOW or HIGH, you MUST include it in healthIssues.
2. Generate at least 2 healthIssues if abnormalities exist.
3. Generate exactly 5 improvementPlan items.
4. Generate exactly 5 recoveryPlan steps.
5. Generate exactly 3 userQuestions with answers.
6. Provide a detailed summary.
7. Return ONLY valid JSON.

Return ONLY valid JSON.

JSON STRUCTURE:

{
 "healthIssues":[
  {
   "testName":"string",
   "issue":"string",
   "severity":"LOW | NORMAL | HIGH",
   "reason":"string"
  }
 ],

 "improvementPlan":[
  {
   "diet":"string",
   "exercise":"string",
   "habit":"string"
  }
 ],

 "recoveryPlan":[
  {
   "day":number,
   "plan":"string",
   "focus":"string"
  }
 ],

 "userQuestions":[
  {
   "question":"string",
   "answer":"string"
  }
 ],

 "goodIndicators":[string],
 "risks":[string],
 "summary":"string"


}

Lab Test Data:
${JSON.stringify(report, null, 2)}
`;


//   const prompt = `
// You are a medical report analysis assistant.

// Analyze the given health test data and return a structured JSON response.

// Rules:
// - Use only the provided data
// - Be specific and concise
// - Do not add any text outside JSON

// Input:
// ${JSON.stringify(report)}

// User Questions:
// ${JSON.stringify(userQuestions)}
// Return JSON only.
// `;
// const prompt = `
// You are a medical report analysis AI.

// Analyze the report and answer user questions.

// Return ONLY valid JSON.

// Do NOT include explanations or text outside JSON.

// Health Report:
// ${report}

// User Questions:
// ${JSON.stringify(userQuestions)}

// Return strictly JSON following the schema.
// `;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: zodToJsonSchema(aiHealthSchema)

    }
  });
const raw =
  response.text ||
  response.candidates?.[0]?.content?.parts?.[0]?.text ||
  "";

console.log("AI RAW RESPONSE:", raw);

if (!raw) {
  throw new Error("AI returned empty response");
}

let parsed;

try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error("Invalid JSON from AI:", raw);
  throw new Error("AI returned invalid JSON");
}

return parsed;



}



export default generateHealthReport;