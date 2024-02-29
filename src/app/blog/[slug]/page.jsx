import PostUser from "@/components/postUser/postUser";
import styles from "./singlePost.module.css";
import Image from "next/image";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API
// const getData = async (slug) => {
//     try {
//         const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
//         if (!res.ok) {
//             throw new Error("Something went wrong")
//         }
//         return res.json();
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

export default async function SingleBlog({ params, searchParams }) {
    console.log(params);
    const { slug } = params;

    // const post = await getData(slug);
    const post = await getPost(slug);
    // console.log(post)

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image className={styles.img} src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' fill />
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}> {post.title} </h1>
                <div className={styles.detail}>
                    <Image className={styles.avatar} src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='author avatar' width={50} height={50} />
                    <Suspense fallback={<p>Loading ...</p>}>
                        <PostUser userId={post.userId} />
                    </Suspense>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.03.2024</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post.body}
                </div>
            </div>
        </div>
    )
}