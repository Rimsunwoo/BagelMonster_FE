import type { HTMLInputTypeAttribute } from "react";

export interface SigninFormProps {
  email: string;
  password: string;
}

export interface SignupUserProps extends SigninFormProps {
  passwordConfirm: string;
  name: string;
  phone: string;
}

export interface SignupStoreProps extends SignupUserProps {
  storeName: string;
  address: string;
  storePictureUrl: string;
  storePhone: string;
  content: string;
  productCreatedTime: string;
  openedTime: string;
  closedTime: string;
  closedDays: string;
}

export interface InputProps<FormType> {
  id: keyof FormType;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}
export type SignupAPI = Omit<SignupUserProps, "passwordConfirm"> & { isStore: boolean };
