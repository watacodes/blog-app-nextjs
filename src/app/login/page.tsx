"use client";

import AuthForm, { schemaType } from "../_components/AuthForm";
import { supabase } from "../../_utils/supabase";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (data: schemaType) => {
    const { email, password } = data;

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

  return <AuthForm onSubmit={handleLogin} mode="login" />;
};

export default LoginPage;
