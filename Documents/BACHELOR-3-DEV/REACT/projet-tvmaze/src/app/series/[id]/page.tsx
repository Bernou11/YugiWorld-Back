// src/app/series/[id]/page.tsx
import EpisodeList from '@/app/components/EpisodeList'
import ActorList from '@/app/components/ActorList'
import parse from 'html-react-parser'

interface SeriesPageProps {
  params: { id: string }
}

interface Show {
  id: number
  name: string
  image: { medium: string; original: string } | null
  summary: string
  genres: string[]
  premiered: string
  rating: { average: number | null }
}

interface Season {
  id: number
  number: number
}

interface Episode {
  id: number
  name: string
  number: number
  summary: string
  season: number
}

interface CastEntry {
  person: {
    id: number
    name: string
    image?: { medium: string; original: string }
  }
  character: {
    name: string
    image?: { medium: string; original: string }
  }
}

async function getShowDetails(id: string): Promise<Show> {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Erreur lors du chargement de la série')
  return res.json()
}

async function getSeasons(showId: string): Promise<Season[]> {
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`, { cache: 'no-store' })
  return res.json()
}

async function getEpisodes(seasonId: number): Promise<Episode[]> {
  const res = await fetch(`https://api.tvmaze.com/seasons/${seasonId}/episodes`, { cache: 'no-store' })
  return res.json()
}

async function getCast(showId: string): Promise<CastEntry[]> {
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}/cast`, { cache: 'no-store' })
  return res.json()
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { id } = params
  const show = await getShowDetails(id)
  const seasons = await getSeasons(id)
  const cast = await getCast(id)

  const episodesBySeason = await Promise.all(
    seasons.map(async season => ({
      seasonNumber: season.number,
      episodes: await getEpisodes(season.id),
    }))
  )

  return (
    <main className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Poster */}
          {show.image?.original && (
            <div className="md:w-1/3">
              <img
                src={show.image.original}
                alt={show.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Details */}
          <div className="p-8 md:w-2/3">
            <h1 className="text-4xl font-extrabold mb-4 text-sky-800">{show.name}</h1>
            <div className="prose prose-slate max-w-none text-gray-700 mb-6">
              {parse(show.summary || '')}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {show.genres.map((g) => (
                <span
                  key={g}
                  className="bg-sky-200 text-sky-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap text-gray-600 text-sm gap-6">
              <div><strong>Première :</strong> {show.premiered || 'N/A'}</div>
              <div><strong>Note :</strong> {show.rating.average ?? 'Non notée'}</div>
            </div>
          </div>
        </div>

        {/* Seasons & Episodes */}
        <section className="p-8 border-t">
          <h2 className="text-2xl font-bold mb-6 text-sky-700">Saisons & épisodes</h2>
          <div className="space-y-8">
            {episodesBySeason.map(({ seasonNumber, episodes }) => (
              <EpisodeList
                key={seasonNumber}
                seasonNumber={seasonNumber}
                episodes={episodes}
              />
            ))}
          </div>
        </section>

        {/* Cast */}
        <section className="p-8 border-t">
          <ActorList cast={cast} />
        </section>
      </div>
    </main>
  )
}
