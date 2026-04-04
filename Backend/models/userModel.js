import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String },
    email:{type:String , required:true, unique:true ,lowercase:true},
    password:{type:String , required:true},
    phone: {type: String, default: null,},
    role:{type:String , enum:['admin', 'technician','patient'], default:'patient'},
    age:{type:Number , default:null}
})



const UserModel= mongoose.model('User', userSchema)

export default UserModel