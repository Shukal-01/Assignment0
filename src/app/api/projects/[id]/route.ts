import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Project from "@/lib/models/Project";
import connectDB from "@/lib/db";

interface Params {
  params: { id: string };
}

// Get a single project
export async function GET(req: Request, { params }: Params) {
  await connectDB();
  const project = await Project.findById(params.id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // This is a public endpoint, so no auth check needed for GET

  return NextResponse.json(project);
}

// Update a project
export async function PUT(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const project = await Project.findById(params.id);

  if (!project || project.user_id.toString() !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  // Add validation with Zod here later

  const updatedProject = await Project.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json(updatedProject);
}

// Delete a project
export async function DELETE(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const project = await Project.findById(params.id);

  if (!project || project.user_id.toString() !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Project.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true }, { status: 200 });
}
