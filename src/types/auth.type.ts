export interface LoginFormProps {
  id: string;
  password: string;
}

export interface SignupFormProps extends LoginFormProps {
  passwordConfirm: string;
}

export interface InputProps {
  id: keyof LoginFormProps | keyof SignupFormProps;
  label: string;
  placeholder: string;
}
