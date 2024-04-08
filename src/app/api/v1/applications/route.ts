import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

connectDB();

// create job
export async function POST(request: NextRequest) {
  // Initialize SendGrid with  API key
  const key: any = process.env.sendGridKey;

  await sgMail.setApiKey(key);

  try {
    await validToken(request);

    const requestBody = await request.json();

    const applications: any = await Application.create(requestBody);

    const applicationData: any = await Application.findById(applications._id)
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "user",
        },
      });

    const msg = {
      to: applicationData.job.user.email,
      from: "gurdyalsingh412@gmail.com", // Replace with your verified sender
      subject: "New application received",
      text: `You have received a new application from ${applicationData.user.name}`,
      html: `<div>
      <h2>Job Title : ${applicationData.job.title}</h2>
      <p>You have received a new application from ${applicationData.user.name}</p>
      <p>Applicant's name is ${applicationData.user.name}</p>
      <p>Applicant's email: ${applicationData.user.email}</p>
      <p>Applicant's phone number: ${applicationData.user.phone}</p>
      </div>`,
    };

    await sgMail.send(msg);

    return NextResponse.json({
      message: "Successfully applied this job",
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// get all jobs
export async function GET(request: NextRequest) {
  try {
    validToken(request);

    const { searchParams } = new URL(request.url);

    const user: any = searchParams.get("user");
    const job: any = searchParams.get("job");

    const filterObject: any = {};

    if (user) {
      filterObject["user"] = user;
    }

    if (job) {
      filterObject["job"] = job;
    }

    const applications = await Application.find(filterObject)
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "user",
        },
      });

    return NextResponse.json({
      message: "Applications Fetch successfully",
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
