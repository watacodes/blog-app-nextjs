import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "../../../../../_utils/supabase";

const prisma = new PrismaClient();

// GET: /api/admin/categories/[id]

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const token = request.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);

  if (error) {
    console.log(error);
    return NextResponse.json({ status: error.message }, { status: 400 });
  }
  try {
    const data = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      { status: "OK", category: data.name },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// PUT: /api/admin/categories/[id]

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const { category } = await request.json();

  try {
    const findDuplicate = await prisma.category.findFirst({
      where: { name: category },
    });

    if (findDuplicate) return;

    const update = await prisma.category.update({
      where: { id: Number(id) },
      data: { name: category },
    });
    return NextResponse.json({ status: "OK", data: update }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// DELETE: /api/admin/categories/[id]

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      { status: "OK", category: category },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
