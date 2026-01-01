import { useState, useEffect } from "react";

export default function BackgroundSquare({
  size = 40,
  bigSize = 100,
  animation = "",
  color = "#a0a4ab",
}: {
  size?: number;
  bigSize?: number;
  animation?: string;
  color?: string;
}) {
  const [currentSize, setCurrentSize] = useState(size * 4);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 768) setCurrentSize(bigSize * 4);
      else setCurrentSize(size * 4);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [size, bigSize]);

  return (
    <div
      className={`absolute rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${animation}`}
      style={{
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        borderColor: color,
        borderStyle: "dotted",
        borderWidth: "2px",
      }}
    />
  );
}
