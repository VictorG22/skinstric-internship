'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', location: '' })
  const [submitted, setSubmitted] = useState(false)
  const [processing, setProcessing] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleNext(e?: React.MouseEvent | React.FormEvent) {
    e?.preventDefault()
    if (step === 1) {
      if (!form.name.trim()) return
      setStep(2)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.location.trim()) return
    setProcessing(true)
    // mock processing delay and then POST to API
    timerRef.current = window.setTimeout(() => {
      ;(async () => {
        try {
          const res = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          })

          if (!res.ok) {
            const text = await res.text()
            console.error('POST failed', res.status, text)
            return
          }

          const data = await res.json()
          console.log('POST success', data)
          setSubmitted(true)
        } catch (err) {
          console.error('POST error', err)
        } finally {
          setProcessing(false)
        }
      })()
    }, 4000)
  }

  return (
    <div className='relative mt-12.5 min-h-[90vh] flex flex-col items-center justify-center bg-white text-center'>
        <div className='absolute top-0 left-5 uppercase font-bold text-xs'>to start analysis</div>
        <p className='text-sm text-[#a0a4ab] tracking-wider mb-1'>CLICK TO TYPE</p>
        <form onSubmit={handleSubmit} className='relative z-10'>
            {processing ? (
                <div className='py-8 flex flex-col items-center gap-3'>
                    <div className='w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin' />
                    <p className='text-lg font-medium'>Processing your submission…</p>
                    <p className='text-sm text-[#6b7280]'>This should take about 4 seconds.</p>
                </div>
            ) : submitted ? (
                <>
                <div className='py-8'>
                    <p className='text-2xl font-semibold'>Thank you!</p>
                    <p className='mt-2 text-sm text-[#6b7280]'>Proceed for the next Step</p>
                </div>
                <div className='mt-4 flex justify-center'>
                    <button type='button' onClick={() => { setSubmitted(false); setForm({ name: '', location: '' }); setStep(1); }} className='px-4 py-2 bg-gray-100 rounded'>Reset</button>
                </div>
                </>
            ) : (
                <>
                <div className='border-b'>
                    <div>
                        <div className='text-sm text-[#6b7280] mb-2'>Step {step} of 2</div>
                        {step === 1 && (
                            <input
                                autoFocus
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                placeholder='Introduce yourself'
                                className='text-center text-5xl sm:text-6xl focus:outline-none w-125'
                            />
                        )}
                        {step === 2 && (
                            <input
                                autoFocus
                                type='text'
                                name='city'
                                value={form.city}
                                onChange={handleChange}
                                placeholder='Your city name'
                                className='text-center text-5xl sm:text-6xl focus:outline-none w-125'
                            />
                        )}
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-center gap-4'>
                    {step > 1 && (
                        <button type='button' onClick={() => setStep(step - 1)} className='px-4 py-2 rounded border' disabled={processing}>
                            Back
                        </button>
                    )}
                    {step === 1 && (
                        <button
                            type='button'
                            onClick={(e) => handleNext(e)}
                            className='px-6 py-2 rounded bg-black text-white'
                            disabled={!form.name.trim() || processing}
                        >
                            Next
                        </button>
                    )}
                    {step === 2 && (
                        <button type='submit' className='px-6 py-2 rounded bg-black text-white' disabled={!form.location.trim() || processing}>
                            Submit
                        </button>
                    )}
                </div>
                </>
            )}
        </form>
        
        <div className='absolute rotate-45 w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab] animate-[spin_90s_linear_infinite]'></div>
        <div className='absolute rotate-45 w-125 h-125 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab77] animate-[spin_70s_linear_infinite]'></div>
        <div className='absolute rotate-45 w-150 h-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dotted border-[#a0a4ab33] animate-[spin_50s_linear_infinite]'></div>
        <Link
        href={'/'} 
        className='absolute group flex gap-4 items-center bottom-8 left-10 z-20 cursor-pointer'>
            <Image width={50} height={50} alt='back button' src={'/left-btn.png'} className='group-hover:scale-109 transition duration-200 '/>
            <p className='uppercase font-semibold'>back</p>
        </Link>
    </div>
  )
}
