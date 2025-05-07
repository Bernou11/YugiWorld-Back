// src/app/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import ShowCard from '@/app/components/ShowCard'

interface Show {
  id: number
  name: string
  genres: string[]
  image?: { medium?: string }
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [allShows, setAllShows] = useState<Show[]>([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true)
      const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
      const data: Show[] = await res.json()
      setAllShows(prev => [
        ...prev,
        ...data.slice(0, 50).filter(s => !prev.some(x => x.id === s.id))
      ])
      setLoading(false)
    }
    fetchShows()
  }, [page])

  const filteredByQuery = useMemo(
    () =>
      query.trim()
        ? allShows.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
        : allShows,
    [query, allShows]
  )

  const filteredResults = useMemo(
    () =>
      selectedGenre
        ? filteredByQuery.filter(s => s.genres.includes(selectedGenre))
        : filteredByQuery,
    [filteredByQuery, selectedGenre]
  )

  const genres = useMemo(() => {
    const list = allShows.flatMap(s => s.genres)
    return Array.from(new Set(list)).sort()
  }, [allShows])

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }
  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  return (
    <motion.main
      className="bg-gradient-to-b from-sky-50 to-white min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <div className="text-center sm:text-left">
            <motion.h1
              className="text-5xl font-extrabold text-indigo-800"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Découvre ta prochaine série
            </motion.h1>
            <motion.p
              className="mt-2 text-lg text-gray-600"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Recherche, filtre, et explore les meilleures séries TV
            </motion.p>
          </div>
          <Link
            href="/favorites"
            className="mt-6 sm:mt-0 inline-block bg-indigo-600 text-white px-5 py-2 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Mes favoris
          </Link>
        </header>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <motion.div
            className="flex-1 flex items-center bg-white rounded-full shadow px-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zm-4.9.68a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="w-full py-2 focus:outline-none rounded-full"
              placeholder="Rechercher une série..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </motion.div>
          {genres.length > 0 && (
            <motion.select
              className="bg-white rounded-full shadow px-4 py-2 text-gray-700"
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <option value="">Tous genres</option>
              {genres.map(g => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </motion.select>
          )}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredResults.map(show => (
            <motion.div key={show.id} variants={item}>
              <ShowCard id={show.id} name={show.name} image={show.image?.medium} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <motion.button
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-400 text-white px-8 py-3 rounded-full shadow hover:from-indigo-700 hover:to-indigo-500 disabled:opacity-50 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Chargement...' : 'Voir plus de séries'}
          </motion.button>
        </div>
      </div>
    </motion.main>
  )
}
