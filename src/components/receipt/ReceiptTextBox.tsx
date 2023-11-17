import React from "react";

interface ReceipTextBoxProps {
  title: string;
  content: string | number;
}

export default function ReceiptTextBox(props: ReceipTextBoxProps) {
  const { title, content } = props;
  return (
    <div className="w-full flex justify-between font-normal text-[14px]">
      <p className="text-gray">{title}</p>
      <span className="text-black">{content}</span>
    </div>
  );
}
