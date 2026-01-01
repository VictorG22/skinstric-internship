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
        className="hidden lg:flex items-center justify-end w-125 h-125 relative -left-80"
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
      <div className="relative flex flex-col mx-auto  max-sm:w-[60%] max-lg:w-[40%] text-center gap-y-6">
        <div className="lg:hidden absolute rotate-45 w-75 h-75 sm:w-90 sm:h-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4abd8] z-[-1]" />
        <div className="lg:hidden absolute rotate-45 w-90 h-90 sm:w-110 sm:h-110 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4abd8] z-[-1]" />
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <h1
            id="home__title"
            className="text-center tracking-tighter leading-none text-[50px] md:text-[60px] lg:text-[100px]"
          >
            Sophisticated
            <br />
            <span className="inline-block">skincare</span>
          </h1>
        </div>
        <p className="text-sm lg:hidden text-gray-400 text-bold sm:tracking-normal">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
        <Link
          href={"/testing"}
          className="lg:hidden flex items-center mx-auto gap-4 font-bold uppercase text-xs sm:text-sm hover:scale-104 transition duration-200"
        >
          Enter Experience
          <Image
            width={40}
            height={40}
            alt="proceed button"
            src={"/right-btn.png"}
            className=""
          />
        </Link>
      </div>
      <Link
        id="right__container"
        href={"/testing"}
        className="hidden lg:flex items-center justify-start w-125 h-125 relative -right-80"
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
            alt="right button"
            className="transition duration-300 group-hover:scale-109"
          />
        </div>
      </Link>
      <div className="hidden lg:block absolute bottom-10 left-10 max-w-75">
        <p className="uppercase">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </div>
  );
}
