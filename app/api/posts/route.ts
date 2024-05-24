import connectDB from "@/mongodb/db";
import { IPostBase, Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  imageUrl?: string | null;
}

export async function POST(request: Request) {
  auth().protect(); // Protect the route with clerk auth

  try {
    await connectDB(); // connect to the database

    const { user, text, imageUrl }: AddPostRequestBody = await request.json();

    const postData: IPostBase = {
      user,
      text,
      ...(imageUrl && { imageUrl }),
    };
    const post = await Post.create(postData); // adds post to db
    return NextResponse.json({ message: "Post created successfully", post });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while creating a post (route.ts): ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB(); // connect to the database

    const posts = Post.getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching posts (route.ts)" },
      { status: 500 }
    );
  }
}
