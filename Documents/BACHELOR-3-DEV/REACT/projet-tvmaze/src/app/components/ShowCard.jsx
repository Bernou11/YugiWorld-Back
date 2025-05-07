// src/app/components/ShowCard.jsx
'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { useFavorites } from '@/app/hooks/useFavorites'

export default function ShowCard({ id, name, image }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(id)

  return (
    <div className="relative border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition flex flex-col h-full">
      {/* Bouton favoris */}
      <button
        onClick={() => toggleFavorite(id)}
        className={`absolute top-2 right-2 p-1 ${
          fav ? 'text-yellow-400' : 'text-gray-400'
        } hover:opacity-80`}
        aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Star size={20} />
      </button>

      {/* Contenu de la carte */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-2 text-indigo-800">{name}</h2>
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full rounded mb-4 object-cover max-h-64"
          />
        )}
      </div>

      {/* Bouton Voir la fiche */}
      <Link
        href={`/series/${id}`}
        className="mt-4 block text-center bg-gradient-to-r from-indigo-600 to-indigo-400 text-white px-5 py-2 rounded-full hover:from-indigo-700 hover:to-indigo-500 transition"
      >
        Voir la fiche
      </Link>
    </div>
  )
}
