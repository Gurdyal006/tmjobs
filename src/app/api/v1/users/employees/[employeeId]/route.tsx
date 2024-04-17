import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import Application from "@/models/applicationModel";
import { Select, message } from "antd";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(request: NextRequest, { params }: any) {
  try {
    await validToken(request);

    const applications = await Application.find({ user: params.user }); // Find applications by user ID

    return NextResponse.json({
      message: "Applications data fetched successfully",
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
