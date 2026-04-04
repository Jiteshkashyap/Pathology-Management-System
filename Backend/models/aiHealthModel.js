import mongoose from "mongoose";



const healthIssues = new mongoose.Schema({
  testName: { type: String, required: true},
  issue: { type: String, required: true},
  severity: { type: String, enum: ["LOW", "HIGH", "NORMAL"], required: true},
  reason: { type: String, required: true}
}, { _id: false });



const improvementPlan = new mongoose.Schema({

  diet: { type: String, required: true },
  exercise: { type: String, required: true },
  habit: { type: String, required: true }

}, { _id: false });



const recoveryPlan = new mongoose.Schema({

  day: { type: Number, required: true},
  plan: { type: String, required: true},
  focus: { type: String, required: true}

}, { _id: false });



const aiHealthSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  healthIssues: [healthIssues],
  goodIndicators: [String],
  risks: [String],
  improvementPlan: [improvementPlan],
  recoveryPlan: [recoveryPlan],
  userQuestions: [{
    question: String,
    answer: String,
    _id:false
  }],
  // possibleCauses: [String],
  // severityScore: {
  //   hemoglobin: Number,
  //   bilirubin: Number,
  //   overallRisk: String
  // },
  summary: String,

}, { timestamps: true });

const AIHealthModel = mongoose.model("AIHealth", aiHealthSchema);

export default AIHealthModel;