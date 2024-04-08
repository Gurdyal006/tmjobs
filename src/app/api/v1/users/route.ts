import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import User from "@/models/userModal";
import { Select, message } from "antd";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function PUT(request: NextRequest) {
  try {
    await validToken(request);

    const requestBody = await request.json();

    const updateUserBody = await User.findByIdAndUpdate(
      requestBody._id,
      requestBody,
      { new: true }
    ).select("-password");

    if (!updateUserBody) {
      throw new Error("user not found!!!");
    }
    return NextResponse.json(
      { message: "User data updated successfully!!!", data: updateUserBody },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: message.error }, { status: 500 });
  }
}
