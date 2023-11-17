"use client";

import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { createStore } from "@/app/api/store";
import useAuth from "@/hooks/useAuth";
import { signupStoreSchema } from "@/schema/formSchema";

import { days, storeInputProps } from "./input.category";

import type { StoreFormProps } from "@/types/store.type";

export default function StoreForm() {
  const resolver = yupResolver(signupStoreSchema);
  const { register, handleSubmit, formState, reset, setValue, watch } = useForm<StoreFormProps>({ resolver });
  const { getCookie } = useAuth();
  const { errors } = formState;

  const [imgFile, setImgFile] = React.useState<File | null>(null);

  const isNoneHoliday = () => {
    const holiday = watch("closedDays");
    if (holiday === undefined) return false;
    return holiday[0] === "연중무휴";
  };

  const onChangeImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgFile(e.target.files![0]);
  };

  const onChangeClosedDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && e.target.id === "none") {
      setValue("closedDays", ["연중무휴"]);
    }
  };

  const onSubmit: SubmitHandler<StoreFormProps> = async (request) => {
    const closedDays = request.closedDays?.join(",");

    const createStoreRequest = {
      name: request.name,
      address: request.address,
      phone: request.phone,
      content: request.content,
      productCreatedTime: request.productCreatedTime,
      openedTime: request.openedTime,
      closedTime: request.closedTime,
      closedDays,
    };

    if (imgFile === null) return;

    try {
      await createStore(createStoreRequest, imgFile, getCookie());
      reset();
    } catch (error) {
      console.error(error);
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
            id={input.id}
            type={input.type}
            {...register(input.id)}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <p className="text-label">휴무일</p>
        {errors.closedDays && <span className="text-label text-red-500">{errors.closedDays?.message}</span>}
      </div>
      <div className="flex text-[13px] justify-between">
        {days.map((day) => (
          <label key={day.id} htmlFor={day.id} className="flex gap-1">
            <input className="checkbox" type="checkbox" id={day.id} value={day.value} {...register("closedDays")} />
            {day.value}
          </label>
        ))}
        <label htmlFor="none" className="flex gap-1">
          <input
            className="checkbox"
            type="checkbox"
            id="none"
            checked={isNoneHoliday()}
            {...register("closedDays", { onChange: (e) => onChangeClosedDays(e) })}
          />
          연중무휴
        </label>
      </div>

      <input className="flex justify-center mt-4 auth-button text-button" type="submit" value="가게 등록" />
    </form>
  );
}
