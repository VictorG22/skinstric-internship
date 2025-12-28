import React from "react";

export default function ConfidenceOption({race, percentage,  } : {race: string, percentage: number, }) {
  return (
    <>
      <div className="flex items-center justify-between h-12 hover:bg-[#e1e1e2] px-4 cursor-pointer">
        <div className="relative flex items-center gap-2">
          <div className="relative flex items-center gap-2">
            <div className="relative w-3 h-3">
              <div className="absolute inset-px rotate-45 border border-black" />
            </div>
          </div>

          <p className="mr-2 capitalize">{race}</p>
        </div>
        <p>{`${Math.floor(percentage * 100)}%`}</p>
      </div>
    </>
  );
}
