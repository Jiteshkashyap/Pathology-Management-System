import ReportModel from "../models/reportModel.js";
import PackageModel from "../models/packageModel.js";
import TestModel from "../models/testModel.js";
import BwipJs from "bwip-js";
import mongoose from "mongoose";

export const createreport = async(data)=>{
    let testIds=[]

    if(data.packageId){
        const pkg = await PackageModel.findById(data.pacakgeId)
        if(!pkg){
            throw new Error('Package not found')
        }
        testIds = pkg.tests
    }else{
        testIds=data.tests
    }
    

    const report = await ReportModel.create({
        patientName: data.patientName,
        patientEmail:data.patientEmail,
        patientAge:data.patientAge,
        doctor:data.doctor,
        tests:testIds.map(id=> ({test:id}))
    })

    const barcode= await BwipJs.toBuffer({
        bcid:'code128',
        text:report._id.toString(),
        scale:3,
        height:10
    });

    report.barcode= barcode.toString('base64')
    await report.save()
  
    return report;
}

export const updateResults = async (reportID, results) => {

    const report = await ReportModel.findById(reportID);
    if (!report) throw new Error('Report not found');

    for (const entry of results) {

        const test = await TestModel.findById(entry.testId);
        if (!test) continue;

        let status = 'Normal';

        if (entry.result < test.normalRange.min) {
            status = 'Low';
        }

        if (entry.result > test.normalRange.max) {
            status = 'High';
        }

        const testIndex = report.tests.findIndex(
            t => t.test.toString() === entry.testId
        );

        if (testIndex !== -1) {
            report.tests[testIndex].result = entry.result;
            report.tests[testIndex].status = status;
        }
    }

    report.overallStatus = 'Completed';
    await report.save();

    return report;
};

export const getFullReport = async (reportId) => {

  const objectId = new mongoose.Types.ObjectId(reportId);
  

  const result = await ReportModel.aggregate([

    { $match: { _id: objectId } },

    {
      $lookup: {
        from: "doctors",
        localField: "doctor",
        foreignField: "_id",
        as: "doctor"
      }
    },
    { $unwind: "$doctor" },

    {
      $lookup: {
        from: "tests",
        localField: "tests.test",
        foreignField: "_id",
        as: "testDocs"
      }
    },

    {
      $addFields: {
        tests: {
          $map: {
            input: "$tests",
            as: "t",
            in: {
              $mergeObjects: [
                "$$t",
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$testDocs",
                        as: "doc",
                        cond: { $eq: ["$$doc._id", "$$t.test"] }
                      }
                    },
                    0
                  ]
                }
              ]
            }
          }
        }
      }
    },

    {
      $project: {
        testDocs: 0
      }
    }

  ]);

  

  return result[0];
};

export const getReports = async ({ page = 1, limit = 10 }={}) => {
  const skip = (page - 1) * limit;

  const data = await ReportModel.find()
    .skip(skip)
    .limit(limit)
    .populate("doctor", "name specialization")
    .populate("tests.test", "name category unit normalRange")
    .sort({ createdAt: -1 });

  const total = await ReportModel.countDocuments();

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};