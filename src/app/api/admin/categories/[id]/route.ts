// GET: /api/admin/categories/[id]

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const data = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      { status: "OK", data: data.name },
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
  const { name } = await request.json();

  try {
    const findDuplicate = await prisma.category.findFirst({
      where: { name },
    });

    if (findDuplicate) return;

    const update = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
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
