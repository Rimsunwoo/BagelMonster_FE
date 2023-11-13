"use client";

import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

// import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

// import { signupStoreSchema } from "@/schema/formSchema";

import { createStore } from "@/app/api/store";

import { storeInputProps } from "./input.category";

import type { SignupStoreProps } from "@/types/auth.type";

export default function StoreForm() {
  const router = useRouter();
  // const resolver = yupResolver(signupStoreSchema);
  const { register, handleSubmit, formState, reset } = useForm<SignupStoreProps>();
  const { errors } = formState;
  const [imgFile, setImgFile] = React.useState<File | null>(null);
  console.log("imgFile :", imgFile);

  const onChangeImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgFile(e.target.files![0]);
  };

  const onSubmit: SubmitHandler<SignupStoreProps> = async (request) => {
    // const createStoreRequest = {
    //   name: request.storeName,
    //   address: request.address,
    //   storePictureUrl: request.storePictureUrl,
    //   phone: request.storePhone,
    //   content: request.content,
    //   productCreatedTime: request.productCreatedTime,
    //   openedTime: request.openedTime,
    //   closedTime: request.closedTime,
    //   closedDays: request.closedDays,
    // };
    if (imgFile === null) return;

    const createStoreRequest = {
      name: "테스트 2번 가게",
      address: "서울시 강남구 테헤란로 427",
      phone: "010-1234-5678",
      content: "테스트 2번 가게입니다.",
      productCreatedTime: "11:00",
      openedTime: "10:00",
      closedTime: "19:00",
      closedDays: "토, 일",
    };

    try {
      // 가게 등록
      await createStore(createStoreRequest, imgFile);
      reset();
      router.push("/");
    } catch (error) {
      // #TODO alert 대신 toast로 변경
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexcol gap-4 self-stretch mt-8">
      <input type="file" onChange={(e) => onChangeImgFile(e)} />
      {storeInputProps.map((input) => (
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
      <input className="flex justify-center mt-4 auth-button text-button" type="submit" value="가게 등록" />
    </form>
  );
}
