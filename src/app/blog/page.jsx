import PostCard from '@/components/postCard/postCard';
import styles from './blog.module.css';
import { getPosts } from '@/lib/data';

// FETCH DATA WITH AN API
const getData = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/blog', { next: { revalidate: 5000 } });
        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message)
    }
}


export default async function BlogsPage() {
    const posts = await getData();
    // fetch all posts
    // const posts = await getPosts();
    // console.log(posts)

    return (
        <div className={styles.container}>
            {
                posts.map(post => (
                    <div className={styles.post} key={post.id}>
                        <PostCard post={post} />
                    </div>
                ))
            }
        </div>
    )
}