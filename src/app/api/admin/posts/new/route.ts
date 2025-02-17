// POST: /admin/posts/new

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "../../../../../_utils/supabase";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if (error) {
    console.log(error);
    return NextResponse.json({ status: error.message }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { title, content, thumbnailImageKey, postCategories } = body;

    const post = await prisma.post.create({
      data: { title, content, thumbnailImageKey },
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
