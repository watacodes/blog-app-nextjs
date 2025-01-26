// POST: to post a new post via admin page

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

// type for createPost

/**
 * 
 * model Post {
  id Int @id @default(autoincrement())
  title String
  content String
  thumbnailUrl String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  postCategories PostCategory[]

 */

// type CreatePost = {
//   title: string;
//   content: string;
//   thumbnailUrl: string;
//   categories: { id: number }[];
// };

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { title, content, categories, thumbnailUrl } = body;

    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      });
    }

    console.log("POST request: ", data);

    return NextResponse.json(
      { status: "OK", message: "post request accepted", id: data.id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// GET: /api/admin/posts
// fetch the article list on admin page

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

    console.log("Get request: ", posts);

    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
