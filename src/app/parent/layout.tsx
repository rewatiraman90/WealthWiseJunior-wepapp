import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Parents — Invest in Your Child's Financial Future",
  description:
    "WealthWise Junior helps Indian parents give their children a real financial education. Track your child's progress, see what they're learning, and build money habits together.",
  openGraph: {
    title: "For Parents — WealthWise Junior",
    description:
      "Give your child the financial education India's schools don't teach. Track progress, monitor lessons, and watch money habits form from Class 5.",
    url: "https://wealthwisejunior.in.net/parent",
  },
};

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
