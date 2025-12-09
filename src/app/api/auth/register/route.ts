import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import connectDB from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const user = await User.create({
      email,
      password_hash: password,
      name,
      providers: ["email"],
    });

    return NextResponse.json({ success: true, user }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
