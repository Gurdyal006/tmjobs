import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import skills from "@/models/jobSkills";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    await validToken(request);
    const skill = await skills.findByIdAndDelete(params.skillId);
    if (!skill) {
      return NextResponse.json({ message: "Id not found" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Job skill Delete successfully",
      data: skill,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
