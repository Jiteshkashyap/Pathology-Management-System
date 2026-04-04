import { createreport , updateResults ,getFullReport,getReports ,getMyReports} from "../services/reportService.js";
import { getChannel } from "../config/rabbitmq.js";
import { generatePDFReport } from "../utils/pdfGenerator.js";
import s3 from "../config/s3.js";
import { PutObjectCommand , GetObjectCommand } from "@aws-sdk/client-s3";
import ReportModel from "../models/reportModel.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createAuditLog } from "../services/auditService.js";
import UserModel from "../models/userModel.js";

export const createReportHandler=async(req,res)=>{
    try {
        const report = await createreport(req.body)
        res.status(201).json({
            message:"Report created Succesfully",
            report
        })
    } catch (error) {
      console.log("CREATE REPORT ERROR:", error);
        res.status(400).json({ message: error.message });
    }
}

export const updateResultsHandler = async (req, res) => {
  try {

    // 1️ Update results
    const report = await updateResults(
      req.params.id,
      req.body.results,
      req.user
    );

    
    const fullReport = await getFullReport(req.params.id);

    if (!fullReport) {
      throw new Error("Could not find the full report details for PDF generation.");
    }

    const pdfBuffer = await generatePDFReport(fullReport);

    const fileKey = `reports/${fullReport._id}.pdf`;

    let updatedReport = report; // fallback

   
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
          Body: pdfBuffer,
          ContentType: "application/pdf",
        })
      );

   
      updatedReport = await ReportModel.findByIdAndUpdate(
        fullReport._id,
        { pdfKey: fileKey },
        { returnDocument: "after" } 
      );

    } catch (error) {
      console.log("S3 Upload failed:", error.message);
    }

   
    const channel = getChannel();

    if (channel) {
      channel.sendToQueue(
        "reportEmailQueue",
        Buffer.from(
          JSON.stringify({
            email: fullReport.patientEmail,
            pdf: pdfBuffer.toString("base64"),
            reportId: fullReport._id,
          })
        )
      );
    }

    
    res.status(200).json({
      message: "Report completed and email queue",
      data: updatedReport, 
    });

  } catch (error) {
    console.log("UPDATE REPORT ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};;


export const getReportsHandler = async (req, res) => {
  try {
    const reports = await getReports();

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch reports",
    });
  }
};

export const getReportDownloadUrl = async(req,res)=>{
  try {

    const report = await ReportModel.findById(req.params.id);
    if(!report || !report.pdfKey ){
        throw new Error('Report not found')
    }

    if (req.user.role === "patient") {
  const user = await UserModel.findById(req.user.id);

  if (
    report.patient?.toString() !== req.user.id &&
    report.patientEmail !== user.email
  ) {
    throw new Error("Unauthorized");
  }
}

    const command = new GetObjectCommand({
      Bucket:process.env.AWS_BUCKET_NAME,
      Key:report.pdfKey
    })
    const signedUrl = await getSignedUrl(s3 ,command,{
      expiresIn:300
    })

    res.json({downloadUrl: signedUrl})
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};


export const getMyReportsHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    if (req.user.role !== "patient") {
      return res.status(403).json({
        message: "Only patients can access this endpoint",
      });
    }

   
    const user = await UserModel.findById(req.user.id);

    const result = await getMyReports(user, {
      page: Number(page),
      limit: Number(limit),
    });

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};