import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import {ModeToggle} from "@/components/Theme"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THEchat",
  description: "Real time chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-4 right-4"><ModeToggle /></div>
        </Providers>
      </body>
    </html>
  );
}
