import { generateHealthReport } from "../services/aiService.js";
import AIHealthModel from "../models/aiHealthModel.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const PDFParser = pdfParse.PDFParse || pdfParse;

export const analyzeHealthReport = async (req, res) => {
  try {
    console.log("1. Starting PDF parse");
  const parser = new PDFParser({
      data: new Uint8Array(req.file.buffer)
    });
const reportContent = await parser.getText();
console.log("2. PDF parsed");

const labTests = extractLabTests(reportContent.text);
console.log("3. Lab tests extracted", labTests);

console.log("4. Calling AI...");

    console.log("Detected Lab Tests:", labTests);

    console.log("Extracted Text:", reportContent.text);

   let { userQuestions } = req.body;

if (typeof userQuestions === "string") {
  userQuestions = JSON.parse(userQuestions);
}

    // Call AI Service
    const aiResult = await generateHealthReport({ report:labTests,userQuestions });
    console.log("5. AI finished", aiResult);

console.log("6. Saving to DB...");

function normalizeAI(ai) {

  // ADD THIS HELPER
  const parseIfStringArray = (arr = []) => {
    return arr.map((item) => {
      if (typeof item === "string") {
        try {
          return JSON.parse(item);
        } catch {
          return item;
        }
      }
      return item;
    });
  };

  //  PARSE FIRST (THIS IS THE FIX)
  ai.healthIssues = parseIfStringArray(ai.healthIssues);
  ai.improvementPlan = parseIfStringArray(ai.improvementPlan);
  ai.recoveryPlan = parseIfStringArray(ai.recoveryPlan);
  ai.userQuestions = parseIfStringArray(ai.userQuestions);



  // MODIFY THESE (IMPORTANT: support BOTH formats)

  const repairHealthIssues = (arr = []) => {
    // ✅ if already objects → return directly
    if (typeof arr[0] === "object") return arr;

    const res = [];
    for (let i = 0; i < arr.length; i += 8) {
      res.push({
        testName: arr[i + 1],
        issue: arr[i + 3],
        severity: arr[i + 5],
        reason: arr[i + 7]
      });
    }
    return res;
  };

  const repairImprovementPlan = (arr = []) => {
    if (typeof arr[0] === "object") return arr;

    const res = [];
    for (let i = 0; i < arr.length; i += 6) {
      res.push({
        diet: arr[i + 1],
        exercise: arr[i + 3],
        habit: arr[i + 5]
      });
    }
    return res;
  };

  const repairRecoveryPlan = (arr = []) => {
    if (typeof arr[0] === "object") return arr;

    const res = [];
    for (let i = 0; i < arr.length; i += 6) {
      res.push({
        day: arr[i + 1],
        plan: arr[i + 3],
        focus: arr[i + 5]
      });
    }
    return res;
  };

  const repairQuestions = (arr = []) => {
    if (typeof arr[0] === "object") return arr;

    const res = [];
    for (let i = 0; i < arr.length; i += 4) {
      res.push({
        question: arr[i + 1],
        answer: arr[i + 3]
      });
    }
    return res;
  };

  return {
    healthIssues: repairHealthIssues(ai.healthIssues),
    improvementPlan: repairImprovementPlan(ai.improvementPlan),
    recoveryPlan: repairRecoveryPlan(ai.recoveryPlan),
    userQuestions: repairQuestions(ai.userQuestions),
    goodIndicators: ai.goodIndicators || [],
    risks: ai.risks || [],
    summary: ai.summary || ""
  };
}

const safeAI = normalizeAI(aiResult);

    const healthReport = await  AIHealthModel.create({
        user:req.user.id,
        report:labTests,
        userQuestions,
        ...safeAI
        })

    return res.status(201).json({
      success: true,
      message: "Health analysis generated successfully",
      data: healthReport,
    });

  } catch (error) {
    console.error("AI Health Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze health report",
    });
  }
};

function extractLabTests(reportText) {

  const lines = reportText.split("\n");
  const tests = [];

  const regex =
    /([A-Za-z\s]+)\s+(\d+\.?\d*)\s*([a-zA-Z\/%]*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(Low|High|Normal)/i;

  for (const line of lines) {
    const match = line.match(regex);

    if (match) {
      tests.push({
        testName: match[1].trim(),
        result: Number(match[2]),
        units: match[3],
        normalRange: match[4],
        status: match[5]
      });
    }
  }

  return tests;
}