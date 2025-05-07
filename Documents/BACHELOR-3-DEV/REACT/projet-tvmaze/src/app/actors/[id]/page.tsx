// src/app/actors/[id]/page.tsx
import Link from 'next/link'

interface ActorPageProps {
  params: { id: string }
}

interface Person {
  id: number
  name: string
  image?: { medium: string; original: string }
  birthday?: string
  gender?: string
  country?: { name: string }
  url?: string
}

interface CastCredit {
  _embedded: { show: { id: number; name: string; image?: { medium: string }; summary?: string } }
}

async function getPerson(id: string): Promise<Person> {
  const res = await fetch(`https://api.tvmaze.com/people/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Acteur introuvable')
  return res.json()
}

async function getCredits(id: string): Promise<CastCredit[]> {
  const res = await fetch(
    `https://api.tvmaze.com/people/${id}/castcredits?embed=show`,
    { cache: 'no-store' }
  )
  return res.json()
}

export default async function ActorPage({ params }: ActorPageProps) {
  const { id } = params
  const person = await getPerson(id)
  const credits = await getCredits(id)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Retour
      </Link>

      <h1 className="text-3xl font-bold mb-4">{person.name}</h1>
      {person.image?.original && (
        <img
          src={person.image.original}
          alt={person.name}
          className="w-48 h-48 rounded-full object-cover mb-4"
        />
      )}
      <div className="text-gray-700 mb-4">
        <p><strong>Naissance :</strong> {person.birthday || 'N/A'}</p>
        <p><strong>Genre :</strong> {person.gender || 'N/A'}</p>
        <p><strong>Pays :</strong> {person.country?.name || 'N/A'}</p>
        {person.url && (
          <p>
            <a href={person.url} target="_blank" className="text-blue-600 hover:underline">
              Voir sa page TVmaze
            </a>
          </p>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-sky-700">
        Séries dans lesquelles il a joué
      </h2>
      <ul className="space-y-4">
        {credits.map((credit, i) => {
          const show = credit._embedded.show
          return (
            <li key={i} className="flex items-center space-x-4">
              {show.image?.medium && (
                <img
                  src={show.image.medium}
                  alt={show.name}
                  className="w-16 h-16 rounded"
                />
              )}
              <Link href={`/series/${show.id}`} className="text-lg font-medium text-blue-600 hover:underline">
                {show.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
