import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import clsx from "clsx";
import "./globals.css";

export const metadata: Metadata = {
  title: "msw+storybook",
  description: "msw+storybookで始めるフロントエンドテスト",
};

type Props = Readonly<{ children: React.ReactNode }>;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 }, mutations: { retry: 1 } },
});

export function Layout({ children }: Props) {
  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <main className={clsx("prose")}>{children}</main>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="jp">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
