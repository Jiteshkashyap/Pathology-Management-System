// import { getChannel } from "../config/rabbitmq.js";
// import nodemailer from 'nodemailer';

// export const startEmailWorker= async()=>{
//     const channel = getChannel()

//     channel.consume("reportEmailQueue", async (msg) => {
//   try {
//     console.log(" Job received");

//     const data = JSON.parse(msg.content.toString());
//     console.log("Email data:", data);

//     const transporter = nodemailer.createTransport({
//    host: "smtp.gmail.com",
//    port: 587,
//    secure: false,
//    auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls:{
//     family:4,
//   }
// });

//     console.log("📧 Sending email...");

//     await transporter.sendMail({
//   from: process.env.EMAIL_USER,
//   to: data.email,
//   subject: "Your Diagnostic Report",
//   text: "Please find attached report.",
//   attachments: [
//     {
//       filename: "report.pdf",
//       content: Buffer.from(data.pdf, "base64"), 
//       encoding: "base64", // ✅ ADD THIS
//       contentType: "application/pdf", // ✅ ADD THIS
//     },
//   ],
// });

//     console.log(" Email sent successfully");

//     channel.ack(msg);

//   } catch (error) {
//     console.log(" Email failed:", error);
//     channel.nack(msg, false, false);
//   }
// });
// }

import { getChannel } from "../config/rabbitmq.js";
import nodemailer from 'nodemailer';

// 1. Create the transporter ONCE outside the consumer
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // This is the CRITICAL fix for the ENETUNREACH error
  family: 4 
});

export const startEmailWorker = async () => {
  const channel = getChannel();

  channel.consume("reportEmailQueue", async (msg) => {
    if (!msg) return;

    try {
      console.log("📥 Job received from Queue");
      const data = JSON.parse(msg.content.toString());

      console.log("📧 Sending email to:", data.email);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Your Diagnostic Report",
        text: "Please find your attached report.",
        attachments: [
          {
            filename: "report.pdf",
            content: Buffer.from(data.pdf, "base64"),
            contentType: "application/pdf",
          },
        ],
      });

      console.log("✅ Email sent successfully");
      channel.ack(msg); // Confirm success to RabbitMQ

    } catch (error) {
      console.error(" Email failed:", error.message);
      
      d
      channel.nack(msg, false, false); 
    }
  });
};