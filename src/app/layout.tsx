import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
//import AuthSession from "@/app/_component/AuthSession";
import { CookiesProvider } from 'react-cookie';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full">
        {/* <AuthSession> */}
          {/* <CookiesProvider> // 쿠키 provider */}
            {children}
          {/* </CookiesProvider> / 쿠키 provider */}
        {/* </AuthSession> */}
      </body>
    </html>
  );
}
