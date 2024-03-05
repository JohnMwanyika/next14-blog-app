import { handleGithubLogin, login } from "@/lib/action";


export default function LoginPage() {

    return (
        <div>
            <form action={handleGithubLogin}>
                <button type="submit">Login with Github</button>
            </form>
            <form action={login}>
                <input type="text" placeholder="Email" name="email" id="" required />
                <input type="password" placeholder="Passoward" name="password" id="" required />
                <button>Login with credentials</button>
            </form>
        </div>
    )
}