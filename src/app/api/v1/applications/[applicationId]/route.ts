import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import moment from "moment";

// Initialize SendGrid with  API key
const key: any = process.env.sendGridKey;

sgMail.setApiKey(key);

connectDB();

export async function PUT(request: NextRequest, { params }: any) {
  try {
    await validToken(request);

    const requestBody = await request.json();

    const application: any = await Application.findByIdAndUpdate(
      params.applicationId,
      requestBody,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "user",
        },
      });

    const msg = {
      to: application.user.email,
      from: "gurdyalsingh412@gmail.com", // Replace with your verified sender
      subject: "Your Application status has been updated.",
      text: `your application status has been updated to ${application.status}`,
      html: `<div>
      <p>Your application status has been updated to ${
        application.status
      }</p>     
      <p>
       Company: ${application.job.user.name}
      </p>    
      <p>
        Job Title: ${application.job.title}
      </p>   
      <p>
        Applied On: ${moment(application.createdAt).format("DD/MM/YYYY")}
      </p>   
      <p>Thank you for using TmJobs</p>
      </div>`,
    };

    await sgMail.send(msg);

    return NextResponse.json({
      message: "Application status Updated successfully",
      data: application,
    });
  } catch (error: any) {
    console.log(error, "eerere");

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
