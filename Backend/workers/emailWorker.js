import { getChannel } from "../config/rabbitmq.js";
import sgMail from "@sendgrid/mail";
import EmailLogModel from "../models/emailLogModel.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send email with retry logic
 */
const sendWithRetry = async (mailOptions, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sgMail.send(mailOptions);
      return { success: true, attempts: attempt };
    } catch (error) {
      if (attempt === retries) {
        return {
          success: false,
          attempts: attempt,
          error:
            error.response?.body?.errors?.[0]?.message ||
            error.message,
        };
      }

      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 2000)
      );
    }
  }
};

export const startEmailWorker = async () => {
  const channel = getChannel();

  if (!channel) {
  throw new Error("RabbitMQ channel not initialized");
}

// limit load
channel.prefetch(1);

  /**
   * REPORT EMAIL QUEUE
   */
  channel.consume("reportEmailQueue", async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    const result = await sendWithRetry({
      to: data.email,
      from: process.env.EMAIL_FROM,
      subject: "Your Diagnostic Report",
      text: "Please find your attached report.",
      attachments: [
        {
          content: data.pdf,
          filename: "report.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    });

    // Log email result
    await EmailLogModel.create({
      to: data.email,
      type: "report",
      status: result.success ? "success" : "failed",
      attempts: result.attempts,
      error: result.error || null,
      referenceId: data.reportId || null,
    });

    if (result.success) {
      channel.ack(msg);
    } else {
      channel.nack(msg, false, false);
    }
  });

  /**
   * APPOINTMENT EMAIL QUEUE
   */
  

  channel.consume("appointmentEmailQueue", async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    const result = await sendWithRetry({
      to: data.email,
      from: process.env.EMAIL_FROM,
      subject: "Appointment Booking Confirmation",
      html: `
  <div style="font-family:sans-serif;padding:20px">
    <h2 style="color:#06b6d4;">Appointment Confirmed</h2>
    <p>Your appointment has been successfully booked.</p>

    <div style="margin-top:10px">
      <p><strong>Date:</strong> ${new Date(data.date).toDateString()}</p>
      <p><strong>Time:</strong> ${data.slot}</p>
    </div>

    <p style="margin-top:15px;color:#555">
      Please arrive 10 minutes before your scheduled time.
    </p>
  </div>
`,
    });

    //  Log email result
    await EmailLogModel.create({
      to: data.email,
      type: "appointment",
      status: result.success ? "success" : "failed",
      attempts: result.attempts,
      error: result.error || null,
      referenceId: data.appointmentId || null,
    });

    if (result.success) {
      channel.ack(msg);
    } else {
      channel.nack(msg, false, false);
    }
  });

  console.log(" Email Worker Started (with Logging + Retry)");
};