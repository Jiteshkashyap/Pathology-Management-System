import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type:String , required:true , trim:true},
    email:{type:String , required:true , unique:true , lowercase:true},
    specialization:{type:String , required:true,trim:true},
    phone:{type:String , required:true },
    image: { type: String },
    experience: { type: String },
    description: { type: String, trim: true },
    isActive:{type:Boolean , default:true}
},{timestamps:true})

doctorSchema.index({ specialization: 1 });
doctorSchema.index({ isActive: 1, createdAt: -1 });

const DoctorModel=mongoose.model('Doctor',doctorSchema)

export default DoctorModel;