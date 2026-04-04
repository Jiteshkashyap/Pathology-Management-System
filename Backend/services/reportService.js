import ReportModel from "../models/reportModel.js";
import PackageModel from "../models/packageModel.js";
import TestModel from "../models/testModel.js";
import BwipJs from "bwip-js";
import mongoose from "mongoose";
import AppointmentModel from "../models/appointmentModel.js";
import { createAuditLog } from "./auditService.js";

export const createreport = async (data) => {
  let testIds = [];
  let patientName;
  let patientEmail;
  let patientAge;
  let appointment = null;

  // If appointmentId provided
  if (data.appointmentId) {
     appointment = await AppointmentModel.findById(data.appointmentId)
      .populate("patient")
      .populate("tests")
      .populate("package");

    if (!appointment) {
      throw new Error("Appointment not found");
    }
    if (!appointment.patient) {
      throw new Error("Patient not found in appointment");
    }

    const existingReport = await ReportModel.findOne({
     appointment: data.appointmentId,
      });

if (existingReport) {
  throw new Error("Report already created for this appointment");
}

    // Get patient details
    patientName = appointment.patient.name;
    patientEmail = appointment.patient.email;
    patientAge = appointment.patient.age;

    // Get tests
   if (appointment.package) {
      testIds = appointment.package.tests.map(t => t._id || t);
    } else {
      testIds = appointment.tests.map(t => t._id || t);
    }

  } else {
    // Old Manual Flow
    patientName = data.patientName;
    patientEmail = data.patientEmail;
    patientAge = data.patientAge;

    if (data.packageId) {
      const pkg = await PackageModel.findById(data.packageId);
      if (!pkg) throw new Error("Package not found");
      testIds = pkg.tests;
    } else {
      testIds = data.tests;
    }
  }

  const report = await ReportModel.create({
    appointment: data.appointmentId || undefined,
    patient: appointment?.patient?._id || data.patient || null,
    patientName,
    patientEmail,
    patientAge,
    doctor: data.doctor,
    tests: testIds.map(id => ({ test: id }))
  });

  // Generate barcode
  const barcode = await BwipJs.toBuffer({
    bcid: "code128",
    text: report._id.toString(),
    scale: 3,
    height: 10
  });

  report.barcode = barcode.toString("base64");
  await report.save();

  //  Update appointment status if exists
  if (data.appointmentId) {
    await AppointmentModel.findByIdAndUpdate(
      data.appointmentId,
      { status: "completed" }
    );
  }

  return report;
};

export const updateResults = async (reportID, results,user) => {

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

    report.markModified("tests");
    await report.save();

    await createAuditLog({
    action: "REPORT_COMPLETED",
    user: user,
    resourceType: "Report",
    resourceId: report._id,
    metadata: { status: "Completed" },
});

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

export const getMyReports = async (user, { page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const query = {
  $or: [
    { patient: user.id },
    {
      patientEmail: {
        $regex: `^${user.email}$`,
        $options: "i"
      }
    }
  ]
};


  const [data, total] = await Promise.all([
    ReportModel.find(query)
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("patientName overallStatus createdAt pdfKey"),

    ReportModel.countDocuments(query)
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};