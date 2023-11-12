"use client";

import { Fragment } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { signin } from "@/app/api/auth";
import { signinSchema } from "@/schema/formSchema";

import type { InputProps, SigninFormProps } from "@/types/auth.type";

export default function SigninForm() {
  const inputProps: InputProps<SigninFormProps>[] = [
    { id: "email", label: "아이디", placeholder: "아이디를 입력해주세요", type: "email" },
    { id: "password", label: "비밀번호", placeholder: "비밀번호를 입력해주세요", type: "password" },
  ];

  const resolver = yupResolver(signinSchema);
  const { register, handleSubmit, formState, reset } = useForm<SigninFormProps>({ resolver });
  const { errors } = formState;

  const onSubmit: SubmitHandler<SigninFormProps> = async ({ email, password }) => {
    const request = { email, password };
    try {
      signin(request);
      reset();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexcol gap-4 self-stretch my-9">
      {inputProps.map((input) => (
        <Fragment key={input.id}>
          <label className="flex justify-between text-label" htmlFor={input.id}>
            {input.label}
            {errors[input.id] && <span className="text-label text-red-500">{errors[input.id]?.message}</span>}
          </label>
          <input
            className={`auth-input text-input ${errors[input.id] && "border-red-500"}`}
            placeholder={input.placeholder}
            type={input.type}
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
