import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "msw+storybook",
  description: "msw+storybookで始めるフロントエンドテスト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={clsx("prose")}>{children}</body>
    </html>
  );
}
