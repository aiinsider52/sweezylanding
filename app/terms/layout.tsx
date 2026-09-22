import type { Metadata } from "next";
import { BASE_URL } from "../../lib/alternates";

export const metadata: Metadata = {
  alternates: { canonical: `${BASE_URL}/terms` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
