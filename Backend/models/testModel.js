import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: { type: String,required: true,trim: true },
  category: { type: String,required: true,trim: true },
  unit: { type: String,required: true,trim: true },
  normalRange: {
   min: { type: Number,required: true },
   max: { type: Number,required: true }
  },
  price: { type: Number,required: true },
  isActive: { type: Boolean,default: true }
}, { timestamps: true });

testSchema.index({ name: 1,category: 1 });


const TestModel = mongoose.model("Test", testSchema);

export default TestModel;