import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "logout successfully" },
      { status: 200 }
    );

    // remove token cookie
    response.cookies.set("token", "", { maxAge: 0 });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
