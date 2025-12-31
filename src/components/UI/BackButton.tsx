'use client'

import Image from "next/image";
import Link from "next/link";


export default function BackButton({prevLink}:{prevLink: string}) {
  return (
    <>
        <Link
          href={`/${prevLink}`}
          className="absolute bottom-2 left-6 text-white my-4 group flex gap-4 items-center z-20 cursor-pointer"
        >
          <Image
            width={50}
            height={50}
            alt="left button"
            src="/left-btn.png"
            className="group-hover:scale-109 transition duration-200 invert"
          />
          <p className="uppercase font-semibold">back</p>
        </Link>
      
    </>
  )
}

