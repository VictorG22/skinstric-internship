import { useEffect, useState } from "react";

interface CircleProgressProps {
  percentage: number;
  size?: number; 
  strokeWidth?: number;
}

export default function CircleProgress({
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
    const percentTransitionAnimation = setTimeout(() => setAnimatedPercentage(percentage), 50);
    return () => clearTimeout(percentTransitionAnimation);
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
        style={{ fontSize: size * 0.1 }}
      >
        {animatedPercentage}%
      </span>
    </div>
  );
}