import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import Widget from "@/components/Widget";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { SignedIn } from "@clerk/nextjs";

export const revalidate = 0;

// AUTHORS NOTE: UserInformations 'post' property use to be 'posts'

export default async function Home() {
  await connectDB();
  const posts = await Post.getAllPosts();

  return (
    <main className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation post={posts} />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <SignedIn>
          <PostForm />
        </SignedIn>

        <PostFeed posts={posts} />
        <div className="mb-8">
          <i>
            Disclaimer: This project is not for commercial use and is solely to
            demonstrate my skills.
          </i>
        </div>
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        {/* Widget */}
        <Widget />
      </section>
    </main>
  );
}
