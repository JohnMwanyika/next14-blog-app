"use server";
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { auth, signIn, signOut } from "./auth";

export const addPost = async (formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newPost = await Post.create({
            title, desc, slug, userId
        });
        console.log("Saved to Db")
        // display fresh data when new post is added
        revalidatePath("/blog");
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("Post deleted");
        revalidatePath("/blog");
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
}

export const handleGithubLogin = async () => {
    await signIn("github");
}
export const handleLogout = async () => {
    console.log("User session is destroyed")
    await signOut();
}