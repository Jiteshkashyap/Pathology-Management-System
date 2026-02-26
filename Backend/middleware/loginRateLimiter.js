import redisClient from "../config/redis.js";

export const loginRateLimiter=async(req,res,next)=>{
    try {
        const {email}=req.body

        const key =`login:${req.ip}:${email}`
        const attempts = await redisClient.incr(key)

        if(attempts===1){
            await redisClient.expire(key ,60) //1min window
        }
        if(attempts>5){
            return res.status(429).json({
                message:'Too Many login attempts,Please try again after 1 minute'
            })
        }
        next()
    } catch {
        next()
    }

}