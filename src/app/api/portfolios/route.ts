import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Portfolio from "@/lib/models/Portfolio";
import User from "@/lib/models/User";
import connectDB from "@/lib/db";

// Get all portfolios for the current user
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const portfolios = await Portfolio.find({ user_id: session.user.id });

  return NextResponse.json(portfolios);
}

// Create a new portfolio
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  // Add validation with Zod here later
  const { title, description, theme, layout, is_public } = body;

  const user = await User.findById(session.user.id);

  const portfolio = await Portfolio.create({
    user_id: session.user.id,
    title,
    description,
    theme,
    layout,
    is_public,
    slug: `${user.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}`
  });

  return NextResponse.json(portfolio, { status: 201 });
}
