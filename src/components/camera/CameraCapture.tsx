import { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import BackButton from "../UI/BackButton";
import { useUploadImage } from "@/app/hooks/useUploadImage";

export default function CameraCapture({
  onError,
}: {
  onError: (message: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { isLoading, error: uploadError, uploadImage } = useUploadImage();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      onError("Camera permission was denied.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, [onError]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData); // store for preview
  };

const confirmCapture = async () => {
  if (!capturedImage) return;

  const base64String = capturedImage.split(",")[1];

  try {
    await uploadImage(base64String);

  } catch (err) {
    console.error("Upload failed:", err);
  }
};


  const retakeCapture = () => {
    setCapturedImage(null);
    stopCamera();
    startCamera();
  };

  return (
    <div className="relative flex-1 w-full overflow-hidden bg-black">
      {/* Video feed */}
      {!capturedImage && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Captured image preview */}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Take photo button (only when video feed is showing) */}
      {!capturedImage && !isLoading && (
        <div className="absolute bottom-1/2 right-2 flex items-center gap-3 text-white px-6 py-2 z-10 disabled:opacity-50">
          <span className="hidden sm:inline uppercase text-sm bg-[#0000004d] p-2 rounded-sm">
            Take Picture
          </span>
          <button
            disabled={!ready}
            onClick={captureFrame}
            className="cursor-pointer rounded-full bg-white p-1 hover:scale-109 transition duration-200"
          >
            <CiCamera className="invert-50 border-2 border-black rounded-full p-1 w-15 h-15" />
          </button>
        </div>
      )}

      {/* Confirm / Retake buttons (only when an image is captured) */}
      {capturedImage && !isLoading &&  (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 uppercase text-center text-white bg-[#0000004d] px-2 rounded-lg">
            great shot!
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
            <div className=" w-20 uppercase text-center text-white font-semibold bg-[#0000004d]  rounded-lg">
              Preview
            </div>
            <div className="flex items-center justify-between w-60">
              <button
                onClick={retakeCapture}
                className="cursor-pointer bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
              >
                Retake
              </button>
              <button
                onClick={confirmCapture}
                className="cursor-pointer bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
              >
                Use This Photo
              </button>
            </div>
          </div>
        </>
      )}

      {/* Instructions overlay */}
      {!capturedImage && !isLoading && (
        <div className="absolute flex flex-col w-125 gap-y-2 bottom-1/4 left-1/2 -translate-x-1/2 bg-[#0000004d] p-2 rounded-sm text-white text-center uppercase text-sm">
          <h3>to get better results make sure to have</h3>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rotate-45 border border-white" />
              neutral expression
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rotate-45 border border-white" />
              frontal pose
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rotate-45 border border-white" />
              adequate lighting
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
          <div className="flex flex-col items-center gap-y-10 bg-[#FFFFFF99] px-20 py-10 rounded-lg">
          <p className="text-gray-700 font-bold uppercase">
            Analyzing Image
          </p>
          <div
            className="flex items-center gap-2"
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
              </div>
        </div>
      )}

      {uploadError && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 border border-red-200 px-4 py-2 rounded z-20">
          {uploadError}
        </div>
      )}

      { !isLoading &&
        <BackButton prevLink="results" />
      }


      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
