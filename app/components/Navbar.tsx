// @ts-nocheck
'use client'

import Link from 'next/link'
import { useThemeStore, useFavoritesStore } from '../../store/useStore'
import { useState } from 'react'
import Modal from '@/components/Modal'
import Favorites from '@/components/Favorites'
import { FaMoon } from 'react-icons/fa'
import { MdSunny } from 'react-icons/md'
import { HiXMark, HiBars3 } from 'react-icons/hi2'
import { Marck_Script } from 'next/font/google'
import { usePathname } from 'next/navigation'

const marck = Marck_Script({
  subsets: ['latin'],
  weight: '400',
})

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showFavoritesModal, setShowFavoritesModal] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  const getClassName = (pathname, currentPath) => {
    return pathname === currentPath ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white' : 'px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white'
  }

  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const favorites = useFavoritesStore((state) => state.favorites)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  return (
    <nav className='fixed left-0 top-0 w-screen bg-white'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          {/* Mobile menu button */}
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <button
              onClick={toggleMenu}
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
            >
              {menuOpen ? <HiXMark className='h-6 w-6' /> : <HiBars3 className='h-6 w-6' />}
            </button>
          </div>

          {/* Logo and menu */}
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex shrink-0 items-center'>
              <img src='/images/quoteit.png' alt='quoteit' className='w-auto h-16' />
            </div>
            <div className='hidden sm:ml-6 sm:block h-auto'>
              <div className='flex space-x-4 h-full items-center justify-start'>
                <Link href='/' className={getClassName(pathname, '/')}>
                  Dashboard
                </Link>
                <Link href='/api/quotes' className='rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>
                  Quotes
                </Link>
                <Link href='/progress' className={getClassName(pathname, '/progress')}>
                  Progress
                </Link>
                <Link href='/check-in' className={getClassName(pathname, '/check-in')}>
                  Check-in
                </Link>
                <button onClick={() => setShowFavoritesModal(true)} className='relative px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>
                  Favorites
                  <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex justify-center items-center'>{favorites.length}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right action */}
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            {/* Dark & light button */}
            <button className='rounded-full bg-gray-800 p-1 text-gray-300 hover:text-white focus:ring-1 focus:ring-purple-400 focus:outline-none'>
              {theme === 'dark' ? <MdSunny className='text-xl' onClick={toggleTheme} /> : <FaMoon className='text-xl' onClick={toggleTheme} />}
              <span className='sr-only'>Theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='sm:hidden' id='mobile-menu'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            <Link href='/' className='block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'>
              Dashboard
            </Link>
            <Link href='/api/quotes' className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>
              Quotes
            </Link>
            <Link href='/progress' className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>
              Progress
            </Link>
            <Link href='/check-in' className='block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>
              Check-in
            </Link>
            <button className='relative px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>
              Favorites
              <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex justify-center items-center'>{favorites.length}</span>
            </button>
          </div>
        </div>
      )}
      {showFavoritesModal && (
        <Modal onClose={() => setShowFavoritesModal(false)}>
          {favorites && favorites.length === 0
            ? 'no quotes was favorited'
            : favorites.map((favorite, id) => {
                return <Favorites key={id} favorite={favorite} />
              })}
        </Modal>
      )}
    </nav>
  )
}

//      <!-- Active Link = text-indigo-500
//      Inactive Link = hover:text-indigo-500 -->
