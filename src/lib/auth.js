import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { connectToDb } from "./utils";
import { User } from "./models";
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET })
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