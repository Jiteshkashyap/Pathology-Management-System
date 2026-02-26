import TestModel from "../models/testModel.js";

export const createTest= async(data)=>{
    const exists = await TestModel.findOne({name:data.name})
    if(exists) throw new Error('Test with this name already exists')

        return await TestModel.create(data)
}

export const getTests= async({page,limit,category})=>{
    const query={}

    if(category){
        query.category=category
    }
    const skip= (page-1)*limit

    const [data,total]=await Promise.all([
        TestModel.find(query).skip(skip).limit(limit).lean(),
        TestModel.countDocuments(query)
    ])

    return{
        data,
        total,
        page,
        totalPages:Math.ceil(total/limit)
    }
}

export const updateTest=async(id,data)=>{
    return await TestModel.findByIdAndUpdate(id,data,{
        returnDocument: "after",
        runValidators:true
    })
}

export const deleteTest=async(id)=>{
    return await TestModel.findByIdAndDelete(id)
}