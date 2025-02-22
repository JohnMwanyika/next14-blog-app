import { Post, User } from "./models";
import { connectToDb } from "./utils";

import { unstable_noStore as noStore } from "next/cache"
// Temporary Data
// const users = [
//     { id: 1, name: "Valen W Mwamburi", title: "Product owner" },
//     { id: 2, name: "John B Mwanyika", title: "Software developer" },
// ];


// const posts = [
//     { id: 1, title: "Post 1", body: 'Lorem ipsum..........', userId: 1 },
//     { id: 2, title: "Post 2", body: 'Lorem ipsum..........', userId: 1 },
//     { id: 3, title: "Post 3", body: 'Lorem ipsum..........', userId: 2 },
//     { id: 4, title: "Post 4", body: 'Lorem ipsum..........', userId: 2 },
// ]


export const getPosts = async () => {
    try {
        connectToDb();

        const posts = await Post.find();
        return posts;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts")
    }
}

export const getPost = async (slug) => {
    try {
        connectToDb();

        const post = await Post.findOne(slug);
        return post;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch post")
    }
}
export const getUsers = async () => {
    try {
        connectToDb();

        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users")
    }
}

export const getUser = async (id) => {
    // this prevents next to cache user instead of fetching on each request
    noStore()
    try {
        connectToDb();

        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user")
    }
}

