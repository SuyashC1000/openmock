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
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import SimpleNavbar from "../_components/SimpleNavbar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section lang="en" className={fonts.worksans.className}>
      <Providers>
        <div className="h-screen w-screen flex flex-col">
          <SimpleNavbar />
          <div className="flex flex-1 overflow-y-auto">
            <div className="flex-1 p-4 h-fit min-h-full bg-neutral-200 flex flex-col gap-2">
              {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
              {children}
              <Footer />
            </div>
          </div>
        </div>
      </Providers>
    </section>
  );
}
