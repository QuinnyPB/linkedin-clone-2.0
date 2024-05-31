import { IPostDocument } from "@/mongodb/models/post";
import Post from "./Post";

function PostFeed({ posts }: { posts: IPostDocument[] }) {
  const postID: any = posts[0]._id;

  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <Post key={postID} post={post} />
      ))}
    </div>
  );
}

export default PostFeed;
