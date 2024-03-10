import { Suspense } from "react"
import styles from "./admin.module.css"
import AdminPost from "@/components/adminPost/adminPost"
import AdminPostForm from "@/components/adminPostForm/adminPostForm"
import AdminUserForm from "@/components/adminUserForm/adminUserForm"
import AdminUsers from "@/components/adminUsers/adminUsers"
import { auth } from "@/lib/auth"

export default async function AboutPage() {

    const session = await auth();

    return (
        <div className={styles.container}>
            <div className={styles.row}>

                <div className={styles.col}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminPost />
                    </Suspense>
                </div>

                <div className={styles.col}>
                    <AdminPostForm userId={session.user.id} />
                </div>

            </div>
            <div className={styles.row}>

                <div className={styles.col}>
                    <AdminUsers />
                </div>

                <div className={styles.col}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminUserForm />
                    </Suspense>
                </div>

            </div>
        </div>
    )
}