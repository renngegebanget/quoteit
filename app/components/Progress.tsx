'use client'
import Link from 'next/link'
import { useProgressStore } from '../../store/useStore'

export default function Progress() {
  const progress = useProgressStore((state) => state.progress)
  const dayStreak = useProgressStore((state) => state.streak())
  const entries = progress.length
  return (
    <div className='w-full md:w-1/2 max-w-sm md:max-w-none mx-auto flex flex-col items-center justify-center '>
      <div className='w-full flex items-start justify-between gap-4'>
        <div className='p-4 w-1/2 text-center rounded-xl shadow-md hover:shadow-xl'>
          <h2 className='text-3xl font-semibold text-purple-400'>{dayStreak}</h2>
          <p>Day Streak</p>
        </div>
        <div className='p-4 w-1/2 text-center rounded-xl shadow-md hover:shadow-xl'>
          <h1 className='text-3xl font-bold text-green-500'>{entries}</h1>
          <p>Recent Entries</p>
        </div>
      </div>
      <div className='flex flex-col w-full my-24 gap-4'>
        <Link href='/check-in'>
          <button className='w-full p-4 text-white font-semibold rounded-md bg-purple-400 shadow-md'>Start Daily Check-in</button>
        </Link>
        <Link href='/progress'>
          <button className='w-full p-4 text-center shadow-md font-semibold rounded-xl'>View Progress</button>
        </Link>
      </div>
    </div>
  )
}
