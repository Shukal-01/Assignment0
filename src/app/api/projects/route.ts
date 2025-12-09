import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
import connectDB from "@/lib/db";

// Get all projects for the current user
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const projects = await Project.find({ user_id: session.user.id });

  return NextResponse.json(projects);
}

// Create a new project
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  // Add validation with Zod here later
  const { title, description, detailed_description, live_url, github_url, demo_video_url, technologies_used, start_date, end_date, is_featured } = body;

  const user = await User.findById(session.user.id);

  const project = await Project.create({
    user_id: session.user.id,
    title,
    description,
    detailed_description,
    live_url,
    github_url,
    demo_video_url,
    technologies_used,
    start_date,
    end_date,
    is_featured,
    slug: `${user.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}`
  });

  return NextResponse.json(project, { status: 201 });
}
