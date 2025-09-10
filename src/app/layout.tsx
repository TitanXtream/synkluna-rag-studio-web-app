import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BaseLayout } from "@/components";
import SideBarContent from "./_components/side-bar-content";
import {
  APP_NAME,
  APP_DESCRIPTION,
  COMPANY_NAME,
  openGraphImages,
  APP_DOMAIN,
  APP_INNER_DOMAIN,
} from "@/utils/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} | By ${COMPANY_NAME} to build, test, and deploy Retrieval-Augmented Generation (RAG) workflows`,
  description: APP_DESCRIPTION,

  keywords: ["AI softwares", "Software Agency", "Websocket"],
  applicationName: `${APP_NAME} | AI-powered software solutions`,

  openGraph: {
    type: "website",
    title: `${APP_NAME} | By ${COMPANY_NAME} to build, test, and deploy Retrieval-Augmented Generation (RAG) workflows`,
    siteName: `${APP_NAME}`,
    countryName: "India",
    description: APP_DESCRIPTION,
    images: openGraphImages,
    url: APP_DOMAIN,
  },

  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | By ${COMPANY_NAME} to build, test, and deploy Retrieval-Augmented Generation (RAG) workflows`,
    site: `${COMPANY_NAME}`,
    description: APP_DESCRIPTION,
    images: openGraphImages,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {children} */}
        <BaseLayout sidebar={<SideBarContent />}>{children}</BaseLayout>
      </body>
    </html>
  );
}
