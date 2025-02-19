import { useFormContext } from "react-hook-form";
import { SchemaType } from "./AuthForm";
import React from "react";

type Props = {
  children: React.ReactNode;
  labelName: keyof SchemaType;
  type: React.HTMLInputTypeAttribute;
};

const CustomInput: React.FC<Props> = ({ children, labelName, type }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<SchemaType>();

  return (
    <div>
      <label
        id={labelName}
        htmlFor={labelName}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {children}
      </label>

      <input
        {...register(labelName)}
        type={type}
        name={labelName}
        id={labelName}
        placeholder={type === "email" ? "abcde@company.com" : "••••••••"}
        disabled={isSubmitting}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />

      <p className="text-red-600">{errors[labelName]?.message}</p>
    </div>
  );
};

export default CustomInput;
