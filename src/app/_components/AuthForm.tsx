"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(10).required(),
});

export type schemaType = yup.InferType<typeof schema>;

type Props = {
  onSubmit: (data: schemaType) => void;
  mode: "signup" | "login";
};

const AuthForm: React.FC<Props> = ({ onSubmit, mode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  return (
    <div className="flex justify-center pt-[240px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[400px] novalidate"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="abcde@company.com"
            disabled={isSubmitting}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            disabled={isSubmitting}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {mode === "signup" ? "登録" : "ログイン"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
