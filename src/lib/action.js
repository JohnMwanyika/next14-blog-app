"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const addPost = async (previousState, formData) => {
    const { title, desc, slug, userId, img } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newPost = await Post.create({
            title, desc, slug, userId, img
        });
        console.log(newPost.title, "Saved to Db")
        // display fresh data when new post is added
        revalidatePath("/admin");
        revalidatePath("/blog");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
        // throw new Error("Something went wrong");
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("Post deleted");
        revalidatePath("/blog");
        revalidatePath("/admin");

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
}

export const addUser = async (previousState, formData) => {
    const { username, email, password, passwordRepeat, img, isAdmin } = Object.fromEntries(formData);
    // if (password !== passwordRepeat) {
    //     return { error: "Passwords do not match!" }
    // }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.findOne({ email });
        if (user) {
            return { error: "User with provided email already exist!" }
        }
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            img,
            isAdmin
        });
        console.log(newUser.username, `created successfully default password is ${password}`);
        revalidatePath("/admin");
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong!")
    }
}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);
        console.log("User deleted");
        revalidatePath("/admin");
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
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            img
        })
        return { success: `${newUser.username} registered succesfully redirecting...` };
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