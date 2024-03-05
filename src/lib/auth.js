import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";

// function to login user with credentials
const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User does not exist")

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error("Wrong username or password");
        return user
    } catch (error) {
        console.log(error)
        throw new Error("Failed to login")
    }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log(user, account, profile);
            if (account.provider === "github") {
                connectToDb();
                try {
                    // find user with email github email
                    const user = await User.findOne({ email: profile.email });

                    if (!user) {
                        console.log("User not found creating...");

                        const newUser = await User.create({
                            username: profile.name,
                            email: profile.email,
                            img: profile.avatar_url
                        });
                        console.log("User created")
                    }
                } catch (error) {
                    console.log(error);
                    return false
                }
            }
            return true;
        }
    }
})