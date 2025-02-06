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

    const categoryIds = postCategories.map((c) => c.categoryId);

    for (const catId of categoryIds) {
      await prisma.postCategory.create({
        data: {
          categoryId: catId,
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
