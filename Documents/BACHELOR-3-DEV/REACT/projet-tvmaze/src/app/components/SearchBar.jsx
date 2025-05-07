'use client'

export default function SearchBar({ query, onChange, onSearch }) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nom de la série"
        className="flex-1 border p-2 rounded"
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Rechercher
      </button>
    </div>
  )
}
