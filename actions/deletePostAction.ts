"use server";

import { DeletePostRequestBody } from "@/app/api/posts/[post_id]/route";
import { Post } from "@/mongodb/models/post";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function deletePostAction(postId: string) {
  const user = await currentUser();

  const body: DeletePostRequestBody = {
    userId: user.id,
  };

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.userId !== user.id) {
    throw new Error("Post does not belong to user");
  }

  try {
    await post.removePost();
    revalidatePath("/");
  } catch (error) {
    throw new Error("Error occured while deleting post");
  }
}
