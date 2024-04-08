import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import JobModel from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

// delete job
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    await validToken(request);

    const Jobs = await JobModel.findByIdAndDelete(params.jobId);

    return NextResponse.json({
      message: "Job deleted successfully",
      data: Jobs,
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
