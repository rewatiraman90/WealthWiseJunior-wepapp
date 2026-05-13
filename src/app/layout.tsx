import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { JarProvider } from "@/components/JarContext";

export const metadata: Metadata = {
  title: {
    default: "WealthWise Junior — Financial Literacy for Indian Students",
    template: "%s | WealthWise Junior",
  },
  description:
    "WealthWise Junior is India's first gamified financial literacy platform for school students (Class 5–12). Learn money management, investing, and wealth-building with AI-powered lessons.",
  keywords: [
    "financial literacy for kids India",
    "money management for students",
    "personal finance for children",
    "investing for teenagers India",
    "WealthWise Junior",
    "financial education Class 5 to 12",
    "kids finance app India",
  ],
  authors: [{ name: "WealthWise Junior" }],
  metadataBase: new URL("https://wealthwisejunior.in.net"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://wealthwisejunior.in.net",
    siteName: "WealthWise Junior",
    title: "WealthWise Junior — Financial Literacy for Indian Students",
    description:
      "Gamified financial education for Class 5–12. AI teacher, video classes, leaderboards & more. Join 12,000+ students building wealth habits early.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WealthWise Junior — Financial Literacy for Indian Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WealthWise Junior — Financial Literacy for Indian Students",
    description:
      "India's first gamified financial literacy platform for school students. AI teacher, video classes, 12,000+ students.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
