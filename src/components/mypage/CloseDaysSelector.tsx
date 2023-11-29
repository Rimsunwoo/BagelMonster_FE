import type { UseFormReturn } from "react-hook-form";

import { days } from "./input.category";

import type { StoreFormProps } from "@/types/store.type";

interface Props {
  useFormReturn: UseFormReturn<StoreFormProps, any, undefined>;
}

export default function CloseDaysSelector({
  useFormReturn: {
    register,
    formState: { errors },
    setValue,
    watch,
  },
}: Props) {
  const isNoneHoliday = () => {
    const holiday = watch("closedDays");
    return holiday && holiday[0] === "연중무휴";
  };

  const onChangeClosedDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && e.target.id === "none") {
      setValue("closedDays", ["연중무휴"]);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-label">휴무일</p>
        {errors.closedDays && <span className="text-label text-red-500">{errors.closedDays?.message}</span>}
      </div>
      <div className="flex text-[13px] justify-between">
        {days.map((day) => (
          <label key={day.id} htmlFor={day.id} className="flex gap-1">
            <input className="checkbox" type="checkbox" id={day.id} value={day.value} {...register("closedDays")} />
            {day.value}
          </label>
        ))}
        <label htmlFor="none" className="flex gap-1">
          <input
            className="checkbox"
            type="checkbox"
            id="none"
            checked={isNoneHoliday()}
            {...register("closedDays", { onChange: (e) => onChangeClosedDays(e) })}
          />
          연중무휴
        </label>
      </div>
    </>
  );
}
