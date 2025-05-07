// components/ShowList.jsx
'use client'

import { useState, useEffect } from 'react'

export default function ShowList({ query }) {
  const [shows, setShows] = useState([])

  useEffect(() => {
    if (!query) return
    fetch(`${process.env.NEXT_PUBLIC_TVMAZE_API}/search/shows?q=${query}`)
      .then(res => res.json())
      .then(data => setShows(data))
  }, [query])

  return (
    <div className="grid grid-cols-2 gap-4">
      {shows.map(({ show }) => (
        <div key={show.id} className="border p-4 rounded shadow">
          <h2 className="font-bold text-lg">{show.name}</h2>
          {show.image && (
            <img src={show.image.medium} alt={show.name} className="w-full" />
          )}
        </div>
      ))}
    </div>
  )
}
