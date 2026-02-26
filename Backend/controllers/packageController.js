import {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage
} from "../services/packageService.js";

import redisClient from "../config/redis.js";


export const createPackageHandler = async (req, res) => {
  try {
    const pkg = await createPackage(req.body);

    try {

      const keys = await redisClient.keys("package:list*");
      if (keys.length) await redisClient.del(keys);
    } catch {}

    res.status(201).json({
      message: "Package created successfully",
      data: pkg
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPackagesHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const cacheKey = `package:list:${page}:${limit}`;
    

    let cached;
    try {
      cached = await redisClient.get(cacheKey);
    } catch {}

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await getPackages({
      page: Number(page),
      limit: Number(limit)
    });
    
    
    try {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    } catch {}

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePackageHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await updatePackage(id, req.body);
    if (!updated) throw new Error("Package not found");

   

    try {
      const keys = await redisClient.keys("package:list*");
      if (keys.length) await redisClient.del(keys);
    } catch {}

    res.json({
      message: "Package updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePackageHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deletePackage(id);
 

    try {
      const keys = await redisClient.keys("package:list*");
      if (keys.length) await redisClient.del(keys);
    } catch {}

    res.json({ message: "Package deleted successfully" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};