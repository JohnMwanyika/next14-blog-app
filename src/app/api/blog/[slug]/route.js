import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const { slug } = params;
    console.log(slug)
    try {
        connectToDb();

        const post = await Post.findOne({ slug });
        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch post")
    }
}