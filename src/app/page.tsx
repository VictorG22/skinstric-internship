"use client";
import { useEffect } from "react";
import { initHomeHoverAnimations } from "./page.gsap";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const cleanup = initHomeHoverAnimations();
    return cleanup;
  }, []);
  return (
    <div className="flex relative justify-between items-center w-screen h-screen">
      <div
        id="left__container"
        className="flex items-center justify-end w-125 h-125 relative -left-80"
      >
        <div className="absolute w-full h-full inset-0 border-2 border-[#A0A4AB] border-dotted rotate-45 bg-transparent" />
        <div
          id="home__left--btn"
          className="z-9 group cursor-pointer flex items-center gap-6 p-2" // p-2 ensures hover includes text
        >
          <Image
            width={40}
            height={40}
            src={"/left-btn.png"}
            alt="left button"
            className="transition duration-300 group-hover:scale-109"
          />
          <div className="text-[14px] leading-4 select-none">DISCOVER A.I.</div>
        </div>
      </div>
      <h1
        id="home__title"
        className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-center tracking-tighter leading-none text-[60px] lg:text-[100px] "
      >
        Sophisticated
        <br />
        <span className="inline-block">skincare</span>
      </h1>
      <Link
        id="right__container"
        href={'/testing'}
        className="flex items-center justify-start w-125 h-125 relative -right-80"
      >
        <div className="absolute w-full h-full inset-0 border-2 border-[#A0A4AB] border-dotted rotate-45 bg-transparent" />
        <div
          id="home__right--btn"
          className="z-9 group flex items-center gap-6 cursor-pointer"
        >
          <div className="text-[14px] leading-4">TAKE TEST</div>
          <Image
            width={40}
            height={40}
            src={"/right-btn.png"}
            alt="left button"
            className="transition duration-300 group-hover:scale-109"
          />
        </div>
      </Link>
      <div className="fixed bottom-10 left-30 max-w-75">
        <p className="uppercase">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </div>
  );
}
