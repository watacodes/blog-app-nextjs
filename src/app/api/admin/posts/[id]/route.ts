import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "../../../../../_utils/supabase";

const prisma = new PrismaClient();

// GET: /api/admin/posts/[id]

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

    const categories = post.postCategories.map((c) => ({
      id: c.category.id,
      name: c.category.name,
    }));

    const formattedPost = { ...post, categories };

    return NextResponse.json(
      { status: "OK", post: formattedPost },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// PUT: /api/admin/posts/[id]

export const PUT = async (
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
    const body = await request.json();
    const { title, content, thumbnailImageKey, postCategories } = body;

    const updatePost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        thumbnailImageKey,
      },
    });

    const newCategoryIds = postCategories.map((c) => c.categoryId);

    await prisma.postCategory.deleteMany({
      where: {
        postId: Number(id),
      },
    });

    for (const newId of newCategoryIds) {
      await prisma.postCategory.create({
        data: {
          categoryId: newId,
          postId: Number(id),
        },
      });
    }

    return NextResponse.json(
      { status: "OK", updated: updatePost },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
