import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notepad",
  description: "Notepad is a simple text editor, that you can use to write notes and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <Provider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900 text-neutral-200`}
          >
            {children}
            <Toaster />
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
