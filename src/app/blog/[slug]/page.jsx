import styles from "./singlePost.module.css";
import Image from "next/image";

export default function SingleBlog({ params, searchParams }) {
    // console.log(params);
    // console.log(searchParams);

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image className={styles.img} src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='' fill />
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>
                <div className={styles.detail}>
                    <Image className={styles.avatar} src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='author avatar' width={50} height={50} />
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Author</span>
                        <span className={styles.detailValue}>John Mwanyika</span>
                    </div>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.03.2024</span>
                    </div>
                </div>
                <div className={styles.content}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eum a laborum magni, exercitationem quaerat voluptatem quisquam nisi voluptatum suscipit minima, ipsum, esse maiores quod modi nulla doloremque consequuntur facilis!
                </div>
            </div>
        </div>
    )
}