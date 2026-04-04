import {
  createDoctor,
  updateDoctor,
  getDoctors,
  deleteDoctor
} from "../services/doctorService.js";

import redisClient from "../config/redis.js";
import { uploadToS3 } from "../utils/s3helper.js";

export const createDoctorHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      specialization,
      phone,
      experience,
      description
    } = req.body;

    let imageUrl;

    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }

    const doctor = await createDoctor({
      name,
      email,
      specialization,
      phone,
      experience,
      description,
      image: imageUrl,
    });

    const keys = await redisClient.keys("doctor:list:*");
    if (keys.length > 0) await redisClient.del(keys);

    res.status(201).json({
      message: "Doctor Created Successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDoctorsHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, specialization } = req.query;

    const result = await getDoctors({
      page: Number(page),
      limit: Number(limit),
      specialization,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDoctorHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      specialization,
      phone,
      experience,
      description
    } = req.body;

    let imageUrl;

    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }

    const doctor = await updateDoctor(id, {
      name,
      email,
      specialization,
      phone,
      experience,
      description,
      ...(imageUrl && { image: imageUrl }),
    });

    if (!doctor) throw new Error("Doctor not found");

    const keys = await redisClient.keys("doctor:list:*");
    if (keys.length > 0) await redisClient.del(keys);

    res.status(200).json({
      message: "Doctor Updated Successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDoctorHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteDoctor(id);

    const keys = await redisClient.keys("doctor:list:*");
    if (keys.length > 0) await redisClient.del(keys);

    res.json({ message: "Doctor Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};