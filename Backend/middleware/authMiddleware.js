import { verifyAccessToken } from "../utils/token.js";

export const authMiddleware=async(req,res,next)=>{
    const token = req.cookies.accessToken
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded= verifyAccessToken(token)
        req.user=decoded
        next()

    }catch(error){
        return res.status(401).json({
            message:"Token Expired"
        })
    }
}

export const authorizeRoles=(...roles)=>(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.status(403).json({
            message:"Forbidden"
        })
    }
    next()
}