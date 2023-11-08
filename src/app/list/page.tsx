import Link from "next/link";

export default function List() {
  return (
    <div>
      <p>리스트</p>
      <ul>
        <li>
          <Link href="/detail/1">1번가게</Link>
        </li>
        <li>
          <Link href="/detail/2">2번가게</Link>
        </li>
      </ul>
    </div>
  );
}
