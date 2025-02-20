"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import useSupabaseSession from "../_hooks/useSupabaseSession";
import { supabase } from "../../_utils/supabase";

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
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error: ", error);
      return;
    }

    router.replace("/");
  };

  const UserNavItems: React.FC = () => {
    return (
      <>
        <HeaderItem href="/admin">管理画面</HeaderItem>
        <button onClick={handleLogout}>ログアウト</button>
      </>
    );
  };

  const PublicNavItems: React.FC = () => {
    return (
      <>
        <HeaderItem href="/contact">お問い合わせ</HeaderItem>
        <HeaderItem href="/login">ログイン</HeaderItem>
      </>
    );
  };

  return (
    <header className="bg-gray-800 text-white p-6 font-bold flex justify-between items-center">
      <HeaderItem href="/">Blog</HeaderItem>

      {!isLoading && (
        <div className="flex items-center gap-4">
          {session ? <UserNavItems /> : <PublicNavItems />}
        </div>
      )}
    </header>
  );
};

export default Header;
