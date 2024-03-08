"use client"
import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";


export default function RegisterForm() {
    const [state, dispatch] = useFormState(register, undefined);

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push('/login');
    }, [state?.success, router]);

    return (
        <form className={styles.form} action={dispatch}>
            <input type="text" placeholder="Username" name="username" id="" required />
            <input type="email" placeholder="Email" name="email" id="" required />
            <input type="password" placeholder="Passoward" name="password" id="" required />
            <input type="password" placeholder="Confirm password" name="passwordRepeat" id="" required />
            <button>Register</button>
            {state?.error && `Error: ${state.error}`}
            <Link href={"/login"}>Already have an account? <b>Login</b></Link>
        </form>
    )
}