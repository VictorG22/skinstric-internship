"use client";
// import ConfidenceOption from "@/components/ConfidenceOption";

import { useState, useEffect } from "react";
import { useAnalysis } from "@/context/AnalysisContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CircleProgressProps {
  percentage: number; // 0-100
  size?: number; // diameter in px
  strokeWidth?: number;
}

export function CircleProgress({
  percentage,
  size = 120,
  strokeWidth = 12,
}: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animate the percentage change
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    // Smoothly animate from previous percentage to new one
    const animation = setTimeout(() => setAnimatedPercentage(percentage), 50);
    return () => clearTimeout(animation);
  }, [percentage]);

  const offset = circumference - (animatedPercentage / 100) * circumference;

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
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }} // animation
        />
      </svg>
      {/* Percentage text */}
      <span
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold"
        style={{ fontSize: size * 0.1 }}
      >
        {animatedPercentage}%
      </span>
    </div>
  );
}

export function ConfidenceOption({
  label,
  percentage,
  onClick,
}: {
  label: string;
  percentage: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between h-12 hover:bg-[#e1e1e2] px-4 cursor-pointer"
    >
      <div className="relative flex items-center gap-2">
        <div className="relative w-3 h-3">
          <div className="absolute inset-px rotate-45 border border-black" />
        </div>
        <p className="mr-2 capitalize">{label}</p>
      </div>
      <p>{Math.floor(percentage * 100)}%</p>
    </div>
  );
}

export function SelectedConfidenceOption({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) {
  return (
    <div className="flex items-center justify-between h-12 bg-black px-4 cursor-pointer">
      <div className="relative flex items-center gap-2">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-white rotate-45 border border-black" />
          <div className="absolute inset-0.75 bg-white rotate-45 border border-black" />
        </div>
        <p className="mr-2 text-white font-semibold capitalize">{label}</p>
      </div>
      <p className="text-white font-semibold">{percentage}%</p>
    </div>
  );
}

const getDefaultSelection = (data: Record<string, number>) => {
  const entries = Object.entries(data);
  if (entries.length === 0) return null;

  const [label, percentage] = entries.reduce((prev, curr) =>
    curr[1] > prev[1] ? curr : prev
  );

  return { label, percentage: Math.floor(percentage * 100) };
};

type AnalysisCategory = "race" | "age" | "gender";

export default function SummaryPage() {
  const { analysis } = useAnalysis();

  if (!analysis) return <p>Loading...</p>;

  const categories = Object.keys(analysis) as AnalysisCategory[];

  // Initialize selected options per category to the highest-value option
  const initialSelectedOptions: {
    [category: string]: { label: string; percentage: number };
  } = {};
  for (const category of categories) {
    const highest = getDefaultSelection(analysis[category]);
    if (highest) initialSelectedOptions[category] = highest;
  }

  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [activeCategory, setActiveCategory] = useState<AnalysisCategory>(
    categories[0]
  );

  const currentSelection = selectedOptions[activeCategory];
  const categoryData = analysis[activeCategory];

  return (
    <div className="relative w-full h-[calc(100vh-75px)] mt-18.75">
      <div className="flex-1 mx-5 px-4 relative w-full max-h-full overflow-y-auto">
        <div className="mt-2 mb-15 flex flex-col justify-center gap-y-1 uppercase">
          <p className="font-bold">a.i. analysis</p>
          <h1 className="font-semibold text-7xl">demographics</h1>
          <p className="mt-1">predicted categories</p>
        </div>

        <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4">
          {/* Left category selectors */}
          <div className="flex flex-col gap-y-2">
            {categories.map((category) => {
              const selection = selectedOptions[category]; // get selection for this category
              return (
                <div
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`border-t border-black px-2 py-3 cursor-pointer ${
                    activeCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {selection ? (
                    <>
                      <p className="capitalize font-bold">{selection.label}</p>
                      <p className="font-bold text-lg uppercase">{category}</p>
                    </>
                  ) : (
                    <>
                      <p className="capitalize text-lg font-bold">{category}</p>
                      <p className="font-bold text-xl uppercase">{category}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Middle panel */}
          <div className="flex gap-4 max-lg:flex-col bg-gray-100 border-t border-black p-4 justify-between items-start">
            <h2 className="text-4xl capitalize">
              {currentSelection?.label ?? `Select ${activeCategory}`}
            </h2>
            <CircleProgress
              percentage={currentSelection?.percentage ?? 0}
              size={400}
              strokeWidth={4}
            />
          </div>

          {/* Right panel */}
          <div className="flex flex-col bg-gray-100 border-t border-black py-4">
            <div className="flex justify-between uppercase font-semibold px-4 mb-2">
              <p className="mr-2">{activeCategory}</p>
              <p>a.i. confidence</p>
            </div>

            {categoryData &&
              Object.entries(categoryData).map(([key, percent]) =>
                currentSelection?.label === key ? (
                  <SelectedConfidenceOption
                    key={key}
                    label={key}
                    percentage={Math.floor(percent * 100)}
                  />
                ) : (
                  <ConfidenceOption
                    key={key}
                    label={key}
                    percentage={percent}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [activeCategory]: {
                          label: key,
                          percentage: Math.floor(percent * 100),
                        },
                      }))
                    }
                  />
                )
              )}
          </div>
        </div>

        {/* Back button */}
        <Link
          href="/select"
          className="my-4 group flex gap-4 items-center z-20 cursor-pointer"
        >
          <Image
            width={50}
            height={50}
            alt="left button"
            src="/left-btn.png"
            className="group-hover:scale-109 transition duration-200"
          />
          <p className="uppercase font-semibold">back</p>
        </Link>
      </div>
    </div>
  );
}

