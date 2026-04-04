import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true },
    resourceType: { type: String, required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

auditLogSchema.index({ createdAt: -1 });

const AuditLogModel = mongoose.model("AuditLog", auditLogSchema);

export default AuditLogModel;