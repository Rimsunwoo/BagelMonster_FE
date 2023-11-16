import type { InputProps } from "@/types/auth.type";

export interface ProductForm {
  productName: string;
  productDescription: string;
  productPrice: number;
}

interface AddOrModifyProductFormInputProps extends InputProps<ProductForm> {
  accept?: string;
}

export const AddOrModifyProductFormInput: AddOrModifyProductFormInputProps[] = [
  {
    id: "productName",
    label: "상품명",
    placeholder: "상품명을 입력해주세요",
    type: "text",
  },
  {
    id: "productDescription",
    label: "상품설명",
    placeholder: "상품 설명을 입력해주세요",
    type: "text",
  },
  {
    id: "productPrice",
    label: "가격",
    placeholder: "상품 가격을 입력해주세요",
    type: "number",
  },
];
