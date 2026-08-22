import { Search } from 'lucide-react'

export default function Community() {
  return (
    <div className="container-custom py-8">
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray w-4 h-4" />
          <input type="text" placeholder="Search shared trips..." className="w-full pl-10 pr-4 py-2 border border-gray-light rounded-full bg-white" />
        </div>
        <button className="px-4 py-2 border border-gray-light rounded-full text-sm">Filter</button>
      </div>
      <div className="space-y-6">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white rounded-3xl p-4 shadow-sm flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-gray-light shrink-0"></div>
            <div className="flex-1"><h3 className="font-semibold">Trip {i}</h3><p className="text-sm text-gray">Shared by User {i} · 3 cities</p></div>
            <button className="px-4 py-1 border border-gray-light rounded-full text-sm">View</button>
          </div>
        ))}
      </div>
    </div>
  )
}