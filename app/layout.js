import { Roboto_Mono, Inter } from "next/font/google";
import "./globals.css";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Memo_Flow",
  description: "'Memo_Flow' Note app Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>{children}</body>
    </html>
  );
}