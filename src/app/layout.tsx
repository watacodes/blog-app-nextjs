"use client";

import Header from "./_components/Header";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
