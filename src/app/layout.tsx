import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Petmunity",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="bg-gray-50">
      <body className="md:max-w-[375px] w-full relative m-auto min-h-screen bg-white p-0 font-sans lining-nums text-gray-900 outline-none">
        {children}
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}
