import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@/models/userModel";
import dbConnect from "@/config/connectMongoDB";




export const authOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            await dbConnect()
            if (!credentials) {
                return null;
            }
            const username = credentials.username;
            const password = credentials.password;
            // Add logic here to look up the user from the credentials supplied
            const admin = await User.findOne({ username });

            if (!admin) {
                const obj = { username: username, password: password };
                const newAdmin = new User(obj);
                let adminDb = await newAdmin.save();
                console.log(adminDb);
                return {
                    id: adminDb._id,
                    email: adminDb.username,
                }
            } else {
                //TODO:: Make this safer, encrypt passwords
                if (admin.password !== password) {
                    return null
                }
                // User is authenticated
                return {
                    id: admin._id,
                    email: admin.username,
                }
            }
        }
    }),
] ,

    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        encryption: true
    },
}
export default NextAuth(authOptions)


