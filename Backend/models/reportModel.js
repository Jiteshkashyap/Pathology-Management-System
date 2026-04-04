import mongoose from "mongoose";

const reportTestSchema= new mongoose.Schema({
        
    test:{type:mongoose.Schema.Types.ObjectId, ref:'Test', required:true},
    result:{type:Number},
    status:{type:String , enum:['Normal', 'High', 'Low']}
});

const reportSchema =  new mongoose.Schema({
    patientName:{type:String  , trim:true},
    patientEmail:{type:String },
    patientAge:{type:Number},
    appointment: {type: mongoose.Schema.Types.ObjectId, ref: "Appointment"},
    doctor:{type:mongoose.Schema.Types.ObjectId, ref:'Doctor', required:true},
    tests:[reportTestSchema],
    overallStatus:{type:String , enum:['Pending', 'Completed'], default:"Pending"},
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: false},
    pdfKey: { type: String, default: null},

    barcode:String
}, {timestamps:true});

reportSchema.index({appointment:1})
reportSchema.index({overallStatus:1, createdAt:-1})

const ReportModel =  mongoose.model('Report', reportSchema)
export default ReportModel;