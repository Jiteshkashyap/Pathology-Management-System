import UserModel from "../models/userModel.js";
import { getAdminAnalytics , getEmailLogs , getAuditLogs,getUsers } from "../services/adminService.js";

export const getAdminAnalyticsHandler = async (req, res) => {
  try {
    const { date } = req.query;

    const result = await getAdminAnalytics(date);

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmailLogsHandler = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;

    const result = await getEmailLogs({
      status,
      type,
      page: Number(page),
      limit: Number(limit),
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAuditLogsHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await getAuditLogs({
      page: Number(page),
      limit: Number(limit),
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsersHandler= async (req,res) =>{
  try {
    const {page =1 , limit = 10} = req.query;

    const result = await getUsers({
     page: Number(page),
     limit:Number(limit)
    })
    res.json(result)
    
  } catch (error) {
    res.status(400).json({ message:error.message })
  }
}