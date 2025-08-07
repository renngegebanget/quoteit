import { useRef, useEffect } from 'react'
import { HiXMark } from 'react-icons/hi2'
export default function Modal({ onClose, children }) {
  const modalRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
      <div ref={modalRef} className='max-w-sm md:max-w-none w-[80%] mx-auto bg-white p-4 rounded flex flex-col'>
        <div className='w-full flex justify-between'>
          <div></div>
          <HiXMark className="text-xl" onClick={onClose}/>
        </div>
        <br></br>
        {children}
        <br></br>
      </div>
    </div>
  )
}
