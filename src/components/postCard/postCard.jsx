import Image from 'next/image'
import styles from './postCard.module.css'
import Link from 'next/link'

export default function PostCard() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.imgContainer}>
                        <Image src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' fill />
                    </div>
                    <div className={styles.date}>
                        01.03.2024
                    </div>
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.title}>Title</h1>
                    <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque delectus totam labore voluptates eos asperiores autem, alias veritatis commodi iste numquam tempora, quae quam cumque officiis. Tenetur accusantium non at.</p>
                    <Link href="/blog/post">Read more</Link>
                </div>
            </div>
        </>
    )
}
