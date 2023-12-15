import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Petmunity",
  description: "",
};

const myFont = localFont({
  src: [
    {
      path: "./fonts/SCDream1.otf",
      weight: "100",
    },
    {
      path: "./fonts/SCDream2.otf",
      weight: "200",
    },
    {
      path: "./fonts/SCDream3.otf",
      weight: "300",
    },
    {
      path: "./fonts/SCDream4.otf",
      weight: "400",
    },
    {
      path: "./fonts/SCDream5.otf",
      weight: "500",
    },
    {
      path: "./fonts/SCDream6.otf",
      weight: "600",
    },
    {
      path: "./fonts/SCDream7.otf",
      weight: "700",
    },
    {
      path: "./fonts/SCDream8.otf",
      weight: "800",
    },
    {
      path: "./fonts/SCDream9.otf",
      weight: "900",
    },
  ],
  display: "swap",
  variable: "--font-scdream",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`bg-gray-50 ${myFont.className} `}>
      <body className="md:max-w-[375px] w-full relative m-auto min-h-screen bg-white p-0 font-sans lining-nums text-gray-900 outline-none">
        <div id="modal-root" />
        {children}
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}
