import { createDoctor,updateDoctor,getDoctors,deleteDoctor } from "../services/doctorService.js";
import redisClient from "../config/redis.js";

export const createDoctorHandler=async(req,res)=>{
    try {
        const {name,email,specialization,phone}=req.body
        const doctor= await createDoctor({name,email,specialization,phone})

        const keys = await redisClient.keys("doctor:list:*");
        if (keys.length > 0) await redisClient.del(keys);
            
        res.status(201).json({
            message:'Doctor Created Succesfully',
            data:doctor
        })        
    } catch (error) {
        res.status(400).json({ message:error.message})
    }
}

export const getDoctorsHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, specialization } = req.query;

    // const cacheKey = `doctor:list:${page}:${limit}:${specialization || 'all'}`;

    // const cached = await redisClient.get(cacheKey);
    // if (cached) return res.json(JSON.parse(cached));

    const result = await getDoctors({
      page: Number(page),
      limit: Number(limit),
      specialization
    });

    // await redisClient.setEx(cacheKey, 300, JSON.stringify(result));

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDoctorHandler=async(req,res)=>{
    try {
        const{id}=req.params
        const {name,email,specialization,phone}=req.body;

        const doctor=await updateDoctor(id,{name,email,specialization,phone})
        if(!doctor){
            throw new Error('Doctor not found')
        }

       const keys = await redisClient.keys("doctor:list:*");
       if (keys.length > 0) await redisClient.del(keys);

            return res.status(200).json({
                message:"Doctor Updated Succesfully",
                data:doctor
            })
    } catch (error) {
        res.status(400).json({ message:error.message})
    }
}

export const deleteDoctorHandler= async(req,res)=>{
    try {
        const {id}=req.params

        await deleteDoctor(id)
        
        const keys = await redisClient.keys("doctor:list:*");
        if (keys.length > 0) await redisClient.del(keys);
        res.json({message:"Doctor Deleted Succesfully"})
    } catch (error) {
        res.status(400).json({ message:error.message})
    }
}