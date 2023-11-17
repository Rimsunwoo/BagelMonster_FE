import * as yup from "yup";

const emailRegExp = /^[a-zA-Z0-9]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?`~^&])[A-Za-z\d@$!%*#?`~^&]{8,}$/;
const phoneRegExp = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;

const email = yup
  .string()
  .required("이메일을 입력해주세요.")
  .matches(emailRegExp, "이메일 형식이 올바르지 않습니다.")
  .min(6, "이메일을 6자리 이상이어야 합니다.")
  .max(20, "이메일을 20자리 이하이어야 합니다.");

const password = yup
  .string()
  .required("비밀번호를 입력해주세요.")
  .matches(passwordRegExp, "비밀번호는 영문자/숫자/특수문자 포함 8자리 이상이어야 합니다.")
  .min(8, "비밀번호는 8자리 이상이어야 합니다.")
  .max(20, "비밀번호는 20자리 이하이어야 합니다.");

const passwordConfirm = yup
  .string()
  .required("비밀번호를 입력해주세요.")
  .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.");

const name = yup
  .string()
  .required("성함을 입력해주세요.")
  .min(2, "성함은 2자리 이상이어야 합니다.")
  .max(10, "성함은 10자리 이하이어야 합니다.");

const phone = yup
  .string()
  .required("휴대전화를 입력해주세요.")
  .min(9, "휴대전화는 9자리 이상이어야합니다.")
  .max(13, "휴대전화는 13자리 이하이어야합니다.")
  .matches(phoneRegExp, "XXX-XXXX-XXXX 형식으로 입력해주세요.");

const userValidation = { email, password, passwordConfirm, name, phone };

const storeName = yup.string().required("상호명을 입력해주세요.");
const address = yup.string().required("가게 주소를 입력해주세요.");
const storePhone = yup.string().required("가게 전화번호를 입력해주세요.");
const content = yup.string().required("가게 소개글을 입력해주세요.");
const productCreatedTime = yup.string().required("빵 나오는 시간을 입력해주세요.");
const openedTime = yup.string().required("오픈 시간을 입력해주세요.");
const closedTime = yup.string().required("마감 시간을 입력해주세요.");
const closedDays = yup
  .array(yup.string().required("휴무일을 선택해주세요."))
  .required("휴무일을 선택해주세요.")
  .typeError("휴무일을 선택해주세요.");

const storeValidation = {
  storeName,
  address,
  storePhone,
  content,
  productCreatedTime,
  openedTime,
  closedTime,
  closedDays,
};

const productName = yup.string().required("상품명을 입력해주세요.");
const productDescription = yup.string().required("상품 설명을 입력해주세요.");
const productPrice = yup
  .number()
  .required("상품 금액을 입력해주세요.")
  .positive("금액은 음수가 될 수 없습니다.")
  .integer("금액은 정수로 입력해주세요")
  .min(100, "100원 이상 입력해주세요.")
  .max(500000, "50만원 이하로 입력해주세요")
  .default(100);

const productValidation = {
  productName,
  productDescription,
  productPrice,
};

export const signupUserSchema = yup.object().shape(userValidation);
export const signupStoreSchema = yup.object().shape(storeValidation);
export const signinSchema = yup.object().shape({ email, password });
export const addOrModifyProductSchema = yup.object().shape(productValidation);
