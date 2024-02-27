import Image from "next/image"
import styles from "./contact.module.css"

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src="/contact.png" alt="" className="" fill />
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form} action="">
                    <input type="text" name="" placeholder="Full Name" id="" />
                    <input type="email" name="" placeholder="Email" id="" />
                    <input type="tell" name="" placeholder="Phone (Optional)" id="" />
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <button>Send</button>
                </form>
            </div>
        </div>)
}