import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Rentisha</div>
            <div className={styles.text}>
                Mwanyika creative thoughts ageny | All rights reserved.
            </div>
        </div>
    )
}