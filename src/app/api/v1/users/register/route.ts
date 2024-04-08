import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModal";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { userType, name, email, password } = reqBody;

    if (!userType || !email || !password) {
      throw new Error("please enter all fields!!!!!");
    }

    // user exist
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("user already exist!!!!");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashPassword;

    // create user
    const data = await User.create(reqBody);

    return NextResponse.json(
      { message: "user created successfully!!!", success: true, data },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   return NextResponse.json({ message: "get api " });
// }
