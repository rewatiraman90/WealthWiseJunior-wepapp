import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the WealthWise Junior team. We're here to help students, parents, and schools with any questions about our financial literacy platform.",
  openGraph: {
    title: "Contact WealthWise Junior",
    description: "Have a question? We're here to help. Reach out to the WealthWise Junior team.",
    url: "https://www.wwjcampus.in.net/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
