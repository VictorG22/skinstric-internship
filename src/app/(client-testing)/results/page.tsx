import Image from "next/image";
import Link from "next/link";
import { BsImageAlt } from "react-icons/bs";
import { SiLens } from "react-icons/si";

export default function ResultsPage() {
  return (
    <div className="relative min-h-[calc(100vh-75px)] w-full flex items-center justify-center bg-white text-center">
      <div className="absolute top-5 left-10 uppercase font-bold text-sm">
        to start analysis
      </div>
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
            <div className="relative overflow-hidden h-30 w-30 border-6 rounded-full border-black">
              <BsImageAlt className="absolute top-2/3 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2" />
            </div>
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
    </div>
  );
}
