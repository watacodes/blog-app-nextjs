"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type FormType = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().max(30).required("お名前は必須です。"),
    email: yup
      .string()
      .email("Eメールアドレスをご入力ください。")
      .required("メールアドレスは必須です。"),
    message: yup.string().max(500).required("本文は必須です。"),
  });

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const onSubmit = async (data: FormType) => {
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("POST request got rejected.");
      }

      const result = await res.json();
      console.log("Form submitted: ", result);

      alert("送信しました。");
    } catch (err) {
      console.log(err);
    } finally {
      reset();
    }
  };

  const resetFields = () => {
    resetField("name");
    resetField("email");
    resetField("message");
  };

  return (
    <div className="h-screen flex justify-center max-w=[800px] mx-auto py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[800px] m-10"
        noValidate
      >
        <h1 className="font-bold text-xl">問い合わせフォーム</h1>

        <div className="my-8">
          <div className="flex justify-between w-full items-center">
            <label htmlFor="name" className="w-[280px]">
              お名前
            </label>
            <div className="w-full flex-col">
              <input
                type="text"
                id="name"
                disabled={isSubmitting}
                {...register("name")}
                className="w-full p-4 border border-gray-300 rounded-xl"
              />
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
            </div>
          </div>
        </div>

        <div className="my-8">
          <div className="flex justify-between w-full items-center">
            <label htmlFor="email" className="w-[280px]">
              メールアドレス
            </label>
            <div className="w-full flex-col">
              <input
                type="email"
                id="email"
                disabled={isSubmitting}
                className="w-full p-4 border border-gray-300 rounded-xl"
                {...register("email")}
              />
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            </div>
          </div>
        </div>

        <div className="my-8">
          <div className="flex justify-between w-full items-center">
            <label htmlFor="message" className="w-[280px]">
              本文
            </label>
            <div className="w-full flex-col">
              <textarea
                rows={8}
                id="message"
                disabled={isSubmitting}
                {...register("message")}
                className="w-full p-4 border border-gray-300 rounded-xl"
              />
              <p className="text-red-600 text-sm">{errors.message?.message}</p>
            </div>
          </div>
        </div>

        <div className="my-8 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-800 px-4 py-2 rounded-lg text-white mx-4 font-bold"
          >
            送信
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={resetFields}
            className="bg-gray-200 px-4 py-2 rounded-lg font-bold cursor-pointer"
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
