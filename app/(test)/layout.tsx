import "../globals.css";
import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import { fonts } from "../fonts";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "OpenMock",
  description: "",
};

import { Providers } from "../providers";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section lang="en" className={fonts.worksans.className}>
      <Providers>{children}</Providers>
    </section>
  );
}
