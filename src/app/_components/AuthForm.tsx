"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  mode: "signup" | "login";
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};

const AuthForm: React.FC<Props> = ({
  handleSubmit,
  mode,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[400px]">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abcde@company.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
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
