import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
  return (
    <div className="container-custom py-8">
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray w-4 h-4" />
          <input type="text" placeholder="Search cities or activities..." className="w-full pl-10 pr-4 py-2 border border-gray-light rounded-full bg-white" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-light rounded-full text-sm">Filter</button>
          <button className="px-4 py-2 border border-gray-light rounded-full text-sm">Sort</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Tokyo', 'Kyoto', 'Osaka', 'Nara'].map(city => (
          <div key={city} className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
            <div><h3 className="font-semibold">{city}</h3><p className="text-sm text-gray">Description</p></div>
            <button className="px-4 py-1 border border-gray-light rounded-full text-sm">Add</button>
          </div>
        ))}
      </div>
    </div>
  )
}