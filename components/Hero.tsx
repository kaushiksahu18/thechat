"use client"

import { motion, useAnimation, useInView } from "framer-motion";
import { Send } from "lucide-react";
import router from "next/router";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

function HeroPage() {
  const heroRef = useRef(null);
  const mainControls = useAnimation();
  const isInView = useInView(heroRef, { once: true });

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);
  return (
    <section
      ref={heroRef}
      className="overflow-hidden bg-gradient-to-b from-background to-muted py-20"
    >
      <div className="container relative mx-auto text-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h2 className="mb-6 text-4xl font-bold">
            Experience Real-Time Chat Like Never Before
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Connect instantly with friends and colleagues around the world.
          </p>
        </motion.div>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-card shadow-lg">
            <div className="bg-muted p-4">
              <h3 className="mb-2 font-semibold">Chat Preview</h3>
              <div className="space-y-2">
                {[
                  "Hey there!",
                  "Welcome to THEchat!",
                  "Ready to connect?",
                  "✌️",
                ].map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
                    className={`rounded-lg p-2 ${index % 2 === 0 ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary"} w-fit max-w-[80%]`}
                  >
                    {msg}
                  </motion.div>
                ))}
              </div>
            </div>
            <form
              onClick={(e) => e.preventDefault()}
              className="flex items-center bg-card p-4"
            >
              <Input
                type="text"
                placeholder="Type a message..."
                className="mr-2 flex-grow"
                disabled
              />
              <Button
                type="submit"
                size="icon"
                onClick={() => router.push("/chat")}
                disabled
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <Button size="lg" asChild>
            <Link href="/chat">Sign In</Link>
          </Button>
        </motion.div>
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {[...Array(50)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: Math.random() * 40 + 10,
                height: Math.random() * 40 + 10,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1 }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroPage;
