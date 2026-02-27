import { createUser , loginUser } from "../services/authService.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.js";


export const register = async(req,res)=>{
    try {
        const user= await createUser(req.body);
        res.status(201).json({
            message:'User registered succesfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

export const login = async(req , res)=>{
    try {
        const {email,password}= req.body;
        const user= await loginUser(email,password);

        const accessToken= generateAccessToken(user)
        const refreshToken =generateRefreshToken(user)

        res.status(200).cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            maxAge:15*60*1000
        }).cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        }).json({
            message:"Login Succesfully",
            
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

export const refreshTokenHandler= async(req,res)=>{
  try {

    const token = req.cookies.refreshToken;

    if(!token)return res.status(401).json({
        message:'No Refresh Token'
    })
    const decoded= verifyRefreshToken(token)

    const accessToken= generateAccessToken({id:decoded.id , role:decoded.role})
    
    return res.status(200).cookie('accessToken',accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        maxAge:15*60*1000
    }).json({
        message:'Token Refreshed succesfully'
    })
    
  } catch (error) {
    res.status(401).json({
        message:"Invalid token refresh"
    })
  }
}

export const logout = async(req,res)=>{
     res.clearCookie('accessToken')
     res.clearCookie('refreshToken')

     res.json({
        message:"Logged Out Succesfully"
     })
}