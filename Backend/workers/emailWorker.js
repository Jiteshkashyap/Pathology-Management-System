import { getChannel } from "../config/rabbitmq.js";
import nodemailer from 'nodemailer';

export const startEmailWorker= async()=>{
    const channel = getChannel()

    channel.consume("reportEmailQueue", async (msg) => {
  try {
    console.log(" Job received");

    const data = JSON.parse(msg.content.toString());
    console.log("Email data:", data);

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    console.log("📧 Sending email...");

    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: data.email,
  subject: "Your Diagnostic Report",
  text: "Please find attached report.",
  attachments: [
    {
      filename: "report.pdf",
      content: Buffer.from(data.pdf, "base64"), 
      encoding: "base64", // ✅ ADD THIS
      contentType: "application/pdf", // ✅ ADD THIS
    },
  ],
});

    console.log(" Email sent successfully");

    channel.ack(msg);

  } catch (error) {
    console.log(" Email failed:", error);
    channel.nack(msg, false, false);
  }
});
}