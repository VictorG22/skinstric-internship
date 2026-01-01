"use client";

import Image from "next/image";
import Link from "next/link";

export default function BackButton({
  prevLink,
  yPosition,
  xDirection,
  invert,
  color,
}: {
  prevLink: string;
  yPosition: number | string;
  xDirection: string;
  invert: boolean;
  color: string;
}) {

  return (
    <>
      <Link
        href={prevLink}
        className={`absolute left-${xDirection} ${
          color ? `text-${color}` : ""
        } my-4 group flex gap-4 items-center z-20 cursor-pointer`}
        style={{ bottom: typeof yPosition === "number" ? `${yPosition}px` : yPosition }}
      >
        <Image
          width={50}
          height={50}
          alt="left button"
          src="/left-btn.png"
          className={`max-md:hidden group-hover:scale-109 transition duration-200 ${
            invert ? "invert" : ""
          }`}
        />
        <div className="relative">
          <div className={`block md:hidden absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border  ${invert ? 'border-white' : 'border-black'} rotate-45`} />
          <p className="max-md:text-xs uppercase font-semibold">back</p>
        </div>
      </Link>
    </>
  );
}
