import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, RTL_LOCALES } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/nav";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Torvault Safe Company | Fire & High-Security Safes, Canada",
  description:
    "Torvault engineers UL-rated fire and burglary safes — from factory fire-tested protection to UL TL-30 tool resistance — for Canadian businesses and dealers.",
  icons: { icon: "/icon-blue.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b1d3a",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${jakarta.variable} ${caveat.variable} ${notoSansArabic.variable}`}
    >
      <body>
        <OrganizationJsonLd />
        <WebSiteJsonLd locale={locale} />
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
