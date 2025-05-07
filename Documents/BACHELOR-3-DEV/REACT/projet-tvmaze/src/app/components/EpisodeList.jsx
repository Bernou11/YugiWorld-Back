'use client'
import { ChevronDown } from 'lucide-react'
import parse from 'html-react-parser'

export default function EpisodeList({ seasonNumber, episodes }) {
  // **Deduplicate by episode.id**
  const uniqueEpisodes = episodes.filter(
    (ep, idx, arr) => arr.findIndex(e => e.id === ep.id) === idx
  )

  return (
    <details className="group mb-6">
      <summary className="cursor-pointer flex items-center justify-between text-xl font-semibold text-sky-600 mb-2">
        Saison {seasonNumber}
        <ChevronDown className="ml-2 h-5 w-5 transition-transform group-open:rotate-180" />
      </summary>
      <ul className="space-y-2 pl-2">
        {uniqueEpisodes.map(ep => (
          <li
            key={ep.id}
            className="border rounded p-3 bg-gray-50 hover:bg-gray-100 transition"
          >
            <details className="group">
              <summary className="cursor-pointer flex items-center justify-between text-sky-500 font-medium">
                <span>
                  Épisode {ep.number} : {ep.name}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="text-sm text-gray-700 mt-2">
                {parse(ep.summary || 'Pas de résumé disponible.')}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </details>
  )
}
