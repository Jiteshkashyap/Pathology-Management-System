import mongoose from "mongoose";

const reportTestSchema= new mongoose.Schema({
        
    test:{type:mongoose.Schema.Types.ObjectId, ref:'Test', required:true},
    result:{type:Number},
    status:{type:String , enum:['Normal', 'High', 'Low']}
});

const reportSchema =  new mongoose.Schema({
    patientName:{type:String , required:true , trim:true},
    patientEmail:{type:String },
    patientAge:{type:Number},
    doctor:{type:mongoose.Schema.Types.ObjectId, ref:'Doctor', required:true},
    tests:[reportTestSchema],
    overallStatus:{type:String , enum:['Pending', 'Completed'], default:"Pending"},

    barcode:String
}, {timestamps:true});

reportSchema.index({overallStatus:1, createdAt:-1})

const ReportModel =  mongoose.model('Report', reportSchema)
export default ReportModel;