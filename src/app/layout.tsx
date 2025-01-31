import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AmountVisibilityTrigger } from "@/hooks/stocks/use-amount-visibility";
import NavSideBar from "@/components/layout/NavSideBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asset Tracker",
  description: "Asset Tracking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <NavSideBar />
          <div className="h-screen w-full overflow-hidden">
            <div className="w-full border-b p-2 shadow-sm">
              <SidebarTrigger />
              <AmountVisibilityTrigger />
            </div>
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
