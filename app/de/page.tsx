import type { Metadata } from "next";
import { LandingPage } from "../components/home/LandingPage";
import { dachHomeMetadata } from "../../lib/dach-home-metadata";

export const metadata: Metadata = dachHomeMetadata("de");

export default function DePage() {
  return <LandingPage locale="de" />;
}
