import Link from "next/link";

export default function Stores() {
  return (
    <div>
      <p>리스트</p>
      <ul>
        <li>
          <Link href="/stores/1">1번가게</Link>
        </li>
        <li>
          <Link href="/stores/2">2번가게</Link>
        </li>
      </ul>
    </div>
  );
}
