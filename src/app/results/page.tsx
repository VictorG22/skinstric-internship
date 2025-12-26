"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { SiLens } from "react-icons/si";

export default function ResultsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleIconClick = (): void => {
    fileInputRef.current?.click();
  };

  const uploadImage = async (base64: string): Promise<void> => {
    try {
      setIsLoading(true);

      console.log(`{ Image: ${base64.slice(0,50)}}`)

      const res = await fetch("https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
        }),
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
        console.log("POST success", data);

      // Optional: read response if needed
      // const data = await res.json();

      // Redirect on success
      // router.push("/select");
    } catch (error) {
      setError("Failed to upload image.");
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Reset previous state
    setError(null);

    // Enforce only image files
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      event.target.value = "";
      setPreviewSrc(null);
      return;
    }

    //size limit 20MB
    const MAX_SIZE_MB = 20;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError("Image must be under 2MB.");
      event.target.value = "";
      setPreviewSrc(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result !== "string") return;

      setPreviewSrc(reader.result);

      const base64String = reader.result.split(",")[1];
      setBase64(base64String);

      // Hide upload UI
      setHasUploaded(true);

      // Start upload + loading
      await uploadImage(base64String);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className="relative min-h-[calc(100vh-75px)] w-full flex items-center justify-center bg-white text-center">
      <p className="absolute top-5 left-10 uppercase font-bold text-sm">
        to start analysis
      </p>
      {!hasUploaded && (
        <>
          <div className="w-full flex gap-0 justify-center items-center md:gap-75 xl:gap-200">
            <div className="relative">
              <div className="absolute rotate-45 w-75 h-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab] animate-[spin_90s_linear_infinite]" />
              <div className="absolute rotate-45 w-75 h-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab77] animate-[spin_70s_linear_infinite]" />
              <div className="absolute rotate-45 w-75 h-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab33] animate-[spin_50s_linear_infinite]" />
              <div className=" rounded-full border border-black bg-white p-2 hover:scale-109 transition duration-600">
                <div className="relative overflow-hidden h-30 w-30 border-6 rounded-full border-black">
                  <SiLens className="absolute top-1/2 left-1/2 w-[145%] h-[145%] object-cover -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute rotate-45 w-75 h-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab] animate-[spin_90s_linear_infinite]" />
              <div className="absolute rotate-45 w-75 h-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab77] animate-[spin_70s_linear_infinite]" />
              <div className="absolute rotate-45 w-75 h-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab33] animate-[spin_50s_linear_infinite]" />
              <div className=" rounded-full border border-black bg-white p-2 hover:scale-109 transition duration-600">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />

                <button
                  type="button"
                  onClick={handleIconClick}
                  aria-label="Upload Image"
                  className="relative cursor-pointer overflow-hidden h-30 w-30 border-6 rounded-full border-black"
                >
                  <BsImageAlt className="absolute top-2/3 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2" />
                </button>
              </div>
            </div>
          </div>
          <Link
            href={"/"}
            className="absolute left-5 bottom-10 group flex gap-4 items-center z-20 cursor-pointer"
          >
            <Image
              width={50}
              height={50}
              alt="back button"
              src={"/left-btn.png"}
              className="group-hover:scale-109 transition duration-200 "
            />
            <p className="uppercase font-semibold">back</p>
          </Link>
        </>
      )}
      {hasUploaded && isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          {/* PLACEHOLDER — PUT YOUR OWN CODE HERE */}
          <div className="text-6xl font-bold">Processing image...</div>
        </div>
      )}
      <div className="absolute top-0 right-8 flex flex-col items-start">
        <p className=" mb-1 text-sm font-semibold">Preview</p>
        {previewSrc ? (
          <div className="relative w-32 h-32 overflow-hidden border-gray-300">
            <Image
              src={previewSrc}
              alt={"Uploaded preview"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-24 h-24 border border-gray-300 overflow-hidden md:w-32 md:h-32"></div>
        )}
      </div>
    </div>
  );
}
