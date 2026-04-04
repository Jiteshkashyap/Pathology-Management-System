import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
  {
    to: { type: String, required: true, },
    type: { type: String, enum: ["report", "appointment"], required: true, },
    status: { type: String, enum: ["success", "failed"], required: true, },
    attempts: { type: Number, default: 1, },
    error: { type: String, default: null, },
    referenceId: { type: mongoose.Schema.Types.ObjectId, default: null, },
  },
  { timestamps: true }
);

const EmailLogModel = mongoose.model("EmailLog", emailLogSchema);

export default EmailLogModel;