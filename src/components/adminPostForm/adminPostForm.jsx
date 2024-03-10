"use client";
import { addPost } from "@/lib/action"
import styles from "./adminPostForm.module.css"
import { useFormState } from "react-dom";

export default function AdminPostForm({ userId }) {

    const [state, dispatch] = useFormState(addPost, undefined);

    return (
        <form action={dispatch} className={styles.container}>
            <h1>Add New Post</h1>
            <input type="hidden" name="userId" value={userId} />
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="slug" placeholder="Slug" />
            <input type="text" name="img" placeholder="Image link" />
            <textarea name="desc" id="" placeholder="Description" cols="30" rows="5"></textarea>
            <button>Add</button>
            {state && `Error: ${state.error}`}
        </form>
    )
}