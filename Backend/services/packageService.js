import PackageModel from "../models/packageModel.js";
import mongoose from "mongoose";

export const createPackage= async(data)=>{
    const exists = await PackageModel.findOne({name:data.name})
    if(exists){
        throw new Error('Package with this name already exists')
    }
    return await PackageModel.create(data)
}
export const getPackages = async ({ page, limit }) => {
    const skip = (page - 1) * limit;

    const result = await PackageModel.aggregate([
        { $match: { isActive: true } },
        {
            $facet: {
                // Branch 1: Get the actual package data
                data: [
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: 'tests',
                            localField: 'tests',
                            foreignField: '_id',
                            as: "testDetails"
                        }
                    },
                    {
                        $addFields: {
                            totalPrice: { $sum: '$testDetails.price' }
                        }
                    },
                    {
                        $addFields: {
                            discountedPrice: {
                                $subtract: [
                                    '$totalPrice',
                                    {
                                        $multiply: [
                                            '$totalPrice',
                                            { $divide: ['$discountPercentage', 100] }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ],
                // Branch 2: Get the total count for pagination
                totalCount: [
                    { $count: 'count' }
                ]
            }
        }
    ]);

    // Safely extract data and total
    const packages = result[0]?.data || [];
    const total = result[0]?.totalCount[0]?.count || 0;

    return {
        data: packages,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
};



export const updatePackage= async(id,data)=>{
    return await PackageModel.findByIdAndUpdate(id,data,{
        returnDocument: "after",
        runValidators:true
    })
}
export const deletePackage = async (id) => {
  return await PackageModel.findByIdAndDelete(id);
};