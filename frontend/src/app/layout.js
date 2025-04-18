import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatPopup from "../component/ChatPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CashCat",
  description: "Keep Ozzy Happy, Save More Money",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ChatPopup />
      </body>
    </html>
  );
}