"use client";

import Link from "next/link";

type HeaderProps = {
  href: string;
  children: string;
};

const HeaderItem: React.FC<HeaderProps> = ({ href, children }) => {
  return (
    <Link href={href} className="text-white font-bold">
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-900 flex justify-between min-h-12 items-center p-6 ">
      <HeaderItem href="/">Blog</HeaderItem>
      <HeaderItem href="/contact">お問い合わせ</HeaderItem>
    </nav>
  );
};

export default Header;
