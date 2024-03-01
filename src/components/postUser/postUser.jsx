import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

// const getData = async (userId) => {
//     try {
//         const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { cache: "no-store" });
//         if (!res.ok) {
//             throw new Error("Something went wrong")
//         }
//         return res.json();
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

export default async function PostUser({ userId }) {

    // FETCH WITH API
    // const user = await getData(userId);

    // WITHOUT API
    const user = await getUser(userId)
    return (
        <>
            <div className={styles.container}>
                <Image className={styles.avatar} src={user.img ? user.img : "/noavatar.png"} alt='author avatar' width={50} height={50} />
                <div className={styles.texts}>
                    <span className={styles.title}>Author</span>
                    <span className={styles.username}> {user.username} </span>
                </div>
            </div>
        </>
    )
}