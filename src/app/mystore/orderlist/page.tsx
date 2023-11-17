import StoreOrderList from "@/components/mypage/StoreOrderList";

export default function page() {
  return (
    <div className="flexcol">
      <div>
        <p>새로운 주문</p>
        <ul>
          <StoreOrderList type={"new"} />
        </ul>
      </div>
      <div>
        <p>진행 중 주문</p>
        <ul>
          <StoreOrderList type={"read"} />
        </ul>
      </div>
    </div>
  );
}
