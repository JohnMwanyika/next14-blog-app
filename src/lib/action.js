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

export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);
    // check if passwords are equal
    if (password !== passwordRepeat) return { error: "Passwords do not match!" }
    try {

        const user = await User.findOne({ email });
        if (user) {
            return { error: "A user with similar credentials is found!" }
        }
        // create user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            img
        })
        return { success: "User registered succesfully redirecting..." }
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" }
    }
}

export const login = async (previousState, formData) => {
    try {
        const { email, password } = Object.fromEntries(formData);
        await signIn("credentials", { email, password });

    } catch (error) {
        console.log(error);
        if (error.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" }
        }
        // return { error: "Something went wrong" }
        throw error;
    }
}