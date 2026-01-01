import React from "react";

export default function LoadingDots() {
  return (
    <div
      className="flex items-center gap-x-6"
      role="status"
      aria-live="polite"
      aria-label="Processing"
    >
      <span
        className="w-4 h-4 bg-gray-500 rounded-full inline-block animate-loadingBounce"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="w-4 h-4 bg-gray-500 rounded-full inline-block animate-loadingBounce"
        style={{ animationDelay: "0.12s" }}
      />
      <span
        className="w-4 h-4 bg-gray-500 rounded-full inline-block animate-loadingBounce"
        style={{ animationDelay: "0.24s" }}
      />
    </div>
  );
}
