import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  try {
    // tries to get specific post
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching that post" },
      { status: 500 }
    );
  }
}

export interface DeletePostRequestBody {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  auth().protect();

  // an alternative to { userId } as clerk is more authenticated
  // const user = await currentUser();

  await connectDB();

  const { userId }: DeletePostRequestBody = await request.json();

  try {
    // tries to get specific post
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // for clerk auth
    // if (post.user.userId !== user?.id) {
    if (post.user.userId !== userId) {
      throw new Error("Post does not belong to user!");
    }

    await post.removePost();
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching that post" },
      { status: 500 }
    );
  }
}
