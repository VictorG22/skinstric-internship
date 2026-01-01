"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/UI/BackButton";
import ForwardButton from "@/components/UI/ForwardButton";

export default function SelectPage() {
  const [active, setActive] = useState<
    null | "top" | "left" | "right" | "bottom"
  >(null);

  const [gridSize, setGridSize] = useState({ columns: 120, rows: 120 });

  useEffect(() => {
    const updateGrid = () => {
      if (window.innerWidth >= 768) {
        setGridSize({ columns: 120, rows: 120 });
      } else {
        setGridSize({ columns: 90, rows: 90 });
      }
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-75px)] justify-center items-start w-full">
      <div className="absolute top-0 left-10 uppercase text-sm">
        <p className="text-sm md:text-base font-bold mb-1">a.i. analysis</p>
        <p className="text-sm md:text-base">
          a.i. has estimated the following.
          <br />
          fix estimated information if needed.
        </p>
      </div>

      <div className="flex flex-col h-[80vh] w-full items-center justify-center bg-white">
        <div className="relative">
          {/* Centered animation container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            {/* TOP */}
            <div
              className={`
      absolute w-40 h-40 rotate-45
      border border-dotted border-[#A0A4AB]
      transition-transform duration-400 ease-out
      ${active === "top" ? "scale-[2.5]" : "scale-0"}
    `}
            />

            {/* LEFT */}
            <div
              className={`
      absolute w-40 h-40 rotate-45
      border border-dotted border-[#A0A4AB]
      transition-transform duration-400 ease-out
      ${active === "left" ? "scale-[2.7]" : "scale-0"}
    `}
            />

            {/* RIGHT */}
            <div
              className={`
      absolute w-40 h-40 rotate-45
      border border-dotted border-[#A0A4AB]
      transition-transform duration-400 ease-out
      ${active === "right" ? "scale-[2.9]" : "scale-0"}
    `}
            />

            {/* BOTTOM */}
            <div
              className={`
      absolute w-40 h-40 rotate-45
      border border-dotted border-[#A0A4AB]
      transition-transform duration-400 ease-out
      ${active === "bottom" ? "scale-[3.1]" : "scale-0"}
    `}
            />
          </div>

          <div
            className="relative z-10 grid place-items-center overflow-visible"
            style={{
              gridTemplateColumns: `repeat(3, ${gridSize.columns}px)`,
              gridTemplateRows: `repeat(3, ${gridSize.rows}px)`,
            }}
          >
            {/* Buttons */}
            <Link href={"/summary"} className=" col-start-2 row-start-1">
              <button
                onMouseEnter={() => setActive("top")}
                onMouseLeave={() => setActive(null)}
                className="w-30 h-30 md:w-40 md:h-40 bg-gray-200 rotate-45 flex items-center justify-center cursor-pointer transition duration-400 hover:scale-109 hover:bg-gray-300"
              >
                <span className="-rotate-45 uppercase font-semibold text-[18px]">
                  demographics
                </span>
              </button>
            </Link>
            <div className=" col-start-1 row-start-2">
              <button
                onMouseEnter={() => setActive("left")}
                onMouseLeave={() => setActive(null)}
                className="w-30 h-30 md:w-40 md:h-40 bg-gray-100 rotate-45 flex items-center justify-center cursor-not-allowed transition duration-400 hover:bg-gray-300"
              >
                <span className="-rotate-45 uppercase font-semibold text-[18px]">
                  cosmetic concerns
                </span>
              </button>
            </div>
            <div className=" col-start-3 row-start-2">
              <button
                onMouseEnter={() => setActive("right")}
                onMouseLeave={() => setActive(null)}
                className="w-30 h-30 md:w-40 md:h-40 bg-gray-100 rotate-45 flex items-center justify-center cursor-not-allowed transition duration-400 hover:bg-gray-300"
              >
                <span className="-rotate-45 uppercase font-semibold text-[18px]">
                  skin type details
                </span>
              </button>
            </div>
            <div className=" col-start-2 row-start-3">
              <button
                onMouseEnter={() => setActive("bottom")}
                onMouseLeave={() => setActive(null)}
                className="w-30 h-30 md:w-40 md:h-40 bg-gray-100 rotate-45 flex items-center justify-center cursor-not-allowed transition duration-400 hover:bg-gray-300"
              >
                <span className="-rotate-45 uppercase font-semibold text-[18px]">
                  weather
                </span>
              </button>
            </div>
          </div>
        </div>
        <BackButton
          prevLink="/"
          yPosition={40}
          xDirection="10"
          invert={false}
          color=""
        />
        <ForwardButton
          btnTxt="Sum"
          nextLink="/summary"
          yPosition={60}
          animation=""
        />
      </div>
    </div>
  );
}
