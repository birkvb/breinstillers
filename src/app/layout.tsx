import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Breinstillers | Van Overleven naar Levendigheid",
  description:
    "Creëer rust in je hoofd en vertrouwen in je lichaam. Breinstillers biedt persoonlijke begeleiding en een 3-daagse live training voor mensen met chronische pijn. Door Wietske Hagg in Gorssel.",
  keywords: [
    "chronische pijn",
    "begeleiding",
    "coaching",
    "mindfulness",
    "Gorssel",
    "Wietske Hagg",
    "breinstillers",
    "workshop",
    "leven met pijn",
  ],
  openGraph: {
    title: "Breinstillers | Van Overleven naar Levendigheid",
    description:
      "Creëer rust in je hoofd en vertrouwen in je lichaam. 3-daagse live training voor een doorbraak in je leven met chronische pijn.",
    url: "https://breinstillers.nl",
    siteName: "Breinstillers",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breinstillers | Van Overleven naar Levendigheid",
    description:
      "3-daagse live training: van overleven naar levendigheid. Creëer rust, vertrouwen en nieuwe perspectieven.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
