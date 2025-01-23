// post details

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    console.log("post details:", post);

    return NextResponse.json({ status: "OK", posts: post }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
