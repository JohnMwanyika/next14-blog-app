export const authConfig = {
    pages: {
        signIn: "/login", //unaunthenticated users will automatically be redirected here
    },
    providers: [],
    callbacks: {
        // we are adding additional information to our json web token; in our case userId and isAdmin
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin
            }
            return token;
        },
        // we are then updating session data using the token information above
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        // now the session/auth will contain the updated user information
        authorized({ auth, request }) {
            console.log(auth)
            console.log(`${request.method} ${request?.nextUrl.pathname}`)
            // we are now creating rules for the authorized user
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (isOnAdminPanel && !user?.isAdmin) {
                return false;
            }
            // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
            if (isOnBlogPage && !user) {
                return false
            }

            // AUTHENTICATED USERS SHUOLDNT REACH LOGIN
            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl))
            }
            // allow any other route to be accessed by returning true
            return true;
        }
    }
}