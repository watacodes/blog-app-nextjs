// GET /api/admin/categories

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "../../../../_utils/supabase";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if (error) {
    console.log(error);
    return NextResponse.json({ status: error.message }, { status: 400 });
  }

  try {
    const categories = await prisma.category.findMany({
      select: { name: true, id: true },
    });
    return NextResponse.json(
      {
        status: "OK",
        message: "Got the following categories: ",
        categories: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 200 });
  }
};

// POST /api/admin/categories

export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);

  if (error) {
    console.log(error);
    return NextResponse.json({ status: error.message }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { category } = body;

    const findExistingCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });

    if (findExistingCategory) {
      return NextResponse.json(
        {
          status: "error",
          message: "Category name already exists.",
        },
        { status: 400 }
      );
    }

    const data = await prisma.category.create({
      data: {
        name: category,
      },
    });

    return NextResponse.json(
      { status: "OK", message: "category added", data: data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
