"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import useSupabaseSession from "../_hooks/useSupabaseSession";
import { supabase } from "../../_utils/supabase";
import { useEffect } from "react";

type HeaderProps = {
  href: string;
  children: React.ReactNode;
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
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
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
