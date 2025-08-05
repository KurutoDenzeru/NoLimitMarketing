// src/app/layout.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "NoLimitMarketing - US",
    template: "%s | NoLimitMarketing - US",
  },
  description:
    "Create, customize, and download barcodes in multiple formats. Free online barcode generator supporting CODE128, EAN13, UPC, and more.",
  alternates: {
    canonical: 'https://nolimitmarketing.vercel.app',
  },
  keywords: [
    "barcode generator",
    "barcode maker",
    "free barcode generator",
    "Barcoda - Barcode Generator",
    "Barcoda - Barcode Maker",
  ],
  authors: [{ name: "Kurt Calacday", url: "https://github.com/KurutoDenzeru" }],
  creator: "Kurt Calacday",
  publisher: "Kurt Calacday",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nolimitmarketing.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nolimitmarketing.vercel.app",
    title: "NoLimitMarketing - US",
    description:
      "Modern barcode generator that combines sleek design with seamless functionality. Built on Next.js, Tailwind, and Shadcn for effortless customization.",
    siteName: "NoLimitMarketing - US",
    images: [
      {
        url: "/sitemap.webp",
        width: 1200,
        height: 630,
        alt: "NoLimitMarketing - US",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoLimitMarketing - US",
    description:
      "Modern barcode generator that combines sleek design with seamless functionality. Built on Next.js, Tailwind, and Shadcn for effortless customization.",
    images: ["/OpenGraph.webp"],
    creator: "@krtclcdy",
  },
  icons: "/loop.png",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <main className="grow">
            {children}
          </main>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
