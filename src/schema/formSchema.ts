import * as yup from "yup";

const id = yup
  .string()
  .required("아이디를 입력해주세요.")
  .min(6, "아이디는 6자리 이상이어야 합니다.")
  .max(20, "아이디는 20자리 이하이어야 합니다.");
const password = yup
  .string()
  .required("비밀번호를 입력해주세요.")
  .min(6, "비밀번호는 6자리 이상이어야 합니다.")
  .max(20, "비밀번호는 20자리 이하이어야 합니다.")
  .oneOf([yup.ref("passwordConfirm")], "비밀번호가 일치하지 않습니다.");
const passwordConfirm = yup.string().required("비밀번호를 입력해주세요.");

export const signupSchema = yup.object().shape({ id, password, passwordConfirm });
export const loginSchema = yup.object().shape({ id, password });
