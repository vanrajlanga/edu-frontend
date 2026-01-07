import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CompareProvider } from "@/context/CompareContext";
import { CompareWidget } from "@/components/common/CompareWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PlanEdu - Find Your Perfect College",
  description: "Discover colleges, courses, and career paths. Compare colleges, check rankings, and make informed decisions about your education.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CompareProvider>
            {children}
            <CompareWidget />
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
