import RegisterForm from "@/components/registerForm/registerForm";
import styles from "./register.module.css";

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3>Register</h3>
                <RegisterForm />
            </div>
        </div>
    )
}