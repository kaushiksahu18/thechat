import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@/lib/utils";

if (!process.env.NEXTAUTH_URL || !process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH environment variables");
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (credentials && credentials.email && credentials.password) {
          try {
            const dbuser = await prismaClient.user.upsert({
              where: {
                email: credentials.email,
                password: credentials.password,
              },
              update: { name: credentials?.name as string },
              create: {
                name: credentials?.name as string,
                email: credentials.email,
                password: credentials.password
              },
            });

            if (dbuser.id) {
              return {
                ...dbuser,
                id: dbuser.id.toString(),
              };
            }
          } catch (err) {
            console.log(err);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   // if (account?.provider === "google" && user.email) {
    //   //   try {
    //   //     const dbuser = await prismaClient.user.upsert({
    //   //       where: {
    //   //         email: user.email,
    //   //       },
    //   //       update: {
    //   //         name: user.name as string,
    //   //       },
    //   //       create: {
    //   //         name: user.name as string,
    //   //         email: user.email,
    //   //       },
    //   //     });

    //   //     if (dbuser.id) {
    //   //       user.id = dbuser.id.toString();
    //   //       return true;
    //   //     }
    //   //   } catch (err) {
    //   //     console.log(err);
    //   //     return false;
    //   //   }
    //   // }
    //   return true;
    // },
    async redirect({ baseUrl, url }) {
      try {
        // If the URL is relative, concatenate with the baseUrl
        if (url.startsWith("/")) {
          return `${baseUrl}${url}`;
        }

        // If the URL is an absolute path within the same domain, ensure it's correctly formatted
        const isAbsoluteInternalUrl = url.startsWith(baseUrl);
        if (isAbsoluteInternalUrl) {
          return url;
        }

        // If the URL is an external link, validate it to ensure it's a well-formed URL
        const urlObj = new URL(url);
        if (urlObj.origin !== baseUrl) {
          // Optionally, log a warning or handle external redirects differently
          console.warn(`External redirect to ${url}`);
          return url;
        }

        // Fallback to the baseUrl if none of the above cases match
        return baseUrl;
      } catch (error) {
        console.error("Error in redirect callback:", error);
        // Fallback in case of an error
        return baseUrl;
      }
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };