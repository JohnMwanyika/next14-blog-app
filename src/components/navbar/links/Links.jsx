"use client"
import { useState } from 'react';
import styles from './links.module.css'
import NavLink from "./navLink/NavLink";
import Image from 'next/image';
import { handleLogout } from '@/lib/action';

export default function Links({ session }) {
    // use state
    const [open, setOpen] = useState(false);

    const links = [
        {
            title: "Home",
            path: "/",
            icon: ""
        },
        {
            title: "About",
            path: "/about",
            icon: ""
        },
        {
            title: "Contact",
            path: "/contact",
            icon: ""
        },
        {
            title: "Blog",
            path: "/blog",
            icon: ""
        },
        {
            title: "Gallery",
            path: "/gallery",
            icon: ""
        },
    ];

    const isAdmin = true;
    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}

                {
                    session?.user ?
                        <>
                            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
                            <form action={handleLogout}>
                                <button className={styles.logout}>Logout</button>
                            </form>
                        </>
                        :
                        <>
                            <NavLink item={{ title: "Login", path: "/login" }} />
                            <NavLink item={{ title: "Register", path: "/register" }} />
                        </>
                }
            </div>
            {/* <button className={styles.menuButton} >Menu</button> */}
            <Image className={styles.menuButton} src="/menu.png" alt='menu icon' width={20} height={20} onClick={() => setOpen((prev) => !prev)} />
            {
                open &&
                <div className={styles.mobileLinks}>
                    {links.map((link) => (<NavLink item={link} key={link.title} />))}
                </div>
            }
        </div>
    )
}