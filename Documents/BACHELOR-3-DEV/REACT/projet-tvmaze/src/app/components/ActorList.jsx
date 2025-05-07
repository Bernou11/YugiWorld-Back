'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ActorList({ cast }) {
  const [visibleCount, setVisibleCount] = useState(6)

  // 1) On déduplique le cast par person.id
  const uniqueCast = cast.reduce((acc, entry) => {
    if (!acc.find(e => e.person.id === entry.person.id)) {
      acc.push(entry)
    }
    return acc
  }, [])

  // 2) On ne garde que les visibleCount premiers
  const displayed = uniqueCast.slice(0, visibleCount)
  const loadMore = () => setVisibleCount(v => v + 6)

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-sky-700">
        Acteurs & personnages
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayed.map((entry) => (
          <Link
            key={entry.person.id}
            href={`/actors/${entry.person.id}`}
            className="bg-white shadow rounded p-3 text-center hover:shadow-lg transition"
          >
            <img
              src={
                entry.person.image?.medium ||
                entry.character.image?.medium ||
                '/default.jpg'
              }
              alt={entry.person.name}
              className="w-24 h-24 mx-auto object-cover rounded-full mb-2"
            />
            <p className="font-semibold">{entry.person.name}</p>
            <p className="text-sm text-gray-500">
              en tant que {entry.character.name}
            </p>
          </Link>
        ))}
      </div>

      {visibleCount < uniqueCast.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Voir plus d’acteurs
          </button>
        </div>
      )}
    </div>
  )
}
