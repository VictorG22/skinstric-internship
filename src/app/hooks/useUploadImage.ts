
'use client'

import { useState } from "react";
import { useAnalysis } from "@/context/AnalysisContext";
import { useRouter } from "next/navigation";

export function useUploadImage() {
  const { setAnalysis } = useAnalysis();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (image: string) => {
    setIsLoading(true);
    setError(null); // reset previous errors
    try {
      const res = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const { data } = await res.json();
      setAnalysis(data);

      if (typeof window !== "undefined") {
        alert(data?.message ?? "Upload successfully.");
        router.push("/select");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
      setIsLoading(false);
    }
  };

  // Add a helper to validate files and set errors in the hook
  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return false;
    }

    const MAX_SIZE_MB = 20;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError("Image must be under 20MB.");
      return false;
    }

    setError(null); // valid file
    return true;
  };

  return { isLoading, error, uploadImage, validateFile };
}
