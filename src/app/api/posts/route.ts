import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

// GET: /api/posts

export const GET = async (request: NextRequest) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
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

    const formattedPosts = posts.map((post) => {
      const categories = post.postCategories.map((c) => ({
        id: c.category.id,
        name: c.category.name,
      }));
      return { ...post, categories };
    });

    return NextResponse.json(
      { status: "OK", posts: formattedPosts },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// PUT: /api/posts

export const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { title, content, postCategories, thumbnailUrl } = body;

    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    for (const category of postCategories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      });
    }

    return NextResponse.json(
      { status: "OK", message: "post request accepted", id: data.id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
