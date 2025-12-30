"use client";

import { useState, useEffect } from "react";
import { useAnalysis } from "@/context/AnalysisContext";
import Image from "next/image";
import Link from "next/link";
import CircleProgress from "@/components/summary/CircleProgress";
import SelectedConfidenceOption from "@/components/summary/SelectedConfidenceOption";
import ConfidenceOption from "@/components/summary/ConfidenceOption";

const getDefaultSelection = (data: Record<string, number>) => {
  const entries = Object.entries(data);
  if (entries.length === 0) return null;

  const [label, percentage] = entries.reduce((prev, curr) =>
    curr[1] > prev[1] ? curr : prev
  );

  return { label, percentage: Math.floor(percentage * 100) };
};

type AnalysisCategory = "race" | "age" | "gender";

const sortCategoryEntries = (
  category: AnalysisCategory,
  data: Record<string, number>
) => {
  const entries = Object.entries(data);

  if (category === "age") {
    return entries.sort(([a], [b]) => {
      const getStart = (range: string) => Number(range.split("-")[0]);
      return getStart(a) - getStart(b);
    });
  }

  return entries;
};

export default function SummaryPage() {
  const { analysis } = useAnalysis();

  const categories: AnalysisCategory[] = analysis
    ? (Object.keys(analysis) as AnalysisCategory[])
    : [];

  // Initialize empty selected options
  const [selectedOptions, setSelectedOptions] = useState<{
    [category: string]: { label: string; percentage: number };
  }>({});

  const [activeCategory, setActiveCategory] = useState<AnalysisCategory>(
    categories[0] ?? ("race" as AnalysisCategory)
  );

  // Set initial selections once analysis is available
  useEffect(() => {
    if (!analysis) return;

    const initial: { [category: string]: { label: string; percentage: number } } = {};
    for (const category of categories) {
      const highest = getDefaultSelection(analysis[category] ?? {});
      if (highest) initial[category] = highest;
    }

    setSelectedOptions(initial);
  }, [analysis]);

    if (!analysis || Object.keys(selectedOptions).length === 0) {
    return <p>Loading...</p>;
  }

  const currentSelection = selectedOptions[activeCategory];
  const categoryData = analysis[activeCategory] ?? {};

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
              const selection = selectedOptions[category];
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
              sortCategoryEntries(activeCategory, categoryData).map(
                ([key, percent]) =>
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
                      percentage={Math.floor(percent * 100)}
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
