// src/app/favorites/page.tsx
'use client'

import { useFavorites } from '@/app/hooks/useFavorites'
import { useEffect, useState } from 'react'
import ShowCard from '@/app/components/ShowCard'

interface Show {
  id: number
  name: string
  genres: string[]
  image?: { medium?: string }
}

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const [shows, setShows] = useState<Show[]>([])

  // À chaque changement de favorites, on recharge les shows
  useEffect(() => {
    if (favorites.length === 0) {
      setShows([])
      return
    }
    Promise.all(
      favorites.map(id =>
        fetch(`https://api.tvmaze.com/shows/${id}`).then(r => r.json())
      )
    ).then(data => setShows(data))
  }, [favorites])

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">Mes favoris</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">Vous n'avez pas encore ajouté de favoris.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shows.map(show => (
            <ShowCard
              key={show.id}
              id={show.id}
              name={show.name}
              image={show.image?.medium}
            />
          ))}
        </div>
      )}
    </main>
  )
}
