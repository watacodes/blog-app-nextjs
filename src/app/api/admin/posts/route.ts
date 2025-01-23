// POST: to post a new post via admin page

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

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

type CreatePost = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log(body);
  const { title, content, categories, thumbnailUrl }: CreatePost = body;

  const data = await prisma.post.create({
    data: {
      title,
      content,
      thumbnailUrl,
    },
  });

  console.log(categories);

  return NextResponse.json({});
};

// GET: /api/admin/posts
// fetch the article list on admin page

export const GET = async (request: NextRequest) => {
  try {
    const posts = prisma.post.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
