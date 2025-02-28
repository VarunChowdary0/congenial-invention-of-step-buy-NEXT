import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserType } from "@/types/personal";
import axios from "axios";
import { server_url } from "@/components/Constant";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    remember: boolean;
    role: UserType;
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      phone: string;
      image?: string | null;
      role: UserType;
    };
  }
}

let remember: boolean = false;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        remember: { label: "Remember me", type: "checkbox", defaultValue: false },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Please enter your email/phone and password");
        }
      
        console.log("Remember:", credentials.remember);
      
        try {
          // ✅ Make API request to login endpoint
          const { data: user } = await axios.post(`${server_url}/api/login`, {
            username: credentials.identifier,
            password: credentials.password,
          });
      
          console.log("API Response:", user);
      
          if (!user || !user.id) {
            throw new Error("No user found");
          }
      
          remember = credentials.remember === "true";
      
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            remember: remember,
            role: user.role,
          };
        } catch (error: any) {
          console.error("Login Error:", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Login failed");
        }
      }
      
    }),
  ],
  pages: {
    error: "/auth",
    signOut: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: remember ? 90 * 24 * 60 * 60 : 24 * 60 * 60, // 90 days or 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.email = user.email;
        token.remember = user.remember;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
        session.user.role = token.role as UserType;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
