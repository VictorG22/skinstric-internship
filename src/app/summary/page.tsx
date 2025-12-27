import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CircleProgressProps {
  percentage: number; // 0-100
  size?: number;      // diameter in px
  strokeWidth?: number;
}

export function CircleProgress({
  percentage,
  size = 120,
  strokeWidth = 12,
}: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2; // radius minus stroke
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#9CA3AF"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#000000"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {/* Percentage text */}
      <span
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold"
        style={{ fontSize: size * 0.1 }} // scales text with circle
      >
        {percentage}%
      </span>
    </div>
  );
}


export default function SummaryPage() {
  return (
    <div className="relative w-full h-[calc(100vh-75px)] mt-18.75">
      <div className=" pl-10 relative w-full max-h-full overflow-y-auto">
        <div className="mt-2 mb-15 flex flex-col justify-center gap-y-1 uppercase">
        <p  className="font-bold">a.i. analysis</p>
        <h1 className="font-semibold text-7xl">demographics</h1>
        <p className="mt-1">predicted race & age</p>
        </div>
        <div className="flex w-full gap-x-2">
        <div className="flex flex-col w-30 gap-y-2">
            <div className="bg-gray-200 border-t border-black font-bold text-black px-2 py-3">
                <p>Black</p>
                <p className="font-bold text-lg uppercase">race</p>
            </div>
            <div className="bg-gray-200 border-t border-black font-bold text-black px-2 py-3">
                <p>Black</p>
                <p className="font-bold text-lg uppercase">race</p>
            </div>
            <div className="bg-gray-200 border-t border-black font-bold text-black px-2 py-3">
                <p>Black</p>
                <p className="font-bold text-lg uppercase">race</p>
            </div>

        </div>
        <div className="flex gap-4 max-lg:flex-col bg-gray-200 border-t border-black p-4">
            <h2 className="text-4xl">Middle Eastern</h2>
        <CircleProgress percentage={99} size={400} strokeWidth={4} />
        </div>
        </div>
      <Link
        href={"/"}
        className="my-4 group flex gap-4 items-center z-20 cursor-pointer"
      >
        <Image
          width={50}
          height={50}
          alt="left button"
          src={"/left-btn.png"}
          className="group-hover:scale-109 transition duration-200 "
        />
        <p className="uppercase font-semibold">back</p>
      </Link>
      </div>
    </div>
  );
}
