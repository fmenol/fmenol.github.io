import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/Header";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
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
    <html lang="en" className={firaCode.variable}>
      <body className="min-h-screen bg-background font-mono">
        <div className="min-h-screen bg-paper max-w-[72rem] mx-auto px-6 py-8 shadow-lg">
          <Header />
          <main>{children}</main>
          <footer className="mt-16 pt-8 border-t border-border text-muted text-sm">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
