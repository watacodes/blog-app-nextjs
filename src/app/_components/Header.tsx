"use client";

import Link from "next/link";
import useSupabaseSession from "../_hooks/useSupabaseSession";
import { supabase } from "../../utils/supabase";

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
  const { session, isLoading } = useSupabaseSession();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-gray-800 text-white p-6 font-bold flex justify-between items-center">
      <HeaderItem href="/">Blog</HeaderItem>
      {!isLoading && (
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <HeaderItem href="/admin">管理画面</HeaderItem>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <HeaderItem href="/contact">お問い合わせ</HeaderItem>
              <HeaderItem href="/login">ログイン</HeaderItem>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
