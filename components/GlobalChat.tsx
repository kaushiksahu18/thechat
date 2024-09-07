"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

function GlobalChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Welcome to our global chat!", sender: "bot" },
    { text: "Feel free to leave a message.", sender: "bot" },
  ]);

  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message! This is a demo, so responses are automated.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      <section
        id="chat"
        className="bg-gradient-to-b from-muted to-background py-20"
      >
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-3xl font-bold">Global Chat</h2>
          <motion.div
            className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-card shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-96 overflow-y-auto bg-muted p-4" ref={chatRef}>
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-lg p-2 ${msg.sender === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary"} w-fit max-w-[80%]`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </div>
            </div>
            <form onSubmit={sendMessage} className="flex p-4">
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mr-2 flex-grow"
              />
              <Button type="submit">Send</Button>
            </form>
          </motion.div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
}

export default GlobalChatPage;
