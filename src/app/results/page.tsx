"use client";

import { useUploadImage } from "../hooks/useUploadImage";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { SiLens } from "react-icons/si";
import BackButton from "@/components/UI/BackButton";
import BackgroundSquare from "@/components/UI/BackgroundSquare";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/UI/LoadingDots";

export default function ResultsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const [showCameraPrompt, setShowCameraPrompt] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const router = useRouter();

  const { isLoading, error, uploadImage, validateFile } = useUploadImage();

  const handleIconClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewSrc(null);

    // Validate file using the hook
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result !== "string") return;

      setPreviewSrc(reader.result);
      const base64String = reader.result.split(",")[1];

      try {
        setHasUploaded(true);
        await uploadImage(base64String);
      } catch {
        setHasUploaded(false);
      }
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
          <div className="w-full md:w-[60%] h-full max-md:py-20 mx-auto flex flex-col md:flex-row gap-40  md:gap-0 justify-center md:justify-between items-center max-md:overflow-y-auto">
            <div className="relative">
              <div className="hidden md:block absolute rotate-50 -top-12 -right-7 h-25 w-px bg-black" />
              <div className="hidden md:block absolute -top-9.25 -right-18.25 p-0.75 border border-black bg-white z-20 rounded-full" />
              <p className="absolute text-start -bottom-15 w-40 md:-top-12 md:-right-60 text-sm uppercase tracking-normal">
                Allow A.I. <br />
                to Scan Your Face
              </p>
              <BackgroundSquare
                size={44}
                bigSize={80}
                animation="animate-[spin_90s_linear_infinite]"
                color="#a0a4ab"
              />
              <BackgroundSquare
                size={42}
                bigSize={75}
                animation="animate-[spin_70s_linear_infinite]"
                color="#a0a4ab77"
              />
              <BackgroundSquare
                size={40}
                bigSize={70}
                animation="animate-[spin_50s_linear_infinite]"
                color="#a0a4ab33"
              />
              <div className="rounded-full border border-black bg-white p-2 hover:scale-109 transition duration-600 z-2 relative">
                <button
                  onClick={() => setShowCameraPrompt(true)}
                  className="relative overflow-hidden h-20 w-20 md:h-30 md:w-30 border-6 rounded-full border-black"
                >
                  <SiLens className="absolute top-1/2 left-1/2 w-[145%] h-[145%] object-cover -translate-x-1/2 -translate-y-1/2" />
                </button>

                {loadingCamera && (
                  <div className="absolute top-1/2 left-full mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading Camera...</span>
                  </div>
                )}
              </div>
              {showCameraPrompt && (
                <div className="absolute top-0 -left-30 md:left-full ml-2 w-80 bg-[#000000d0] pt-3 rounded shadow-lg z-50 text-white">
                  <p className="text-start text-lg font-semibold mb-10 uppercase px-3">
                    ALLOW A.I. TO ACCESS YOUR CAMERA
                  </p>
                  <div className="h-px w-full bg-white my-2" />
                  <div className="flex justify-end gap-10 px-3 pb-2">
                    <button
                      onClick={() => setShowCameraPrompt(false)}
                      className="text-gray-600 hover:text-gray-300 cursor-pointer "
                    >
                      DENY
                    </button>
                    <button
                      onClick={() => {
                        setShowCameraPrompt(false);
                        setLoadingCamera(true);

                        setTimeout(() => {
                          setLoadingCamera(false);
                          router.push("/camera/capture");
                        }, 2000);
                      }}
                      className="text-white font-bold hover:text-gray-300 cursor-pointer"
                    >
                      ALLOW
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <BackgroundSquare
                size={44}
                bigSize={80}
                animation="animate-[spin_90s_linear_infinite]"
                color="#a0a4ab"
              />
              <BackgroundSquare
                size={42}
                bigSize={75}
                animation="animate-[spin_70s_linear_infinite]"
                color="#a0a4ab77"
              />
              <BackgroundSquare
                size={40}
                bigSize={70}
                animation="animate-[spin_50s_linear_infinite]"
                color="#a0a4ab33"
              />
              <div className="hidden md:block absolute rotate-50 -bottom-15 -left-5 h-25 w-px bg-black " />
              <div className="hidden md:block absolute -bottom-12.25 -left-16.25 p-0.75 border border-black bg-white z-20 rounded-full" />
              <p className="absolute text-start md:text-end -bottom-20 w-30 md:-bottom-20 md:-left-47 text-sm uppercase tracking-normal">
                Allow A.I. <br />
                Access Gallery
              </p>
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
                  className="relative cursor-pointer overflow-hidden h-20 w-20 md:h-30 md:w-30 border-6 rounded-full border-black"
                >
                  <BsImageAlt className="absolute top-2/3 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2" />
                </button>
              </div>
            </div>
          </div>
          <BackButton
            prevLink="/testing"
            yPosition={40}
            xDirection="10"
            invert={false}
            color=""
          />
        </>
      )}
      {hasUploaded && isLoading && (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <BackgroundSquare
            size={50}
            bigSize={75}
            animation="animate-[spin_15s_linear_infinite]"
            color="#a0a4ab"
          />
          <BackgroundSquare
            size={50}
            bigSize={75}
            animation="animate-[spin_10s_linear_infinite]"
            color="#a0a4ab7"
          />
          <BackgroundSquare
            size={50}
            bigSize={75}
            animation="animate-[spin_5s_linear_infinite]"
            color="#a0a4ab33"
          />
          <div className="text-md md:text-3xl font-bold uppercase mb-6">
            Preparing your analysis...
          </div>
          <LoadingDots />
        </div>
      )}
      {error && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 border border-red-200 px-4 py-2 rounded">
          {error}
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
