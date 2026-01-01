import { useEffect, useState } from "react";

interface CircleProgressProps {
  percentage: number;
  strokeWidth?: number;
}

export default function CircleProgress({
  percentage,
  strokeWidth = 12,
}: CircleProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // Animate percentage
  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedPercentage(percentage), 50);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const size = 120; // base size for calculations
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
     <div className="relative max-w-100 aspect-square w-[50%] mt-auto">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
      >

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#9CA3AF"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Highlighted Progress */}
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
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>
      <span
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold"
        style={{ fontSize: size * 0.3 }}
      >
        {animatedPercentage}%
      </span>
    </div>
  );
}