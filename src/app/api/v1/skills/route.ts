import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import skills from "@/models/jobSkills";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validToken(request);
    const requestBody = await request.json();

    const skillResponse = await skills.create({
      ...requestBody,
      user: userId,
    });

    return NextResponse.json({
      message: "Job skill created successfully",
      data: skillResponse,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await validToken(request);

    const Skills = await skills.find();

    return NextResponse.json({
      message: "Job skills fetched successfully",
      data: Skills,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
