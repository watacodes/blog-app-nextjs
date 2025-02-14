"use client";

import { supabase } from "../../_utils/supabase";
import { useState } from "react";
import AuthForm from "../_components/AuthForm";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      setEmail("");
      setPassword("");
      alert("確認メールを送信しました。");
    }
  };

  return (
    <AuthForm
      handleSubmit={handleCreateAccount}
      mode="signup"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default SignUpPage;
