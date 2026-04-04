import AuditLogModel from "../models/auditLogsModel.js";

export const createAuditLog = async ({
  action,
  user,
  resourceType,
  resourceId,
  metadata = {},
}) => {
  try {
    await AuditLogModel.create({
      action,
      performedBy: user.id,
      role: user.role,
      resourceType,
      resourceId,
      metadata,
    });
  } catch (error) {
    console.error("Audit log failed:", error.message);
  }
};