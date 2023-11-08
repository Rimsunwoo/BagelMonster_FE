import type { HTMLInputTypeAttribute } from "react";

export interface SigninFormProps {
  email: string;
  password: string;
}

export interface SignupFormProps extends SigninFormProps {
  passwordConfirm: string;
  name: string;
  phone: string;
  isStore: boolean;
}

export interface InputProps<FormType> {
  id: keyof FormType;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}
