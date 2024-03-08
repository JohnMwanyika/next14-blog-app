import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/action";
import styles from "./login.module.css";
import Link from "next/link";


export default function LoginPage() {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3>Login</h3>
                <form action={handleGithubLogin}>
                    <button className={styles.github} type="submit">Login with Github</button>
                </form>
                <LoginForm />
                <Link href={"/register"}>Don't have an account? <b>Register</b></Link>
            </div>
        </div>
    )
}