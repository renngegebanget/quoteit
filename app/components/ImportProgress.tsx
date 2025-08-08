// @ts-nocheck
'use client'

import { useState } from 'react'
import { useProgressStore } from '../../store/useStore'

export default function ImportProgress() {
  const [jsonData, setJsonData] = useState(null)
  const importProgress = useProgressStore((state) => state.importProgress)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const text = await file.text()
      try {
        const json = JSON.parse(text)

        importProgress(json)
        setJsonData(json)
        alert('Berhasil import data')
      } catch (err) {
        alert('Tidak valid!')
      }
    }
  }

  return (
    <div>
      <input type='file' accept='.json' onChange={handleFileChange}  />
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  )
}
