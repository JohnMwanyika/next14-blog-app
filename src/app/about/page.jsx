import Image from "next/image";
import styles from "./about.module.css"

// meta data
export const metadata = {
    title: 'About us',
    description: 'Fill the contact form bellow to submit your requests and feeback.',
}

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.subtitle}>About Agency</h2>
                <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better.</h1>
                <p className={styles.desc}>
                    We create digital ideas that are bigger,bolder,braver and better. We
                    believe in good ideas flexibility and precission. We&apos;re world&apos;s Our
                    Special team best consulting & finance solution privider. Wid range
                    of web and software development services.
                </p>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <h1>10 k+</h1>
                        <p>Years of experience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10 k+</h1>
                        <p>Years of experience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10 k+</h1>
                        <p>Years of experience</p>
                    </div>
                </div>
            </div>
            <div className={styles.imgContainer}>
                <Image className={styles.img} src="/about.png" alt="Abut image" fill />
            </div>
        </div>
    )
}