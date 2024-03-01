import Image from 'next/image'
import styles from './postCard.module.css'
import Link from 'next/link'

export default function PostCard({ post }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    {post.img && <div className={styles.imgContainer}>
                        <Image className={styles.img} src={post.img} alt='' fill />
                    </div>}
                    <div className={styles.date}>
                        01.03.2024
                    </div>
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.esc}>{post.desc}</p>
                    <Link href={`/blog/${post.slug}`}>Read more</Link>
                </div>
            </div>
        </>
    )
}
