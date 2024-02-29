import PostCard from '@/components/postCard/postCard';
import styles from './blog.module.css';

const getData = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 5000 } });
        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message)
    }
}

export default async function BlogsPage() {
    // fetch all posts
    const posts = await getData();

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