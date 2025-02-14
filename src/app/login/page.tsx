"use client";

import { useState } from "react";
import AuthForm from "../_components/AuthForm";
import { supabase } from "../../_utils/supabase";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("ログインに失敗しました。");
    } else {
      router.replace("/admin/posts");
    }
  };

  return (
    <AuthForm
      handleSubmit={handleLogin}
      mode="login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default LoginPage;
