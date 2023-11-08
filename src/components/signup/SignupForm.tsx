"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { signup } from "@/app/api/auth";
import { signupSchema } from "@/schema/formSchema";

import type { InputProps, SignupFormProps } from "@/types/auth.type";

type FormProps = Omit<SignupFormProps, "isStore">;

const inputProps: InputProps<FormProps>[] = [
  { id: "email", label: "아이디", placeholder: "아이디를 입력해주세요", type: "email" },
  { id: "password", label: "비밀번호", placeholder: "비밀번호를 입력해주세요", type: "password" },
  { id: "passwordConfirm", label: "비밀번호 확인", placeholder: "비밀번호를 한번 더 입력해주세요", type: "password" },
  { id: "name", label: "성함", placeholder: "성함을 입력해주세요", type: "text" },
  { id: "phone", label: "휴대전화", placeholder: "휴대전화를 입력해주세요", type: "tel" },
];

export default function SignupForm() {
  const router = useRouter();
  const [isStore, setIsStore] = useState(false);
  const resolver = yupResolver(signupSchema);
  const { register, handleSubmit, formState, reset } = useForm<FormProps>({ resolver });
  const { errors } = formState;

  const onChangeIsStoreHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsStore(e.target.checked);
  };

  const onSubmit: SubmitHandler<FormProps> = async (request) => {
    const { email, password } = request;

    try {
      await signup({ ...request, isStore });
      reset();
      // await signin({ email, password });
      router.push("/");
    } catch (error) {
      // #TODO alert 대신 toast로 변경
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 self-stretch my-9">
      <div className="flex gap-6">
        <div className="flex flex-1 items-center justify-center h-10 bg-slate-100 border-b-2 border-black px-4 cursor-pointer">
          소비자
        </div>
        <div className="flex flex-1 items-center justify-center h-10 bg-slate-100 border-b-2 border-black px-4 cursor-pointer">
          사업자
        </div>
      </div>
      {inputProps.map((input) => (
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

      {/* ref.1 */}
      <div className="flex flex-col text-label gap-2">
        <span>가입형태를 골라주세요.</span>
        <div className="flex justify-around">
          <label className="flex gap-2" htmlFor="user">
            <input type="radio" id="user" name={"isStore"} value="user" />
            소비자
          </label>
          <label className="flex gap-2" htmlFor="store">
            <input type="radio" id="store" name={"isStore"} value="store" onChange={(e) => onChangeIsStoreHandler(e)} />
            사업자
          </label>
        </div>
      </div>

      {/* ref.2 */}
      <label className="flex text-label gap-2" htmlFor="isStore">
        <input type="checkbox" id="isStore" onChange={(e) => onChangeIsStoreHandler(e)} />
        사업자이신경우 체크해주세요
      </label>

      <input className="flex justify-center auth-button text-button" type="submit" value="회원가입" />
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
}
