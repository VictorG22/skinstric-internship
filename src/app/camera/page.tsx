"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CameraGuard from "@/components/camera/CameraGuard";
import CameraCapture from "@/components/camera/CameraCapture";

export function ErrorOverlay({
  message,
}: {
  message: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white px-6 py-4 rounded shadow text-center max-w-sm">
        <p className="font-semibold">{message}</p>
        <p className="text-sm mt-2">
          Redirecting you back…
        </p>
      </div>
    </div>
  );
}

export default function CameraPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      router.replace("/results");
    }, 1500);

    return () => clearTimeout(timer);
  }, [error, router]);

  return (
    <>
      <CameraGuard onError={setError} />

      {error && <ErrorOverlay message={error} />}

      {!error && (
        <CameraCapture
          onError={setError}
        />
      )}
    </>
  );
}