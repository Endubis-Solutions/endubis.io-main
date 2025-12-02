import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Navbar } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Endubis - Blockchain Solutions for Modern Finance",
  description:
    "Unlock the power of blockchain with Endubis. Secure lending, transparent escrow, and innovative wallet solutions for decentralized finance.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/endubis-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="m-0 p-0 h-full w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg"
            >
              Skip to content
            </a>
            {/* <Navbar /> */}
            <div className="pt-16">{children}</div>
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
