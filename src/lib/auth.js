import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

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
    ...authConfig,
    providers: [
        GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }), //github client id and secret from github authorization app
        CredentialsProvider({
            async authorize(credentials) {
                // here is where we write our functionality to verify user credentials
                // on successful verification we return the verified/authenticated user
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: { // The authenticated user can now be accessible at this point
        // this function controlls wheather the user should be allowed to signin or not
        // returns true to allow ore false to redirect user to error pages
        async signIn({ user, account, profile }) {
            // user:- contains the user obtained from the authentication above
            // account:- contains provider information e.g type:credentials/github , provider and providerAccountId which is same as userId
            // profile :- in the case of social accounts, this will contain user information
            // console.log({ USER: user, ACCOUNT: account, PROFILE: profile });
            if (account.provider === "github") {
                // here we are storing user info to db incase of users signing in with github.
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
            // we return true to allow user to proceed with the signin process
            return true;
        },
        // including callback function from the authConfig file
        ...authConfig.callbacks
    }
})