import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AmountVisibilityTrigger } from "@/hooks/stocks/use-amount-visibility";
import { ModeToggle, ThemeProvider } from "@/components/ui/theme-providers";
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <NavSideBar />
            <div className="h-screen w-full overflow-hidden">
              <div className="flex w-full justify-between border-b p-2 shadow-sm">
                <div>
                  <SidebarTrigger />
                  <AmountVisibilityTrigger />
                </div>
                <div>
                  <ModeToggle />
                </div>
              </div>
              {children}
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
