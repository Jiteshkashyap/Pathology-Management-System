import { createTest,getTests,updateTest,deleteTest } from "../services/testService.js";
import redisClient from "../config/redis.js";

export const createTestHandler=async(req,res)=>{
    try {
        const test = await createTest(req.body)
        
        const keys=await redisClient.keys('tests:list*')
        if(keys.length)await redisClient.del(keys)
        
            res.status(201).json({
                message:"Test Created Succesfully",
                data:test
            })
    } catch (error) {
        res.status(400).json({ message: error.message });
  }
}

export const getTestsHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;

    // const cacheKey = `test:list:${page}:${limit}:${category || "all"}`;

    // let cached = null;

    // try {
    //   cached = await redisClient.get(cacheKey);
    // } catch (err) {
    //   console.log("Redis not available, skipping cache");
    // }

    // if (cached) {
    //   return res.json(JSON.parse(cached));
    // }

    const result = await getTests({
      page: Number(page),
      limit: Number(limit),
      category
    });

   
    // try {
    //   await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    // } catch (err) {
    //   console.log("Redis set failed");
    // }

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
          export const updateTestHandler = async (req, res) => {
              try {
                   const { id } = req.params;

                     const updated = await updateTest(id, req.body);

                    if (!updated) throw new Error("Test not found");

                    const keys = await redisClient.keys("test:list*");
                    if (keys.length) await redisClient.del(keys);

             res.status(200).json({
             message: "Test updated successfully",
             data: updated
});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteTest(id);

    const keys = await redisClient.keys("test:list*");
    if (keys.length) await redisClient.del(keys);

    res.json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};