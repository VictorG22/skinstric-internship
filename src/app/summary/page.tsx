import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SummaryPage() {
  return (
    <div className='relative w-full h-screen'>
                <Link
            href={"/select"}
            className="absolute left-5 bottom-10 group flex gap-4 items-center z-20 cursor-pointer"
          >
            <Image
              width={50}
              height={50}
              alt="left button"
              src={"/left-btn.png"}
              className="group-hover:scale-109 transition duration-200 "
            />
            <p className="uppercase font-semibold">back</p>
          </Link>
    </div>
  )
}
