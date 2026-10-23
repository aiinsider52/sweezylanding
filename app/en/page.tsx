import type { Metadata } from "next";
import { LandingPage } from "../components/home/LandingPage";
import { dachHomeMetadata } from "../../lib/dach-home-metadata";

export const metadata: Metadata = dachHomeMetadata("en");

export default function EnPage() {
  return <LandingPage locale="en" />;
}
