import Link from "next/link";

export default function ReceiptButtons() {
  return (
    <div className="flex justify-end gap-2">
      <Link href="/mypage" className="normal-button bg-[#DDDDDD] text-[#666666]">
        주문내역 보기
      </Link>
      <Link href="/stores" className="normal-button bg-orange text-white">
        목록보기
      </Link>
    </div>
  );
}
