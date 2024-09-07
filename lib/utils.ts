import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSystemTheme = () => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkTheme) {
    return "dark";
  } else {
    return "light";
  }
};

export const prismaClient = new PrismaClient();