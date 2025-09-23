import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

// Load a clean Google Font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
// Metadata for SEO + social
export const metadata: Metadata = {
  title: "Feedback Hub",
  description: "Share your thoughts and feedback with us",
  icons: {
    icon: "/feedback.png",
  },
  openGraph: {
    title: "Feedback Hub",
    description: "A simple way to share and manage feedback",
    url: "https://codeswithrakib.vercel.app",
    siteName: "Feedback Hub",
    images: [
      {
        url: "/feedback.png",
        width: 512,
        height: 512,
        alt: "Feedback Hub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster position="top-right" theme="dark" richColors closeButton />
      </body>
    </html>
  );
}
