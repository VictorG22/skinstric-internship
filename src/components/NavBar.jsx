import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <div className='fixed top-0 left-0 w-full h-18.75 py-4 px-10 flex items-center font-semibold justify-between bg-transparent z-99'>
        <div className='text-xs flex gap-4'>
        <Link href={"/"} className=''>SKINSTRIC</Link>
        <div className='flex itemx-center text-opacity-70 text-[#1A1B1C83] '>
            <Image width={4} className='brightness-0 opacity-50' height={17} src={'/left-bracket.png'} alt='left bracket'/>
        <div className='px-2 rounded-sm text'>INTRO</div>
            <Image width={4} height={17} className='brightness-0 opacity-50' src={'/right-bracket.png'} alt='right bracket'/>
        </div>
        </div>
        <div className='cursor-default text-[10px] py-2 px-4 bg-[#1A1B1C] text-white'>ENTER CODE</div>
      
    </div>
  )
}
