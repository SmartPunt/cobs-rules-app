import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cob's Rules Live Trial",
  description: "Private admin and subscriber trial with Supabase auth and realtime updates.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
