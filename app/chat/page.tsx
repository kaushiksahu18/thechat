"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, LogOut, Moon, Sun, User } from "lucide-react";
import Image from "next/image";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
};

const chats: Chat[] = [
  {
    id: 1,
    name: "Alice Smith",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Johnson",
    lastMessage: "Can we meet tomorrow?",
    time: "Yesterday",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Charlie Brown",
    lastMessage: "Thanks for your help!",
    time: "2 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  // Add more chat items as needed
];

const ChatItem = React.memo(
  ({
    chat,
    isSelected,
    onSelect,
  }: {
    chat: Chat;
    isSelected: boolean;
    onSelect: () => void;
  }) => (
    <button
      className={`w-full p-4 text-left transition-colors hover:bg-accent ${
        isSelected ? "bg-accent" : ""
      }`}
      onClick={onSelect}
      aria-selected={isSelected}
      role="option"
    >
      <div className="flex items-center">
        <Image
          src={chat.avatar}
          alt={`${chat.name}'s avatar`}
          width={40}
          height={40}
          className="mr-3 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">{chat.name}</div>
          <div className="truncate text-sm text-muted-foreground">
            {chat.lastMessage}
          </div>
        </div>
        <div className="ml-2 text-xs text-muted-foreground">{chat.time}</div>
      </div>
    </button>
  ),
);

ChatItem.displayName = "ChatItem";

const UserProfile = () => (
  <div className="border-t p-4">
    <div className="mb-4 flex items-center gap-4">
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="User avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div>
        <div className="font-semibold">John Doe</div>
        <div className="text-sm text-muted-foreground">john@example.com</div>
      </div>
    </div>
    <Button variant="outline" className="w-full justify-start">
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </Button>
  </div>
);

const Sidebar = ({
  selectedChat,
  setSelectedChat,
  closeSidebar,
}: {
  selectedChat: number | null;
  setSelectedChat: (id: number) => void;
  closeSidebar: () => void;
}) => (
  <div className="flex h-full flex-col">
    <div className="flex-1 overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Chats</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div role="listbox" aria-label="Chat list">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat === chat.id}
              onSelect={() => {
                setSelectedChat(chat.id);
                closeSidebar();
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
    <UserProfile />
  </div>
);

const ChatPlaceholder = ({ selectedChat }: { selectedChat: number | null }) => (
  <div className="text-center">
    <MessageCircle className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
    {selectedChat ? (
      <>
        <p className="text-xl">Chat {selectedChat} selected</p>
        <p className="text-muted-foreground">
          Start chatting with{" "}
          {chats.find((chat) => chat.id === selectedChat)?.name}
        </p>
      </>
    ) : (
      <>
        <p className="text-xl">Select a chat to start messaging</p>
        <p className="text-muted-foreground">
          Choose a conversation from the sidebar
        </p>
      </>
    )}
  </div>
);

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert" className="p-4">
      <p className="text-red-500">Something went wrong:</p>
      <pre className="text-sm">{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  const memoizedSidebar = useMemo(
    () => (
      <Sidebar
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        closeSidebar={closeSidebar}
      />
    ),
    [selectedChat, closeSidebar],
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for larger screens */}
      <div className="hidden w-80 border-r md:block">{memoizedSidebar}</div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                {memoizedSidebar}
              </SheetContent>
            </Sheet>
            <h1 className="ml-4 text-2xl font-bold">Chat Dashboard</h1>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 items-center justify-center p-4">
          <ChatPlaceholder selectedChat={selectedChat} />
        </div>
      </div>
    </div>
  );
}
