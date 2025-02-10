import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: /api/posts/[id]

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

    const categories = post.postCategories.map((c) => ({
      id: c.category.id,
      name: c.category.name,
    }));

    const formattedPost = { ...post, categories };

    console.log("formatted: ", formattedPost);

    return NextResponse.json(
      { status: "OK", post: formattedPost },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
