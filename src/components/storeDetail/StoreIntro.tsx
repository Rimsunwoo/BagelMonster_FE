import StatusIcon from "../productDetail/StatusIcon";
import Image from "next/image";
interface StoreIntro {
  name: string;
  content: string;
  isOpen: boolean | undefined;
  storePictureUrl: string;
}

export default function StoreIntro({ name, content, isOpen, storePictureUrl }: StoreIntro) {
  return (
    <section className="mb-10">
      <div className="w-full h-[560px] overflow-hidden relative">
        <Image src={storePictureUrl} alt="storeImage" fill />
      </div>
      {isOpen && <span className="text-sm font-semibold text-orange inline-block mb-[14px]">지금 영업중</span>}
      <div className="flex items-center gap-2 mb-[14px]">
        <h2 className="text-xl font-bold">{name}</h2>
        <StatusIcon status="NEW" />
      </div>
      <h2 className="text-gray text-[11px]">{content}</h2>
    </section>
  );
}
