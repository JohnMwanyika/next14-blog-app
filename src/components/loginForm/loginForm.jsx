"use client";
import { login } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import styles from "./loginForm.module.css";
import Link from "next/link";


export default function LoginForm() {
    const [state, dispatch] = useFormState(login, null);

    const router = useRouter();

    // useEffect(() => {
    //     state?.success && router.push('/admin');
    // }, [state?.success, router]);

    return (
        <form className={styles.form} action={dispatch}>
            <input type="text" placeholder="Email" name="email" id="" required />
            <input type="password" placeholder="Passoward" name="password" id="" required />
            <button>Login with credentials</button>
            {state?.error && `Error: ${state.error}`}
        </form>
    )
}