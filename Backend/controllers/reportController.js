import { createreport , updateResults ,getFullReport,getReports } from "../services/reportService.js";
import { getChannel } from "../config/rabbitmq.js";
import { generatePDFReport } from "../utils/pdfGenerator.js";

export const createReportHandler=async(req,res)=>{
    try {
        const report = await createreport(req.body)
        res.status(201).json({
            message:"Report created Succesfully"
        })
    } catch (error) {
      console.log("CREATE REPORT ERROR:", error);
        res.status(400).json({ message: error.message });
    }
}

export const updateResultsHandler = async (req, res) => {
  try {
    const report = await updateResults(req.params.id, req.body.results);
    
    const fullReport = await getFullReport(req.params.id)

    if (!fullReport) {
      throw new Error("Could not find the full report details for PDF generation.");
    }
   
    const pdfBuffer = await generatePDFReport(fullReport);

const channel = getChannel();

if (channel) {
  channel.sendToQueue(
    "reportEmailQueue",
    Buffer.from(
      JSON.stringify({
        email: fullReport.patientEmail,
        pdf: pdfBuffer.toString("base64"), 
      })
    )
  );
}


    res.status(200).json({
      message: "Report completed and email queue",
      data: report
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getReportsHandler = async (req, res) => {
  try {

    const {page=1 , limit=10}= req.query
    const reports = await getReports({
      page:Number(page),
      limit:Number(limit)
    });

    return res.status(200).json({
      success: true,
     ...reports,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch reports",
    });
  }
};