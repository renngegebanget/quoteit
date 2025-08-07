'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useProgressStore } from '../../store/useStore'
import { useRouter } from 'next/navigation'

export default function CheckIn() {
  const router = useRouter()
  const addProgress = useProgressStore((state) => state.addProgress)

  const [form, setForm] = useState({
    mood: 5,
    energy: 5,
    stress: 5,
    notes: '',
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' || name !== 'notes' ? Number(value) : value,
    }))
  }

  const renderRadioGroup = (title, name) => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'spacer', 'spacer', 10]
    const splitValues = [
      values.slice(0, 4), // 1-4
      values.slice(4, 8), // 5-8
      values.slice(8), // 9-10
    ]

    return (
      <div className='rounded-xl shadow-sm p-4 bg-white mb-4'>
        <h3 className='text-xl font-semibold'>{title}</h3>
        <h4 className='text-gray-600 mb-2'>Current: {form[name]}/10</h4>
        <div className='space-y-2'>
          {splitValues.map((row, rowIndex) => (
            <div key={rowIndex} className='grid grid-cols-4 gap-2 justify-center items-center'>
              {row.map((value, i) => {
                if (value === 'spacer') {
                  return <div key={i} className='w-14 h-14 p-4 '></div>
                }
                const isSelected = form[name] === value
                return (
                  <label
                    key={value}
                    className={`flex flex-col gap-4 mb-2 items-center justify-center w-14 h-14 rounded-full shadow cursor-pointer text-xl ${
                      isSelected ? 'bg-purple-400 text-white' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <input type='radio' name={name} value={value} checked={isSelected} onChange={handleChange} className='hidden' />
                    <div>{value}</div>
                  </label>
                )
              })}
            </div>
          ))}
        </div>
        <div className='flex justify-between text-sm text-gray-600 mt-2'>
          <p>Very low</p>
          <p>Excellent</p>
        </div>
      </div>
    )
  }

  const handleCompleteCheckIn = () => {
    addProgress(form)
    router.push('/')
    alert('Berhasil Check-in')
  }

  return (
    <div className='my-32 max-w-sm md:container mx-auto'>
      <Navbar />
      <div className='mb-4'>
        <h1 className='text-4xl font-bold'>Daily Check-in</h1>
        <p className='text-gray-700'>Take a moment to reflect on how you&apos;re feeling today. Your responses help track your mental wellness journey.</p>
      </div>
      <div className='grid md:grid-cols-2 gap-4'>
        {renderRadioGroup('How do you feel your mood?', 'mood')}
        {renderRadioGroup('How is your energy today?', 'energy')}
        {renderRadioGroup('How stressed are you?', 'stress')}
        <div>
          <div className='rounded-xl shadow-sm p-4 bg-white mb-4'>
            <h3 className='text-xl font-semibold mb-2'>Additional Notes (optional)</h3>
            <p className='mb-2'>Share anything else about your day or how you're feeling</p>
            <textarea name='notes' value={form.notes} onChange={handleChange} placeholder="What's on your mind today?" className='w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div className='flex flex-col w-full my-24 gap-4'>
              <button className='w-full p-4 text-white font-semibold rounded-md bg-purple-400 shadow-md' onClick={handleCompleteCheckIn}>
                Complete Check-in
              </button>
            <Link href='/'>
              <button className='w-full p-4 text-center shadow-md font-semibold rounded-xl'>Back To Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
