'use client'

import { useState } from 'react'
import { useFavoritesStore } from '../../store/useStore'
import { MdDownload } from 'react-icons/md'
import Modal from '@/components/Modal'
import DownloadQuote from '@/components/DownloadQuote'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Marck_Script } from 'next/font/google'

const marck = Marck_Script({
  subsets: ['latin'],
  weight: '400',
})

export default function Favorites({ favorite }) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
  const [downloadModal, setDownloadModal] = useState(false)

  const isFav =
    favorites.some((item) => item.q === favorite.q) ? (
      <FaHeart
        className='text-2xl cursor-pointer text-red-500'
        onClick={() => removeFavorite(favorite.q)}
      />
    ) : (
      <FaRegHeart
        className='text-2xl cursor-pointer'
        onClick={() => addFavorite(favorite)}
      />
    )

  return (
    <div className='w-full md:w-1/2 p-6 bg-gray-50 rounded-xl text-center max-w-sm md:max-w-none mx-auto md:mx-none mb-2'>
      <h3 className='text-3xl font-semibold'>&ldquo;{favorite?.q}&rdquo;</h3>
      <br />
      <p className={marck.className}>&mdash;{favorite?.a}</p>
      <br />
      <br />
      <div className='flex items-center justify-evenly mx-auto'>
        <MdDownload onClick={() => setDownloadModal(true)} className='text-2xl' />
        {isFav}
      </div>

      {downloadModal && (
        <Modal onClose={() => setDownloadModal(false)}>
          <DownloadQuote quote={favorite?.q} author={favorite?.a} />
        </Modal>
      )}
    </div>
  )
}