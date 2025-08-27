import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // ✅ Add Google provider
import dbConnect from "@/lib/dbconnect";
import bcrypt from "bcryptjs";

// Define the user type returned by authorize
interface MongoUser {
  _id: number;
  name: string;
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials.password) return null;

        const usersCollection = dbConnect("users");

        // Find user by email
        const user = (await usersCollection.findOne({ email: credentials.email })) as MongoUser | null;
        if (!user) return null;

        // Compare password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Return user object for NextAuth session
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),

    // ✅ Add Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login", // custom login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
