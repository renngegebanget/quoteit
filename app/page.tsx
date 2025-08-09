'use client'
// @ts-nocheck

import Navbar from './components/Navbar'
import DailyQuotes from './components/DailyQuotes'
import Progress from './components/Progress'

export default function Home() {
  const greeting = () => {
    const hours = new Date().getHours()
    if (hours === 0) {
      return 'Midnight 🌙'
    } else if (hours > 0 && hours < 5) {
      return 'Good Night 🌃'
    } else if (hours >= 5 && hours < 12) {
      return 'Good Morning 🌄'
    } else if (hours >= 12 && hours < 18) {
      return 'Good Afternoon 🌆'
    }
  }
  return (
    <div className='container mx-auto'>
      <Navbar />
      <div className='mt-32 mb-8 w-full max-w-sm md:max-w-none mx-auto md:mx-none'>
        <h1 className='text-4xl font-bold'>{greeting()}</h1>
        <p className='text-gray-700'>How are you felling today? Let&apos;s check in with yourself.</p>
      </div>
      <div className='w-full items-start flex flex-wrap md:flex-nowrap gap-8'>
        <DailyQuotes />
        <Progress />
      </div>
    </div>
  )
}

//<img src'/image/paper.jpg' />
