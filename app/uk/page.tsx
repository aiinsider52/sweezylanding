import type { Metadata } from "next";
import { LandingPage } from "../components/home/LandingPage";
import { dachHomeMetadata } from "../../lib/dach-home-metadata";

export const metadata: Metadata = dachHomeMetadata("uk");

export default function UkPage() {
  return <LandingPage locale="uk" />;
}
