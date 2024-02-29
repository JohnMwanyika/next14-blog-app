import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";

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

    // const user = await getData(userId);
    const user = await getUser(userId)
    return (
        <>
            <div className={styles.container}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}> {user.name} </span>
            </div>
        </>
    )
}