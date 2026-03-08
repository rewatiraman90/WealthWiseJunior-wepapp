import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { JarProvider } from "@/components/JarContext";

export const metadata: Metadata = {
  title: "WealthWise Junior - Financial Literacy for India",
  description: "Gamified financial education for students. Master money, achieve goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JarProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </JarProvider>
      </body>
    </html>
  );
}
