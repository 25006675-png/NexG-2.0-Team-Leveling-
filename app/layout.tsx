import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // If you have css, otherwise remove this line

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pencen Mobile",
  description: "Government Pension App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
