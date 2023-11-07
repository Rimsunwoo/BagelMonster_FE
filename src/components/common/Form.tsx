"use client";

import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "@/schema/formSchema";

import type { InputProps, SignupFormProps } from "@/types/auth.type";

interface Props {
  inputProps: InputProps[];
}

export default function Form({ inputProps }: Props) {
  const resolver = yupResolver(signupSchema);
  const { register, handleSubmit, formState } = useForm<SignupFormProps>({ resolver });
  const { errors } = formState;

  const onSubmit = async (data: SignupFormProps) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 self-stretch my-9">
      {inputProps.map((input) => (
        <Fragment key={input.id}>
          <label className="flex justify-between text-label" htmlFor={input.id}>
            {input.label}
            {errors[input.id] && <span className="text-label text-red-500">{errors[input.id]?.message}</span>}
          </label>
          <input
            className={`auth-input text-input ${errors[input.id] && "border-red-500"}`}
            placeholder={input.placeholder}
            type="text"
            id={input.id}
            {...register(input.id)}
          />
        </Fragment>
      ))}
      <input className="flex justify-center auth-button text-button" type="submit" value="회원가입" />
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
}
