import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";

async function UserInformation() {
  const user = await currentUser();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  return (
    <div>
      <Avatar>
        {user?.id ? (
          <AvatarImage src={imageUrl} />
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" />
        )}
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
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
    </div>
  );
}

export default UserInformation;
