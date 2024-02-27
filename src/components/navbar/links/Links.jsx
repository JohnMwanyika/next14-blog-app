"use client"
import { useState } from 'react';
import styles from './links.module.css'
import NavLink from "./navLink/NavLink";

export default function Links() {
    // use state
    const [open, setOpen] = useState(false);

    const links = [
        {
            title: "Home page",
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
    ];

    const session = true;
    const isAdmin = true;
    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}

                {
                    session ?
                        <>
                            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
                            <button className={styles.logout}>Logout</button>
                        </>
                        :
                        <NavLink item={{ title: "Login", path: "/login" }} />
                }
            </div>
            <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button>
            {
                open &&
                <div className={styles.mobileLinks}>
                    {links.map((link) => (<NavLink item={link} key={link.title} />))}
                </div>
            }
        </div>
    )
}