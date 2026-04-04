import AppointmentModel from "../models/appointmentModel.js";
import TestModel from "../models/testModel.js";
import PackageModel from "../models/packageModel.js";
import EmailLogModel from "../models/emailLogModel.js";
import AuditLogModel from "../models/auditLogsModel.js";
import UserModel from "../models/userModel.js";


export const getAdminAnalytics = async(date)=>{

      const match={}

      if(date){
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate()+1);

        match.appointmentDate={
            $gte:start,
            $lt:end
        }
      }

      const appointmentStats = await AppointmentModel.aggregate([
        { $match : match},
        { $group:{
            _id:'$status',
            count:{ $sum:1 }
        }}
      ]);

      let stats = {
        total:0,
        booked:0,
        completed:0,
        cancelled:0
      }

       appointmentStats.forEach((s)=>{
        stats[s._id]= s.count;
        stats.total +=s.count;
       })

    //    Revenue Estimation
    const revenueData = await AppointmentModel.aggregate([
        {
            $match: {...match , status:'completed'}
        },
        {
            $lookup:{
                from:'tests',
                localField:'test',
                foreignField:'_id',
                as:"testData",
            }
        },
        {
            $lookup:{
                from:'packages',
                localField:'package',
                foreignField:'_id',
                as:'packageData'
            }
        },
        {
            $addFields:{
                revenue:{
                    $cond:[
                        {$gt :[{ $size: '$testData'}, 0]},
                        {$arrayElemAt:['$testData.price',0]},
                        {
                            $cond: [
                                {$gt :[{$size : '$packageData'}, 0]},
                                {$arrayElemAt:['$packageData.discountedPrice', 0]},
                                0,
                            ]
                        }
                    ]
                }
            }
        },
        {
            $group:{
                _id:null,
                totalRevenue: {$sum :"$revenue"}
            }
        }
    ])

    

    const totalRevenue = revenueData[0]?.totalRevenue || 0 ;


    // Most Booked Test
const popularTests = await AppointmentModel.aggregate([
  { $match: { ...match, test: { $ne: null } } },

  {
    $group: {
      _id: "$test",
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
  { $limit: 5 },

  {
    $lookup: {
      from: "tests",
      localField: "_id",
      foreignField: "_id",
      as: "testDetails",
    },
  },
  { $unwind: "$testDetails" },

  {
    $project: {
      name: "$testDetails.name",
      count: 1,
      revenue: {
        $multiply: ["$count", "$testDetails.price"],
      },
    },
  },
]);

const popularPackages = await AppointmentModel.aggregate([
  { $match: { ...match, package: { $ne: null } } },

  {
    $group: {
      _id: "$package",
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
  { $limit: 5 },

  {
    $lookup: {
      from: "packages",
      localField: "_id",
      foreignField: "_id",
      as: "packageDetails",
    },
  },
  { $unwind: "$packageDetails" },

  //  get test details inside package
  {
    $lookup: {
      from: "tests",
      localField: "packageDetails.tests",
      foreignField: "_id",
      as: "testDetails",
    },
  },

  //  calculate total price
  {
    $addFields: {
      totalPrice: { $sum: "$testDetails.price" },
    },
  },

  //  calculate discounted price (same logic as your API)
  {
    $addFields: {
      discountedPrice: {
        $subtract: [
          "$totalPrice",
          {
            $multiply: [
              "$totalPrice",
              { $divide: ["$packageDetails.discountPercentage", 100] },
            ],
          },
        ],
      },
    },
  },

  //  final revenue
  {
    $project: {
      name: "$packageDetails.name",
      count: 1,
      revenue: {
        $multiply: ["$count", "$discountedPrice"],
      },
    },
  },
]);
    
    return {
        stats,
        totalRevenue,
        popularTests,
        popularPackages
    }

}


export const getEmailLogs = async ({
  status,
  type,
  page = 1,
  limit = 10,
}) => {
  const query = {};

  if (status) query.status = status;
  if (type) query.type = type;

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    EmailLogModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    EmailLogModel.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getAuditLogs = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    AuditLogModel.find()
      .populate("performedBy", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    AuditLogModel.countDocuments(),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};


export const getUsers = async({page =1 , limit =10})=>{
    const skip =(page-1)*limit;

    const [data , total]= await Promise.all([
    UserModel.find()
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit),
    UserModel.countDocuments(),
    ]);

    return {
        data ,
        total,
        page,
        totalPages: Math.ceil(total/limit)
    }
}
