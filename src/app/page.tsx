import { CgPlayButton } from "react-icons/cg";

export default function Home() {
  return (
    <div className="flex relative justify-between items-center w-screen h-screen">
      <div className="flex items-center justify-end w-125 h-125 relative -left-80">
        <div className="absolute w-full h-full inset-0 border-2 border-[#A0A4AB] border-dotted rotate-45 bg-transparent" />
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center relative">
            <div className="absolute w-full h-full inset-0 border border-black rotate-45 bg-transparent" />
            <CgPlayButton className="rotate-180 text-4xl " />
          </div>
          <div className="text-[14px] leading-4">DISCOVER A.I.</div>
        </div>
      </div>
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-center tracking-tighter leading-none text-[60px] lg:text-[100px] ">
        Sophisticated
        <br />
        skincare
      </h1>
      <div className="flex items-center justify-start w-125 h-125 relative -right-80">
        <div className="absolute w-full h-full inset-0 border-2 border-[#A0A4AB] border-dotted rotate-45 bg-transparent" />
        <div className="flex items-center gap-6">
          <div className="text-[14px] leading-4">TAKE TEST</div>
          <div className="flex items-center justify-center relative">
            <div className="absolute w-full h-full inset-0 border border-black rotate-45 bg-transparent" />
            <CgPlayButton className=" text-4xl " />
          </div>
        </div>
      </div>
    </div>
  );
}
