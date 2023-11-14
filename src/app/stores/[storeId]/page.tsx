import StoreCaution from "@/components/storeDetail/StoreCaution";
import StoreInfo from "@/components/storeDetail/StoreInfo";
import StoreIntro from "@/components/storeDetail/StoreIntro";
import StoreMenu from "@/components/storeDetail/StoreMenu";

interface StoreDetailProps {
  params: {
    storeId: string;
  };
}
//#TODO 오픈시간 계산 함수, NEW 아이콘 범위지정 후 함수 생성
export default function StoreDetail({ params: { storeId } }: StoreDetailProps) {
  const {
    name,
    address,
    phone,
    content,
    productCreatedTime,
    openedTime,
    closedTime,
    closedDays,
    createdDate,
    modifiedDate,
    products,
  } = mockStoreData;
  const infoData = { name, address, phone, openedTime, closedTime, closedDays };

  return (
    <>
      <StoreIntro name={name} content={content} />
      <StoreInfo infoData={infoData} />
      <StoreMenu products={products} />
      <StoreCaution />
    </>
  );
}

const mockStoreData = {
  storeId: 1,
  name: "베이비베이글",
  address: "서울 용산구 서빙고로91길 10",
  storePictureUrl: "s3 이미지 링크",
  phone: "010-xxxx-xxxx",
  content:
    "코끼리베이글’은 참나무 장작 화덕에서 몬트리올 스타일로 베이글을 구어 냅니다. 대표 메뉴는 노릇하게 구운 플레인 베이글 사이에 프랑스산 고메 버터와 펄솔트를 채워 넣은 ‘버터 솔트",
  productCreatedTime: "T11:00",
  openedTime: "T09:00",
  closedTime: "T21:00",
  closedDays: "토,일",
  createdDate: "2023-11-06T15:00",
  modifiedDate: "2023-11-06T15:00",
  products: [
    {
      storeName: "베이비베이글",
      productId: 1,
      name: "플레인베이글",
      description: "기본입니다.",
      price: 4000,
      productPictureUrl: "s3 이미지 링크",
      popularity: "4.0",
      status: true,
      createdDate: "2023-11-06T15:00",
      modifiedDate: "2023-11-06T15:00",
    },
    {
      storeName: "베이비베이글",
      productId: 2,
      name: "플레인베이글",
      description: "기본입니다.",
      price: 4000,
      productPictureUrl: "s3 이미지 링크",
      popularity: "4.0",
      status: true,
      createdDate: "2023-11-06T15:00",
      modifiedDate: "2023-11-06T15:00",
    },
    {
      storeName: "베이비베이글",
      productId: 3,
      name: "플레인베이글",
      description: "기본입니다.",
      price: 4000,
      productPictureUrl: "s3 이미지 링크",
      popularity: "4.0",
      status: true,
      createdDate: "2023-11-06T15:00",
      modifiedDate: "2023-11-06T15:00",
    },
  ],
};
