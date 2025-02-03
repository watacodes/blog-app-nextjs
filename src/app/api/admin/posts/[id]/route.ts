import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: /api/admin/posts/[id]

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

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    console.log(error);
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

  try {
    const body = await request.json();
    const { title, content, thumbnailUrl, postCategories } = body;

    const updatePost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    const newCategoryIds = postCategories.map((c) => c.id);

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
