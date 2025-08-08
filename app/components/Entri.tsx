// @ts-nocheck
'use client'
export default function Entri({ entri, deleteProgres }) {
  return (
    <div>
      <ul>
        <li>
          <p>Date:&nbsp;&nbsp;{entri.date}/10</p>
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
        <li>
          <p>
            <button onClick={deleteProgres} >Delete this entri</button>
          </p>
        </li>
      </ul>
    </div>
  )
}
