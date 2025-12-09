import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Portfolio from "@/lib/models/Portfolio";
import connectDB from "@/lib/db";

interface Params {
  params: { id: string };
}

// Get a single portfolio
export async function GET(req: Request, { params }: Params) {
  await connectDB();
  const portfolio = await Portfolio.findById(params.id);

  if (!portfolio) {
    return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
  }

  // Public access check
  if (!portfolio.is_public) {
    const session = await auth();
    if (session?.user?.id !== portfolio.user_id.toString()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.json(portfolio);
}

// Update a portfolio
export async function PUT(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const portfolio = await Portfolio.findById(params.id);

  if (!portfolio || portfolio.user_id.toString() !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  // Add validation with Zod here later

  const updatedPortfolio = await Portfolio.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json(updatedPortfolio);
}

// Delete a portfolio
export async function DELETE(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const portfolio = await Portfolio.findById(params.id);

  if (!portfolio || portfolio.user_id.toString() !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Portfolio.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true }, { status: 200 });
}
