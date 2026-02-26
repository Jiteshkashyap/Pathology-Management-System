import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({

  name: { type: String,required: true,trim: true },
  tests: [{ type: mongoose.Schema.Types.ObjectId,ref: "Test",required: true }],
  discountPercentage: { type: Number,default: 0 },
  isActive: { type: Boolean, default: true }

}, { timestamps: true });

packageSchema.index({ isActive: 1, createdAt: -1 });


const PackageModel = mongoose.model("Package", packageSchema);

export default PackageModel;