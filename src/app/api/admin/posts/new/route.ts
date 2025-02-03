// POST: /admin/posts/new

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { title, content, thumbnailUrl, postCategories } = body;

    const post = await prisma.post.create({
      data: { title, content, thumbnailUrl },
    });

    for (const category of postCategories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: post.id,
        },
      });
    }
    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
