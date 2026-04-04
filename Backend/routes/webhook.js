import express from "express";
import { stripe } from "../config/stripe.js";
import { bookAppointment } from "../services/appointmentService.js";
import AppointmentModel from "../models/appointmentModel.js";

const router = express.Router();

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook Error:", err.message);
      return res.status(400).send();
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const bookingData = JSON.parse(session.metadata.bookingData);

      // prevent duplicate booking
      const exists = await AppointmentModel.findOne({
        paymentId: session.id,
      });

      if (!exists) {
        const appointment = await bookAppointment(bookingData);

        appointment.paymentId = session.id;
        appointment.paymentStatus = "paid";
        appointment.amount = session.amount_total / 100;

        await appointment.save();
      }
    }

    res.json({ received: true });
  }
);

export default router;