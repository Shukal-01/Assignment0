import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import User from "@/lib/models/User";
import connectDB from "@/lib/db";

// Get current user profile
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(session.user.id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// Update user profile
export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  // Add validation with Zod here later
  const { name, headline, bio, location, website, github, linkedin, twitter, preferences } = body;

  const user = await User.findByIdAndUpdate(
    session.user.id,
    {
      name,
      headline,
      bio,
      location,
      website,
      github,
      linkedin,
      twitter,
      preferences,
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
