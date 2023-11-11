import Link from "next/link";

interface StoreDetailProps {
  params: {
    storeId: string;
  };
}

export default function StoreDetail({ params: { storeId } }: StoreDetailProps) {
  return (
    <>
      <h1>가게 {storeId}</h1>
      <ul>
        <li>
          <Link href={`/stores/${storeId}/1`}>메뉴1</Link>
        </li>
        <li>
          <Link href={`/stores/${storeId}/2`}>메뉴2</Link>
        </li>
      </ul>
    </>
  );
}
