"use client"
import { usePathname, useSearchParams } from "next/navigation"

export default function NavigationTest() {

    const pathname = usePathname();
    console.log(pathname);

    const searchParams = useSearchParams();
    const q = searchParams.get("q");
    console.log(q);


    const handleClick = () => {
        console.log("==================================================================")
    }

    return (
        <>
            <div>
                <h1>Navigation Test Page</h1>
                <button onClick={handleClick}>Click me</button>
            </div>
        </>
    )
}