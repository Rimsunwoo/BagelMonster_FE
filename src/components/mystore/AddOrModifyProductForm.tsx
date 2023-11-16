"use client";

import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import { addProduct } from "@/app/api/product";
import { addOrModifyProductSchema } from "@/schema/formSchema";

import { AddOrModifyProductFormInput, type ProductForm } from "./addOrModifyProductInput.category";

import type { AddOrModifyProductApi } from "@/types/product.type";

interface AddOrModifyProductFormProps {}

export default function AddOrModifyProductForm(props: AddOrModifyProductFormProps) {
  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("token");

  const pathName = usePathname().split("/");
  const storeId = pathName[2];

  const [productImg, setProductImg] = useState<File | null>(null);
  const [productStatus, setProductStatus] = useState(true);

  const resolver = yupResolver(addOrModifyProductSchema);
  const { register, handleSubmit, formState } = useForm<ProductForm>({
    resolver,
    defaultValues: {
      productPrice: 100,
    },
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<ProductForm> = async (request) => {
    try {
      const { productName, productDescription, productPrice } = request;

      const formData: AddOrModifyProductApi = {
        requestDto: {
          name: productName,
          description: productDescription,
          price: productPrice,
          status: productStatus,
        },
        picture: productImg,
      };

      await addProduct(formData, storeId, token);
      router.push("/mystore");
    } catch (error) {
      console.error(error);
    }
  };

  const onClickProductStatus = () => {
    setProductStatus((prev) => !prev);
  };

  const onChangeImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductImg(e.target.files![0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexcol gap-4 self-stretch mt-8">
      {AddOrModifyProductFormInput.map((input) => (
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
      <div className="flexcol items-start gap-2">
        <label className="text-label cursor-pointer" htmlFor="productStatus">
          가능 여부
        </label>
        <input
          type="checkbox"
          id="productStatus"
          className="cursor-pointer"
          onClick={onClickProductStatus}
          defaultChecked={productStatus}
        />
      </div>
      <div className="flexcol items-start gap-2">
        <input type="file" onChange={(e) => onChangeImgFile(e)} />
      </div>
      <button className="flex justify-center mt-4 auth-button text-button">상품 추가하기</button>
    </form>
  );
}
