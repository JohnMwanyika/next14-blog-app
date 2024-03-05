import { register } from "@/lib/action";
import styles from "./register.module.css";

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form} action={register}>
                    <input type="text" placeholder="Username" name="username" id="" required />
                    <input type="email" placeholder="Email" name="email" id="" required />
                    <input type="password" placeholder="Passoward" name="password" id="" required />
                    <input type="password" placeholder="Confirm password" name="passwordRepeat" id="" required />
                    <button>Registry</button>
                </form>

            </div>
        </div>
    )
}