import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("no token found");
    }

    const decodedData: any = await jwt.verify(token, process.env.jwt_secret!);
    return decodedData.userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
