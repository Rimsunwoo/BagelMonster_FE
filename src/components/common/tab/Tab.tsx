interface TabProps {
  label: string;
  currentTab: string;
  onChangeTabHandler: (tab: string) => void;
}

/**
 *
 * @param label string
 * @param currentTab state
 * @param onChangeTabHandler (``label`` : string) => void; setState가 필요한 함수
 * @returns Tab component
 */
export default function Tab({ label, currentTab, onChangeTabHandler }: TabProps) {
  return (
    <button
      type="button"
      onClick={() => onChangeTabHandler(label)}
      className={`
          flex items-center justify-center cursor-pointer text-sm leading-[22px] pb-1 font-bold
          ${currentTab === label ? "border-b-2 border-orange text-orange" : "border-none"}
          `}
    >
      {label}
    </button>
  );
}
