import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await validToken(request);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new Error("user not found!!!!");
    }
    return NextResponse.json({
      message: "User fetch successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
