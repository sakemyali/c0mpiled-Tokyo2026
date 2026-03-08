import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maisen",
  description: "UX compiler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
