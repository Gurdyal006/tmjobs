import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModal";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    if (!email || !password) {
      throw new Error("please enter all fields!!!!!");
    }

    // user exist
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user doesnot exist!!!!");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("invalid password!!!!");
    }

    // create access token
    const accessToken = generateAccessToken({
      userId: user._id,
      email: user.email,
    });

    // create refresh token
    // const refreshToken = generateRefreshToken({
    //   userId: user._id,
    //   email: user.email,
    // });

    const response = NextResponse.json(
      { message: "login successfully!!!", success: true },
      { status: 200 }
    );

    // set tokens in browser
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // response.cookies.set("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    // });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Function to generate access token
function generateAccessToken(dataToBeSigned: any) {
  return jwt.sign(dataToBeSigned, process.env.jwt_secret!, {
    expiresIn: "30d",
  });
}

// Function to generate refresh token
// function generateRefreshToken(dataToBeSigned: any) {
//   return jwt.sign(dataToBeSigned, process.env.jwt_secret!, {
//     expiresIn: "30d",
//   });
// }
