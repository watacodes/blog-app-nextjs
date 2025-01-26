// @ /api/admin/categories
// Feature: POST -> Add new categories
/*

model Category {
  id        Int            @id @default(autoincrement())
  name      String
  createdAt DateTime       @default(now())
  updatedAt DateTime       @updatedAt
  posts     PostCategory[]
}

*/

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
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

export const POST = async (request: NextRequest) => {
  // submit the category name via front-end form
  // and take the category name and create another Category

  try {
    const body = await request.json();
    console.log(body);
    const { name } = body;

    const data = await prisma.category.create({
      data: {
        name,
      },
    });
    console.log("POST request: ", data);

    return NextResponse.json(
      { status: "OK", message: "category added", data: data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
