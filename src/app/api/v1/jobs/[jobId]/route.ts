import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import JobModel from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import User from "@/models/userModal";
import Application from "@/models/applicationModel";

connectDB();

// Initialize SendGrid with  API key
const key: any = process.env.sendGridKey;

sgMail.setApiKey(key);

// delete job
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    await validToken(request);

    const jobToDelete: any = await JobModel.findById(params.jobId);

    // Delete the job
    const deletedJob: any = await JobModel.findByIdAndDelete(params.jobId);

    // Find all applications related to the deleted job
    const applications = await Application.find({ job: params.jobId });

    //  send removal message to each applicant
    for (const application of applications) {
      const applicant = await User.findById(application.user);

      if (applicant) {
        const msg: any = {
          to: applicant.email,
          from: process.env.sendGridEmail,
          subject: `Removal of ${jobToDelete.title} Posting`,
          text: `Dear ${applicant.name},\n\nI hope this message finds you well.\n\nI wanted to inform you that the ${jobToDelete.title} position that you recently applied for has been removed from our job portal.\n\nWe appreciate the time and effort you dedicated to applying for this position and apologize for any inconvenience this may cause. We encourage you to explore other opportunities within our organization that may align with your skills and career objectives.\n\nThank you once again for your interest in joining our team. Should you have any questions or require further assistance, please feel free to reach out.\n\nSincerely,\n[Your Name]`,
          html: `<div>
            <p>Dear ${applicant.name},</p>
            <p>I hope this message finds you well.</p>
            <p>I wanted to inform you that the ${jobToDelete.title} position that you recently applied for has been removed from our job portal.</p>
            <p>We appreciate the time and effort you dedicated to applying for this position and apologize for any inconvenience this may cause. We encourage you to explore other opportunities within our organization that may align with your skills and career objectives.</p>
            <p>Thank you once again for your interest in joining our team. Should you have any questions or require further assistance, please feel free to reach out.</p>
            <p>Sincerely,</p>
            <p>[Your Name]</p>
          </div>`,
        };

        await sgMail.send(msg);
      }
    }

    return NextResponse.json({
      message: "Job deleted successfully",
      data: deletedJob,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// get single job by id
export async function GET(request: NextRequest, { params }: any) {
  try {
    await validToken(request);

    const Job = await JobModel.findById(params.jobId).populate("user");

    return NextResponse.json({
      message: "Single Job fetch successfully",
      data: Job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// update single job by id
export async function PUT(request: NextRequest, { params }: any) {
  // params: { jobId: string }
  try {
    await validToken(request);

    const requestBody = await request.json();

    const Job = await JobModel.findByIdAndUpdate(params.jobId, requestBody, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      message: "Job Updated successfully",
      data: Job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
