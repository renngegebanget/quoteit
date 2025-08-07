'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import ImportProgress from '@/components/ImportProgress'
import Link from 'next/link'
import { useProgressStore } from '../../store/useStore'

export default function Progress() {
  const [average, setAverage] = useState({
    mood: 0,
    stress: 0,
    energy: 0,
  })
  const [showModal, setShowModal] = useState(false)
  const progress = useProgressStore((state) => state.progress)
  const entries = progress.length

  useEffect(() => {
    const jsbsb = () => {
      let totalMood = 0
      let totalStress = 0
      let totalEnergy = 0
      const entries = progress.length

      progress.forEach((progres) => {
        totalMood += progres.mood * 10
        totalStress += progres.stress * 10
        totalEnergy += progres.energy * 10
      })

      const avgMood = entries > 0 ? totalMood / entries : 0
      const avgStress = entries > 0 ? totalStress / entries : 0
      const avgEnergy = entries > 0 ? totalEnergy / entries : 0

      setAverage({
        mood: Math.floor(Math.round(avgMood) / 10),
        stress: Math.floor(Math.round(avgStress) / 10),
        energy: Math.floor(Math.round(avgEnergy) / 10),
      })
    }

    jsbsb()
  }, [progress])

  const handleDownload = async () => {
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    })

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className='my-32 max-w-sm md:container mx-auto'>
      <Navbar />
      <div className='mb-4'>
        <h1 className='text-4xl font-bold'>Your Progress</h1>
        <p className='text-gray-700'>Track your mental wellness journey over time.</p>
      </div>
      <div className='mt-8 mb-2'>
        <h3 className='text-2xl font-semibold'>Overview</h3>
        <div className='w-full flex items-start justify-between gap-4'>
          <div className='p-4 w-1/2 text-center rounded-xl shadow-md hover:shadow-xl'>
            <h1 className='text-3xl font-bold text-purple-400'>{entries}</h1>
            <p>Total Entries</p>
          </div>
          <div className='p-4 w-1/2 text-center rounded-xl shadow-md hover:shadow-xl'>
            <h2 className='text-3xl font-semibold text-green-500'>0</h2>
            <p>Day Streak</p>
          </div>
        </div>
      </div>
      <div className='mt-8 mb-2'>
        <h3 className='text-2xl font-semibold'>Progress</h3>
        <div className='px-6 py-4 w-full text-center rounded-xl shadow-md hover:shadow-xl'>
          <br></br>
          <div>
            <div className='justify-between flex  items-center '>
              <h2 className='text-xl font-semibold text-gray-700'>Average mood</h2>
              <h2 className='text-xl font-semibold text-gray-400'>{average.mood}/10</h2>
            </div>
            <div className='w-full h-3 bg-gray-300 rounded-xl flex items-start mt-2'>
              <div className='h-3 bg-green-500 rounded-xl' style={{ width: `${average.mood * 10}%` }}></div>
            </div>
          </div>
          <br></br>
          <div>
            <div className='justify-between flex  items-center'>
              <h2 className='text-xl font-semibold text-gray-700'>Energy</h2>
              <h2 className='text-xl font-semibold text-gray-400'>{average.energy}/10</h2>
            </div>
            <div className='w-full h-3 bg-gray-300 rounded-xl flex items-start mt-2'>
              <div className='h-3 bg-blue-500 rounded-xl' style={{ width: `${average.energy * 10}%` }}></div>
            </div>
          </div>
          <br></br>
          <div>
            <div className='justify-between flex  items-center'>
              <h2 className='text-xl font-semibold text-gray-700'>Average stress</h2>
              <h2 className='text-xl font-semibold text-gray-400'>{average.stress}/10</h2>
            </div>
            <div className='w-full h-3  bg-gray-300 rounded-xl flex items-start mt-2'>
              <div className='h-3 bg-orange-400 rounded-xl' style={{ width: `${average.stress * 10}%` }}></div>
            </div>
          </div>
          <br></br>
        </div>
      </div>
      <div className='mt-8 mb-2'>
        <div className='w-full flex items-center justify-between'>
          <h3 className='text-2xl font-semibold'>Recent Entries</h3>
          <div className='w-1/2 items-end'>
            <button onClick={handleDownload} className='w-1/2 p-2 text-center shadow-md font-semibold rounded-xl'>
              Export
            </button>
            <button className='w-1/2 p-2 text-center shadow-md font-semibold rounded-xl' onClick={() => setShowModal(true )}>
              Import
            </button>
          </div>
        </div>
        {progress.length !== 0 ? (
          <div className='mt-4 gap-4'>
            {progress.map((progres) => (
              <div className='w-full my-3 p-6 shadow rounded-xl flex flex-wrap md:flex-nowrap' key={progres.date}>
                <div className='w-full flex justify-between'>
                  <div>
                    <h4 className='text-xl font-semibold text-gray-900'>{new Date(progres.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h4>
                    <h4 className='text-xl font-medium text-gray-500'>mood:&nbsp;&nbsp;{progres.mood}/10</h4>
                  </div>
                  {progres.notes.trim() === '' ? '' : <input className='hidden md:block border text-gray-700 p-3 rounded-xl' value={progres.notes} disable='true' readOnly />}

                  <div>
                    <h5 className='text-lg font-medium text-gray-500'>energy:&nbsp;&nbsp;{progres.energy}/10</h5>
                    <h5 className='text-lg font-medium text-gray-500'>stress:&nbsp;&nbsp;{progres.stress}/10</h5>
                  </div>
                </div>
                {progres.notes.trim() === '' ? (
                  ''
                ) : (
                  <input className='block md:hidden border w-full text-gray-700 p-3 mt-2 rounded-xl' value={progres.notes} disable='true' readOnly />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-4 text-center'>No entries here, check-in now or import your entries.json</p>
        )}
      </div>

      <div className='flex flex-col w-full my-24 gap-4'>
        <Link href='/check-in'>
          <button className='w-full p-4 text-center shadow-md font-semibold rounded-xl text-white bg-purple-400'>New Check-in</button>
        </Link>
        <Link href='/'>
          <button className='w-full py-4 font-semibold rounded-md shadow-sm'>Back To Home</button>
        </Link>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} >
        
      <ImportProgress />
      </Modal>}
    </div>
  )
}
