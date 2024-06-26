import { Roboto_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider"

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Memo_Flow",
  description: "'Memo_Flow' Note app Generated by create next app",
  icons: {
    icon: ["./favicon.png"],
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
        <SessionProvider session={session}>
          <Navbar />
            {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}