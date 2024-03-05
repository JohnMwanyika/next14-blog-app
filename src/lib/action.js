"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { auth, signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

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

export const register = async (formData) => {
    // const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);
    try {
        const data = Object.fromEntries(formData)
        console.log(data);

        if (data.password !== data.passwordRepeat) { return "Passwords do not match!" }

        const user = await User.findOne({ email: data.email });
        if (user) {
            return { error: "A user with similar credentials is found!" }
        }
        // create user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            img: data?.img
        })
        console.log("User saved to db")
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" }
    }
}

export const login = async (formData) => {
    try {
        console.log(Object.fromEntries(formData))
        const { email, password } = Object.fromEntries(formData);
        await signIn("credentials", { email, password });

    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" }
    }
}