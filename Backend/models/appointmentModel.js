import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test"}],
    package: { type: mongoose.Schema.Types.ObjectId, ref: "Package"},
    appointmentDate: { type: Date, required: true },
    slotTime: { type: String, required: true },
    status: { type: String, enum: ["booked", "completed", "cancelled"], default: "booked" },
    paymentId: { type: String },
paymentStatus: {
  type: String,
  enum: ["pending", "paid", "failed"],
  default: "pending",
},
amount: { type: Number },
  },

  { timestamps: true }
);



appointmentSchema.index({ appointmentDate: 1, slotTime: 1 });
appointmentSchema.index({ patient: 1, appointmentDate: -1 });

const AppointmentModel = mongoose.model('Appointment',appointmentSchema)
export default AppointmentModel;