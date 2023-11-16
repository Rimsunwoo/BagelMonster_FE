export default function isStoreOpen(openedTime: string, closedTime: string, closedDays: string) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  //[월,화]로 전달되는 db데이터에서 요일 index로 분리
  const holidayArr = closedDays
    .trim()
    .split(",")
    .map((day) => days.indexOf(day));
  const date = new Date();
  const currentDay = date.getDay();
  const currentTime = `${date.getHours()}${date.getMinutes()}`;
  const openTime = openedTime.replace(":", "").substring(0, 5);
  const closeTime = closedTime.replace(":", "").substring(0, 5);
  const isOpen = !holidayArr.includes(currentDay) && openTime <= currentTime && currentTime < closeTime;
  return isOpen;
}
