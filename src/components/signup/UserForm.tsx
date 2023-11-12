"use client";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { signin, signup } from "@/app/api/auth";
import { signupUserSchema } from "@/schema/formSchema";

import { userInputProps } from "./input.category";

import type { SignupUserProps } from "@/types/auth.type";

export default function UserForm() {
  const router = useRouter();
  const resolver = yupResolver(signupUserSchema);
  const { register, handleSubmit, formState, reset } = useForm<SignupUserProps>({ resolver });
  const { errors } = formState;

  const onSubmit: SubmitHandler<SignupUserProps> = async (request) => {
    const { email, password } = request;

    try {
      await signup({ ...request, isStore: true });
      reset();
      await signin({ email, password });
      router.push("/");
    } catch (error) {
      // #TODO alert 대신 toast로 변경
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexcol gap-4 self-stretch mt-8">
      {userInputProps.map((input) => (
        <div className="flexcol gap-2" key={input.id}>
          <label className="flex text-label justify-between" htmlFor={input.id}>
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
        </div>
      ))}
      <input className="flex justify-center mt-4 auth-button text-button" type="submit" value="회원가입" />
    </form>
  );
}
