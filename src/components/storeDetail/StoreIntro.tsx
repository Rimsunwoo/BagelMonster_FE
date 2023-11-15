import StatusIcon from "../productDetail/StatusIcon";

interface StoreIntro {
  name: string;
  content: string;
  isOpen: boolean | undefined;
}

export default function StoreIntro({ name, content, isOpen }: StoreIntro) {
  return (
    <section className="mb-10">
      <div className="bg-orange w-full h-[560px] mb-[23px]"></div>
      {isOpen && <span className="text-sm font-semibold text-orange inline-block mb-[14px]">지금 영업중</span>}
      <div className="flex items-center gap-2 mb-[14px]">
        <h2 className="text-xl font-bold">{name}</h2>
        <StatusIcon status="NEW" />
      </div>
      <h2 className="text-gray text-[11px]">{content}</h2>
    </section>
  );
}
