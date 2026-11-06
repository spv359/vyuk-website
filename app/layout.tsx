import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "./site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://vyuk-v32-recreated.sujilssologinalllogi.chatgpt.site"),
  title: "Vyuk | Applied AI for Consumer Product Companies",
  description: "Vyuk delivers applied AI tailored to consumer product businesses, at scale, to help deliver business outcomes.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<SiteFooter /></body></html>;
}
