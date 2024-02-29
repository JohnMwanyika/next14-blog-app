import Image from 'next/image'
import styles from './postCard.module.css'
import Link from 'next/link'

export default function PostCard({ post }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.imgContainer}>
                        <Image className={styles.img} src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' fill />
                    </div>
                    <div className={styles.date}>
                        01.03.2024
                    </div>
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.desc}>{post.body}</p>
                    <Link href={`/blog/${post.id}`}>Read more</Link>
                </div>
            </div>
        </>
    )
}
