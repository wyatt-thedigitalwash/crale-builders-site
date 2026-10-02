import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import "./globals.css";

// Headings, navigation, buttons. The width axis powers the 87.5% semi-condensed headings.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Body copy, testimonials, captions.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cralebuilders.com"),
  title: {
    default: "Crale Builders | Custom Homes, Remodeling, and Indian Lake Homes in Sidney, Ohio",
    template: "%s | Crale Builders, Sidney, Ohio",
  },
  description:
    "Crale Builders is a Sidney, Ohio general contractor building custom homes, additions, and remodels across west central Ohio, and lake homes at Indian Lake since 1999.",
  // Icons come from scripts/generate-brand-assets.mjs (CB mark). og-image.png is the homepage hero photo
  // full bleed and darkened, with the wordmark and the town and phone centered over it.
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Crale Builders",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crale Builders logo over a blue two-story farmhouse with a wraparound porch. Sidney, Ohio, 937.498.8000.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

// Matches the Seawall Stone header so the browser bar blends into the page.
export const viewport: Viewport = {
  themeColor: "#ECEEE9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
