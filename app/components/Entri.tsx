// @ts-nocheck
'use client'

export default function Entri({ entri, deleteProgres }) {
  const today = new Date()
  const date = new Date(entri.date)

  const isToday = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()

  return (
    <div>
      <ul>
        <li>
          <p>Date:&nbsp;&nbsp;{new Date(entri.date).toString()}</p>
        </li>
        <li>
          <p>Mood:&nbsp;&nbsp;{entri.mood}/10</p>
        </li>
        <li>
          <p>Energy:&nbsp;&nbsp;{entri.energy}/10</p>
        </li>
        <li>
          <p>Stress:&nbsp;&nbsp;{entri.stress}/10</p>
        </li>
        {entri.notes.trim !== '' ?? (
          <li>
            <p>Notes:&nbsp;&nbsp;{entri.notes}</p>
          </li>
        )}
        {isToday && (
          <li>
            <p>
              <button className='text-blue-500' onClick={deleteProgres}>
                Delete this entri
              </button>
            </p>
          </li>
        )}
      </ul>
    </div>
  )
}
