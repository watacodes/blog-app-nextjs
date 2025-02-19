"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { supabase } from "../../_utils/supabase";
import CustomInput from "./Input";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email.")
    .required("Your E-mail address is required."),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters.")
    .required("Your Password is required."),
});

export type SchemaType = yup.InferType<typeof schema>;

type Props = {
  mode: "signup" | "login";
};

const AuthForm: React.FC<Props> = ({ mode }) => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const handleCreateAccount = async (data: SchemaType) => {
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

  const handleLogin = async (data: SchemaType) => {
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

  const onSubmit = (data: SchemaType) => {
    if (mode === "login") {
      handleLogin(data);
    } else {
      handleCreateAccount(data);
    }
  };

  return (
    <div className="flex justify-center pt-[240px]">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-[400px] novalidate"
        >
          <CustomInput labelName="email" type="email">
            メールアドレス
          </CustomInput>

          <CustomInput labelName="password" type="password">
            パスワード
          </CustomInput>

          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center"
            >
              {mode === "signup" ? "登録" : "ログイン"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthForm;
