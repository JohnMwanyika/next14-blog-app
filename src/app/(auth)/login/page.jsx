import { handleGithubLogin } from "@/lib/action";


export default function LoginPage() {

    return (
        <div>
            <form action={handleGithubLogin}>
                <button type="submit">Login with Github</button>
            </form>
        </div>
    )
}