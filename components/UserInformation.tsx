import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { IPostDocument } from "@/mongodb/models/post";

// AUTHOR NOTE: 'post' property use to be 'posts'

async function UserInformation({ post }: { post: IPostDocument[] }) {
  const user = await currentUser();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  const userPosts = post?.filter((post: any) => post.user.userId === user?.id);

  // flatmapping should be done on server/database side components in production
  // flatmap -> flattens an array of multi-dimensions into an 1 dimensional array
  const userComments = post.flatMap((post: any) => {
    post?.comments?.filter(
      (comment: any) => comment.user.userId === user?.id
    ) || [];
  });

  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <Avatar>
        {user?.id ? (
          <AvatarImage src={imageUrl} />
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" />
        )}
        <AvatarFallback>
          {firstName?.charAt(0)}
          {lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <SignedIn>
        <div className="text-center">
          <p className="font-semibold">
            {firstName} {lastName}
          </p>

          <p className="text-xs">
            @{firstName}
            {lastName}-{user?.id?.slice(-4)}
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold">You are not signed in</p>

          <Button asChild className="bg-[#0B63C4] text-white">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <hr className="w-full border-gray-200 my-5" />

        <div className="flex justify-between w-full px-4 text-sm">
          <p className="font-semibold text-gray-400">Posts</p>
          <p className="text-blue-400">{userPosts.length}</p>
        </div>
        <div className="flex justify-between w-full px-4 text-sm">
          <p className="font-semibold text-gray-400">Comments</p>
          <p className="text-blue-400">{userComments.length}</p>
        </div>
      </SignedIn>
    </div>
  );
}

export default UserInformation;
