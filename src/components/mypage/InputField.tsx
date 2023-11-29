import React from "react";
import type { UseFormReturn } from "react-hook-form";

import type { InputProps } from "@/types/auth.type";
import type { StoreFormProps } from "@/types/store.type";

interface Props {
  input: InputProps<StoreFormProps>;
  useFormReturn: UseFormReturn<StoreFormProps, any, undefined>;
}

export default function InputField({
  input,
  useFormReturn: {
    register,
    formState: { errors },
  },
}: Props) {
  return (
    <div className="flexcol gap-2">
      <label className="flex text-label justify-between" htmlFor={input.id}>
        {input.label}
        {errors[input.id] && <span className="text-label text-red-500">{errors[input.id]?.message}</span>}
      </label>
      <input
        className={`auth-input text-input ${errors[input.id] && "border-red-500"}`}
        placeholder={input.placeholder}
        id={input.id}
        type={input.type}
        {...register(input.id)}
      />
    </div>
  );
}
