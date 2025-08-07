import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuoteIt",
  description: "Quote it and share",
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
        {children}
     {process.env.NODE_ENV === 'development' && (
        <>
          <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
          <script
            dangerouslySetInnerHTML={{ __html: 'eruda.init();' }}
          />
        </>
      )}
      </body>
    </html>
  );
}
