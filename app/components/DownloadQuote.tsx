'use client'

import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { Lora, Marck_Script } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  weight: '600',
})
const marck = Marck_Script({
  subsets: ['latin'],
  weight: '400',
})

export default function DownloadQuote({ quote = 'illegal', author = 'nothing' }) {
  const captureRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!captureRef.current) return
    const canvas = await html2canvas(captureRef.current)
    const link = document.createElement('a')
    link.download = 'komponen.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <main className='p-6'>
      <div ref={captureRef} className="relative w-120 aspect-[4/5] bg-[url('/images/paper.jpg')] bg-center bg-cover text-black p-4 rounded flex flex-col justify-center items-center">
        <h2 className={`${lora.className} text-xl font-bold`}>{quote}</h2>
        <p className={marck.className}>&mdash;{author}</p>
        <p className='absolute bottom-0 right-0 p-4 text-gray-600'>more quote quoteit.renn.biz.id</p>
      </div>

      <button onClick={handleDownload} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
        Download Gambar
      </button>
    </main>
  )
}
