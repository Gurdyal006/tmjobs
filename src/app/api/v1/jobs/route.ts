import { connectDB } from "@/config/dbConfig";
import { validToken } from "@/helpers/validToken";
import JobModel from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

// create job
export async function POST(request: NextRequest) {
  try {
    const userId = await validToken(request);

    const requestBody = await request.json();

    const Jobs = await JobModel.create({
      ...requestBody,
      user: userId,
    });

    return NextResponse.json({
      message: "Job created successfully",
      data: Jobs,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    validToken(request);

    const { searchParams } = new URL(request.url);

    const searchText: any = searchParams.get("searchText");
    const location: any = searchParams.get("location");

    const filterObject: any = {};

    if (searchText && searchText.trim() !== "") {
      filterObject["title"] = { $regex: searchText.trim(), $options: "i" };
    }

    if (location && location.trim() !== "") {
      filterObject["location"] = { $regex: location.trim(), $options: "i" };
    }

    // for pagination
    const page: number = parseInt(searchParams.get("page") || "1", 10);
    const pageSize: number = parseInt(searchParams.get("pageSize") || "10", 10);

    const skip = (page - 1) * pageSize;

    const Jobs = await JobModel.find(filterObject)
      .populate("user")
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(pageSize);

    const JobsTotal = await JobModel.countDocuments(filterObject);

    return NextResponse.json({
      message: "Jobs fetched successfully",
      data: Jobs,
      total: JobsTotal,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// // get all jobs
// export async function GET(request: NextRequest) {
//   try {
//     validToken(request);

//     const { searchParams } = new URL(request.url);

//     const user: any = searchParams.get("user");
//     const searchText = searchParams.get("searchText");
//     const location = searchParams.get("location");

//     const filterObject: any = {};

//     if (user) {
//       filterObject["user"] = user;
//     }

//     if (searchText && searchText !== "") {
//       filterObject["title"] = { $regex: searchText, $options: "i" };
//     }

//     if (location && location !== "") {
//       filterObject["location"] = { $regex: location, $options: "i" };
//     }

//     // for pagination
//     const page: number = parseInt(searchParams.get("page") || "1", 10);
//     const limit: number = parseInt(searchParams.get("limit") || "10", 10);

//     const skip = (page - 1) * limit;

//     const Jobs = await JobModel.find(filterObject)
//       .populate("user")
//       .skip(skip)
//       .limit(limit);

//     const JobsTotal = await JobModel.find(filterObject).countDocuments();

//     return NextResponse.json({
//       message: "Job Fetch successfully",
//       data: Jobs,
//       total: JobsTotal,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
