import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { eq, or } from "drizzle-orm";
import { users, authentidatas } from "@/db/schema";
const crypto = require("crypto");

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
  }
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      phone: string;
      image?: string | null;
    }
  }
}

const  hashPassword = (password: string):string => {
    return crypto.createHash('sha256').update(password).digest('base64');
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Please enter your email/phone and password");
        }

        // Fetch user by email or phone
        const user = await db
          .select()
          .from(users)
          .where(
            or(eq(users.Email, credentials.identifier), eq(users.Phone, credentials.identifier))
          )
          .limit(1);

        if (!user[0]) {
          throw new Error("No user found");
        }

        // Fetch authentication data
        const authData = await db
          .select()
          .from(authentidatas)
          .where(eq(authentidatas.UserId, user[0].Id))
          .limit(1);

        if (!authData[0]) {
          throw new Error("Authentication data not found");
        }

        // Compare passwords using bcrypt
        const isPasswordValid =  hashPassword(credentials.password) === authData[0].KeyHash;
        if (!isPasswordValid) {
            console.log("Wrong Password");  
            throw new Error("Invalid password");
        }

        return {
          id: user[0].Id,
          email: user[0].Email,
          name: user[0].Name,
          phone: user[0].Phone,
        };
      },
    }),
  ],
  pages: {
    error : "/auth"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
