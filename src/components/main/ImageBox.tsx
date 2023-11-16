"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

function ImageBox() {
  const [renderImage, setRenderImage] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setRenderImage(!renderImage);
    }, 3000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [renderImage]);

  return (
    <>
      <Image
        src="/main01.jpg"
        fill
        sizes="100% 520px"
        alt="Bagel Monster"
        className={`-z-10 transition-all ease-out duration-700 ${renderImage ? "opacity-0" : "opacity-100"}`}
        priority={false}
      />
      <Image
        src="/main02.jpg"
        fill
        sizes="100% 520px"
        alt="Bagel Monster"
        className={`-z-10 transition-all ease-out duration-700 ${renderImage ? "opacity-100" : "opacity-0"}`}
        priority={false}
      />
    </>
  );
}

export default ImageBox;
