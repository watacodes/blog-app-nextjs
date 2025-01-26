"use client";

import Header from "./_components/Header";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  console.log(process.env.DATABASE_URL);
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
