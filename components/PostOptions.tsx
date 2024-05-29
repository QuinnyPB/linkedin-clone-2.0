"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route";
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { toast } from "sonner";

function PostOptions({
  postId,
  post,
}: {
  postId: string;
  post: IPostDocument;
}) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    // checks if userId is in likes array, meaning user liked post
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post, user]);

  // function for liking/unliking post
  const likeOrUnlikePost = async () => {
    if (!user?.id) {
      // toast.error("Failed to like/unlike post. Must be signed in!");
      // return;
      throw new Error("User not authenticated!");
    }

    const originalLiked = liked;
    const originalLikes = likes; // array of user ids

    // puts in or takes out user form likes array
    const newLikes = liked
      ? likes?.filter((like) => like !== user.id)
      : [...(likes ?? []), user.id]; // ?? operator returns rhs if lhs is null/undefined i.e. if no likes, then empty array, and finally add user.id

    const body: LikePostRequestBody | UnlikePostRequestBody = {
      userId: user.id,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const response = await fetch(
      `/api/posts/${postId}/${liked ? "unlike" : "like"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // if there is some error, then reverse changes to original values
    if (!response.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to like/unline post");
    }

    const fetchLikesResponse = await fetch(`/api/posts/${postId}/like`);
    if (!fetchLikesResponse.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to fetch likes");
    }

    const newLikedData = await fetchLikesResponse.json();
    setLikes(newLikedData);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <div>
          {likes && likes.length > 0 && (
            <p className="text-xs text-gray-500 cursor-pointer hover:underline">
              {likes.length} likes
            </p>
          )}
        </div>

        <div>
          {post?.comments && post.comments.length > 0 && (
            <p
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="text-xs text-gray-500 cursor-pointer hover:underline"
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>

      <div className="flex p-2 justify-between px-2 border-t">
        <Button
          variant="ghost"
          className="postButton"
          onClick={() => {
            const promise = likeOrUnlikePost();

            toast.promise(promise, {
              loading: liked ? "Unliking post" : "Liking post",
              success: liked ? "Post unliked" : "Post liked",
              error: "Failed to interact with post. Are you signed in?",
            });
          }}
        >
          <ThumbsUpIcon
            className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")}
          />
          Like
        </Button>

        <Button
          variant="ghost"
          className="postButton"
          onClick={() => {
            if (!user?.id) {
              toast.error("Cannot comment on post. Must sign in!");
            }
            setIsCommentsOpen(!isCommentsOpen);
          }}
        >
          <MessageCircle
            className={cn(
              "mr-1",
              isCommentsOpen && "text-gray-600 fill-gray-600"
            )}
          />
          Comment
        </Button>

        <Button variant="ghost" className="postButton">
          <Repeat2 className="mr-1" />
          Repost
        </Button>

        <Button variant="ghost" className="postButton">
          <Send className="mr-1" />
          Send
        </Button>
      </div>

      {isCommentsOpen && (
        <div className="p-4">
          <SignedIn>{user?.id && <CommentForm postId={postId} />}</SignedIn>
          <CommentFeed post={post} />
        </div>
      )}
    </div>
  );
}

export default PostOptions;
