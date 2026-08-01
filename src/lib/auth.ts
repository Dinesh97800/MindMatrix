import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();

        try {
          await syncDatabase();
          const { AdminUser } = getDbModels();

          const user = await AdminUser.findOne({
            where: { email, isActive: true },
          });

          if (!user) {
            if (process.env.NODE_ENV === "development") {
              console.warn("[auth] No active admin user for email:", email);
            }
            return null;
          }

          const valid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!valid) {
            if (process.env.NODE_ENV === "development") {
              console.warn("[auth] Invalid password for:", email);
            }
            return null;
          }

          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("[auth] Login failed:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
