"use client";

import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { signin, signup } from "@/app/api/auth";
import { signupStoreSchema } from "@/schema/formSchema";

import { storeInputProps } from "./input.category";

import type { SignupStoreProps } from "@/types/auth.type";

export default function StoreForm() {
  const router = useRouter();
  const resolver = yupResolver(signupStoreSchema);
  const { register, handleSubmit, formState, reset } = useForm<SignupStoreProps>({ resolver });
  const { errors } = formState;

  const onSubmit: SubmitHandler<SignupStoreProps> = async (request) => {
    const signinRequest = { email: request.email, password: request.password };

    const signupRequest = {
      email: request.email,
      password: request.password,
      name: request.name,
      phone: request.phone,
      isStore: true,
    };

    // const createStoreRequest = {
    //   name: request.storeName,
    //   address: request.address,
    //   phone: request.storePhone,
    //   content: request.content,
    // };

    try {
      await signup(signupRequest);
      // 가게 등록
      // await createStore(createStoreRequest)
      reset();
      await signin(signinRequest);
      router.push("/");
    } catch (error) {
      // #TODO alert 대신 toast로 변경
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 self-stretch mt-8">
      {storeInputProps.map((input) => (
        <div className="flex flex-col gap-2" key={input.id}>
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
