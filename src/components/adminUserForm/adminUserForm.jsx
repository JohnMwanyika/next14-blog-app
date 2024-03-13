"use client"
import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css"
import { useFormState } from "react-dom";

export default function AdminUserForm() {

    const [state, dispatch] = useFormState(addUser, undefined);

    return (
        <form action={dispatch} className={styles.container}>
            <h1>Add New User</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="text" name="img" placeholder="Avatat Link" />
            <select name="isAdmin" id="">
                <option value="false">Is Admin</option>
                <option value="false">User</option>
                <option value="true">Admin</option>
            </select>
            <button>Add</button>
            {state && `Error: ${state.error}`}
        </form>
    )
}