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

export default function DownloadQuote({ quote = '', author = '' }) {
  const captureRef = useRef<HTMLDivElement>(null)
  const handleDownload = async () => {
  if (!captureRef.current) return;

  // Paksa semua teks & background di elemen jadi warna aman
  captureRef.current.querySelectorAll("*").forEach((el) => {
    const element = el as HTMLElement;
    const styles = getComputedStyle(element);

    if (styles.color.includes("oklch")) {
      element.style.color = "rgb(0,0,0)"; // hitam
    }
    if (styles.backgroundColor.includes("oklch")) {
      element.style.backgroundColor = "rgb(255,255,255)"; // putih
    }
  });

  try {
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      scale: 2
    });
    const link = document.createElement('a');
    link.download = 'quoteit.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Gagal membuat gambar:', err);
  }
};


  return (
    <main className='p-6'>
      <div ref={captureRef} className="relative w-120 aspect-[4/5] bg-[url('/images/paper.jpg')] bg-center bg-cover text-black p-4 rounded flex flex-col justify-center items-center">
        <h2 className={`${lora.className} text-xl font-bold`}>{quote}</h2>
        <p className={marck.className}>&mdash;{author}</p>
        <p className={`${lora.className} absolute bottom-0 right-0 p-4 text-xs text-gray-600`}>more quote quoteit.renn.biz.id</p>
      </div>

      <button onClick={handleDownload} className='mt-4 px-4 py-2 bg-purple-500 text-white rounded'>
        Download Image
      </button>
    </main>
  )
}
