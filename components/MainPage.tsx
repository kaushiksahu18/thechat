"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import HeroPage from "@/components/Hero";
import GlobalChatPage from "@/components/GlobalChat";

function MainPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed left-0 right-0 top-0 z-10 border-b bg-background/80 p-4 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold hover:underline cursor-pointer">THEchat</h1>
          </motion.div>
          <nav>
            <motion.ul
              className="flex items-center justify-evenly space-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <li>
                <Link href="#features" className="hover:text-primary">
                  <Button className="py-1" size="sm" variant="ghost">Features</Button>
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-primary">
                  <Button className="py-1" size="sm" variant="ghost">Chat</Button>
                </Link>
              </li>
            </motion.ul>
          </nav>
        </div>
      </header>

      <main className="mt-16 flex-grow">
        <HeroPage />

        <section id="features" className="py-20">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Zap className="mb-4 h-10 w-10 text-primary" />,
                  title: "Lightning Fast",
                  description:
                    "Experience instant message delivery with our optimized infrastructure.",
                },
                {
                  icon: <Shield className="mb-4 h-10 w-10 text-primary" />,
                  title: "Secure Chats",
                  description:
                    "Your conversations are protected with end-to-end encryption.",
                },
                {
                  icon: <Users className="mb-4 h-10 w-10 text-primary" />,
                  title: "Group Chats (alpha)",
                  description:
                    "Create and manage group conversations with ease.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg bg-card p-6 text-center shadow-md flex flex-col items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {feature.icon}
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="bg-muted py-20">
          <div className="container mx-auto text-center">
            <motion.h2
              className="mb-6 text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Start Chatting with your friends?
            </motion.h2>
            <motion.p
              className="mb-8 text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Sign up now and experience the future of communication.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/chat">
                <Button size="lg">Get Started</Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <GlobalChatPage />
      </main>

      <footer className="bg-muted py-4 text-center text-muted-foreground">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; THEchat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
