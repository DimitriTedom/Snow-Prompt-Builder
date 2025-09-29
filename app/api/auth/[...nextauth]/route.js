import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await prisma.user.findUnique({ 
          where: { email: session.user.email } 
        });
        if (sessionUser) {
          session.user.id = sessionUser.id;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await prisma.$connect();
        
        //check if a user already exists
        const userExists = await prisma.user.findUnique({ 
          where: { email: profile.email } 
        });
        
        //if not, create a new user
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name.replace(/\s+/g, "").toLowerCase(),
              image: profile.picture,
            }
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error.message);
        return false;
      } finally {
        await prisma.$disconnect();
      }
    },
  },
});

export { handler as GET, handler as POST };