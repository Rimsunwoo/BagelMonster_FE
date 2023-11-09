import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      type="button"
      className="h-full text-5xl scale-x-50 flex items-center -translate-y-[10%]"
    >{`<`}</button>
  );
}
