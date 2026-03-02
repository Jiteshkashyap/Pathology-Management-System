import DoctorModel from '../models/doctorModel.js'

export const createDoctor=async(data)=>{
  return await DoctorModel.create(data)
}

export const getDoctors=async({page , limit , specialization})=>{
    const query={}
    if (specialization) {
    query.specialization = {$regex: specialization,
                            $options: "i",}}

    const skip=(page-1)*limit

    const [data,total]=await Promise.all([
        DoctorModel.find(query).skip(skip).limit(limit).lean(),
        DoctorModel.countDocuments(query)
    ])

    return {
        data,
        total,
        page,
        totalPages:Math.ceil(total/limit)
    }
}

export const updateDoctor=async(id,data)=>{
    return await DoctorModel.findByIdAndUpdate(id,data,{
        returnDocument: "after",
        runValidators:true
    })
}

export const deleteDoctor=async(id)=>{
    return await DoctorModel.findByIdAndDelete(id)
}