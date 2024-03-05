import PostUser from "@/components/postUser/postUser";
import styles from "./singlePost.module.css";
import Image from "next/image";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async (slug) => {
    try {
        const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message)
    }
}


export const generateMetadata = async ({ params }) => {
    const post = await getPost(params);
    return {
        title: post.title,
        description: post.desc
    }
}

export default async function SingleBlog({ params }) {
    const { slug } = params;
    console.log(slug);

    const post = await getData(slug);
    // fetch without an API
    // const post = await getPost(params);
    // console.log(post)

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                {post.img && <Image className={styles.img} src={post.img} alt='' fill />}
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}> {post.title} </h1>
                <div className={styles.detail}>
                    {post && (
                        <Suspense fallback={<p>Loading ...</p>}>
                            <PostUser userId={post.userId} />
                        </Suspense>
                    )}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>{post.createdAt.toString().slice(4, 16)}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    {post.desc}
                </div>
            </div>
        </div>
    )
}