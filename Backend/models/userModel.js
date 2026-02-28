import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String },
    email:{type:String , required:true, unique:true ,lowercase:true},
    password:{type:String , required:true},
    role:{type:String , enum:['admin', 'technician'], default:'technician'}
})

userSchema.index({email:1})

const UserModel= mongoose.model('User', userSchema)

export default UserModel