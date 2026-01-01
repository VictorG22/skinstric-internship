"use client";

import BackgroundSquare from "@/components/UI/BackgroundSquare";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SiLens } from "react-icons/si";

export default function CameraSetupPage() {
    const router = useRouter();

    useEffect(() => {
      const timer = setTimeout(() => {
        router.push("/camera/capture");
      }, 1500); 

      return () => clearTimeout(timer);
    }, [router]);

  return (
    <div className="min-h-[calc(100vh-150px)] mb-18.75 w-full flex items-center justify-center bg-white text-center">
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
        <div className="mb-2 rounded-full border border-black bg-white p-2 z-2 relative  animate-[pulseScale_1s_ease-in-out_infinite]">
          <div className="relative overflow-hidden h-20 w-20 md:h-30 md:w-30 border-6 rounded-full border-black">
            <SiLens className="absolute top-1/2 left-1/2 w-[145%] h-[145%] object-cover -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <p className="absolute -bottom-10 -left-35 text-3xl font-semibold w-100 text-center">
          Setting up camera...
        </p>
      </div>
        <div className="absolute flex flex-col w-125 gap-y-2 bottom-20 left-1/2 -translate-x-1/2 p-2 rounded-sm text-black text-center uppercase text-sm">
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
    </div>
  );
}
