"use client";

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-900 flex justify-between min-h-12 items-center p-6 ">
      <Link href="/" className="text-white font-bold">
        Blog
      </Link>
      <Link href="/contact" className="text-white font-bold">
        お問い合わせ
      </Link>
    </nav>
  );
};

export default Header;
