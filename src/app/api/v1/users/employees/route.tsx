import JobModal from "@/components/JobModal";
import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import Application from "@/models/applicationModel";
import Job from "@/models/jobModel";
import User from "@/models/userModal";
import { Select, message } from "antd";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(request: NextRequest) {
  try {
    await validToken(request);

    const employees = await User.find({ userType: "employee" });
    const jobs = await Job.find();

    const applications = await Application.find({ user: employees[0]._id })
      .populate("job")
      .populate("user")
      .exec();

    return NextResponse.json({
      message: "employees data fetched successfully",
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
