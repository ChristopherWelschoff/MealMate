import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        session.user.isAdmin = session.user.email === process.env.ADMIN_EMAIL;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
