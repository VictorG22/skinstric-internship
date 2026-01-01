import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ForwardButton({
  btnTxt,
  nextLink,
  yPosition,
  animation,
}: {
  btnTxt: string;
  nextLink: string;
  yPosition: number;
  animation: string;
}) {
  return (
    <>
      <Link
        href={nextLink}
        className={`absolute group flex gap-4 items-center right-10 z-20 cursor-pointer ${animation}`}
        style={{ bottom: yPosition }}
        aria-label="Go to results"
      >
        <div className="relative">
          <div className="block md:hidden absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-black rotate-45" />
          <p className="text-xs md:text-sm uppercase font-semibold">{btnTxt}</p>
        </div>
        <Image
          width={50}
          height={50}
          alt="proceed button"
          src={"/right-btn.png"}
          className="hidden md:block group-hover:scale-109 transition duration-200 "
        />
      </Link>
    </>
  );
}
