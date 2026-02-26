import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'

export const createUser= async(userData)=>{
    const exists = await UserModel.findOne({email:userData.email});
    if (exists) throw new Error('User with this email already exists')

        const hashed= await bcrypt.hash(userData.password,10)

        return await UserModel.create({
            ...userData,
            password:hashed
        })
    
}

export const loginUser= async(email,password)=>{
    const user= await UserModel.findOne({email});
    if(!user) throw new Error('Invalid email address')
    
    const decrypt= await bcrypt.compare(password,user.password)
    if(!decrypt)throw new Error('Invalid credentials')

    return user;
}