import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import './theme-config.css';
import "./globals.css";

import { Container, Theme } from '@radix-ui/themes'

import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "@/QueryClientProvider";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.variable} >
        <QueryClientProvider>
        <AuthProvider>
        <Theme accentColor="violet" grayColor="sage" radius="large" scaling="110%">
        <NavBar />

            <Container mx='5'>
          <main>
              {children}
          </main>
              </Container>       
      </Theme>
        </AuthProvider>
        </QueryClientProvider>
      
        
      </body>
    </html>
  );
}
