// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { Marck_Script } from 'next/font/google'
import { FaRegHeart, FaHeart } from 'react-icons/fa' // FontAwesome
import { MdDownload } from 'react-icons/md' // Material Design
import { IoSyncOutline } from 'react-icons/io5' // Ionicons versi 5
import Modal from '@/components/Modal'
import DownloadQuote from '@/components/DownloadQuote'

//zustand
import { useQuoteStore, useFavoritesStore } from '../../store/useStore'

const marck = Marck_Script({
  subsets: ['latin'],
  weight: '400',
})

export default function DailyQuotes() {
  const [downloadModal, setDownloadModal] = useState(false)

  const quote = useQuoteStore((state) => state.quote)
  const hasHydrated = useQuoteStore((state) => state.hasHydrated)
  const setQuote = useQuoteStore((state) => state.setQuote)
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()

  useEffect(() => {
    async function getQuote() {
      if (!hasHydrated) return

      if (!quote) {
        try {
          const res = await fetch('/api/quote')
          const data = await res.json()
          const json = data[0]
          setQuote(json)
        } catch (err) {
          console.log(err)
        }
      }
    }

    getQuote()
  }, [hasHydrated, quote, setQuote])

  const handleRestartQuote = async () => {
    try {
      const res = await fetch('/api/quote')
      const data = await res.json()
      const json = data[0]
      setQuote(json)
    } catch (err) {
      console.log(err)
    }
  }

  const isFav =
    favorites.filter((item) => item.q === quote.q).length !== 0 ? (
      <FaHeart className='text-2xl cursor-pointer text-red-500' onClick={() => removeFavorite(quote.q)} />
    ) : (
      <FaRegHeart className='text-2xl cursor-pointer' onClick={() => addFavorite(quote)} />
    )

  if (!quote)
    return (
      <div className='fixed top-0 left-0 w-screen  h-screen flex justify-center items-center bg-white'>
        <div className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 animate-pulse'>QuoteIt</div>
      </div>
    )

  return (
    <div className='w-full md:w-1/2 p-6 bg-gray-50 rounded-xl text-center max-w-sm md:max-w-none mx-auto md:mx-none'>
      <h3 className={`text-3xl font-semibold`}>&ldquo;{quote?.q}&rdquo;</h3>
      <br></br>
      <p className={marck.className}>&mdash;{quote?.a}</p>
      <br></br>
      <div className='flex items-center justify-evenly mx-auto'>
        <IoSyncOutline className='text-2xl cursor-pointer' onClick={handleRestartQuote} />
        <MdDownload onClick={() => setDownloadModal(true)} className='text-2xl' />
        {isFav}
      </div>
      {downloadModal && (
        <Modal onClose={() => setDownloadModal(false)}>
          <DownloadQuote quote={quote?.q} author={quote?.a}/>
        </Modal>
      )}
    </div>
  )
}
