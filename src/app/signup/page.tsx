"use client";

import { supabase } from "../../_utils/supabase";
import AuthForm, { schemaType } from "../_components/AuthForm";

const SignUpPage: React.FC = () => {
  const handleCreateAccount = async (data: schemaType) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });

    if (error) {
      alert("登録に失敗しました。");
    } else {
      alert("確認メールを送信しました。");
    }
  };

  return <AuthForm onSubmit={handleCreateAccount} mode="signup" />;
};

export default SignUpPage;
