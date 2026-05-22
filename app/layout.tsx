import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finova",
  description: "AI-powered finance platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistPixelSquare.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
