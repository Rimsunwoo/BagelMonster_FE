"use client";

import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { createStore } from "@/app/api/store";
import useAuth from "@/hooks/useAuth";
import { signupStoreSchema } from "@/schema/formSchema";

import CloseDaysSelector from "./CloseDaysSelector";
import { storeInputProps } from "./input.category";
import InputField from "./InputField";

import type { StoreFormProps } from "@/types/store.type";

const resolver = yupResolver(signupStoreSchema);

export default function StoreForm() {
  const router = useRouter();
  const { getCookie } = useAuth();
  const useFormReturn = useForm<StoreFormProps>({ resolver });

  const { handleSubmit, reset } = useFormReturn;

  const [imgFile, setImgFile] = React.useState<File | null>(null);

  const onChangeImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgFile(e.target.files![0]);
  };

  const onSubmit: SubmitHandler<StoreFormProps> = async (request) => {
    const closedDays = request.closedDays?.join(",");

    const createStoreRequest = { ...request, closedDays };

    if (imgFile === null) return;

    try {
      await createStore({ createStoreRequest, imgFile, token: getCookie() });
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexcol gap-4 self-stretch mt-8">
      <input type="file" onChange={(e) => onChangeImgFile(e)} />
      {storeInputProps.map((input) => (
        <InputField key={input.id} input={input} useFormReturn={useFormReturn} />
      ))}
      <CloseDaysSelector useFormReturn={useFormReturn} />
      <input className="flex justify-center mt-4 auth-button text-button" type="submit" value="가게 등록" />
    </form>
  );
}
