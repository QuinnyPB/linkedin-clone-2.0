import connectDB from "@/mongodb/db";
import { Folowers } from "@/mongodb/models/followers";
import { NextResponse } from "next/server";

// GET function for all followers
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  try {
    await connectDB();

    if (!user_id) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 400 }
      );
    }

    const followers = await Followers.getAllFollowers(user_id);

    if (!followers) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    return NextResponse.json(followers);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching followers" },
      { status: 500 }
    );
  }
}
