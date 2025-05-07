'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'favoriteShows'

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])

  // Charger au démarrage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  // Sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id)
  }, [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
