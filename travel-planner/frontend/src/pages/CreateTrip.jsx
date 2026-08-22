export default function CreateTrip() {
  return (
    <div className="container-custom py-8">
      <span className="eyebrow">PLAN A NEW JOURNEY</span>
      <h1 className="text-4xl font-bold mb-8">Create Trip</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form className="lg:col-span-2 space-y-4 bg-white p-6 rounded-3xl shadow-sm">
          <div><label className="block text-sm font-medium text-gray-dark mb-1">Trip name</label><input type="text" className="w-full px-4 py-2 border border-gray-light rounded-full" /></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-dark mb-1">Start date</label><input type="date" className="w-full px-4 py-2 border border-gray-light rounded-full" /></div><div><label className="block text-sm font-medium text-gray-dark mb-1">End date</label><input type="date" className="w-full px-4 py-2 border border-gray-light rounded-full" /></div></div>
          <div><label className="block text-sm font-medium text-gray-dark mb-1">Destination</label><input type="text" className="w-full px-4 py-2 border border-gray-light rounded-full" placeholder="City or region" /></div>
          <div><label className="block text-sm font-medium text-gray-dark mb-1">Description</label><textarea rows="4" className="w-full px-4 py-2 border border-gray-light rounded-2xl"></textarea></div>
          <div><label className="block text-sm font-medium text-gray-dark mb-1">Cover photo</label><input type="file" className="w-full" /></div>
          <button className="bg-ink text-white px-8 py-3 rounded-full font-medium">Save Trip</button>
        </form>
        <div className="lg:col-span-1">
          <h3 className="font-semibold mb-4">Suggested places</h3>
          <div className="space-y-4">{['Kyoto', 'Osaka', 'Nara'].map(city => <div key={city} className="bg-white rounded-2xl p-4 shadow-sm"><div className="h-24 bg-gray-light rounded-xl mb-2"></div><p className="font-medium">{city}</p></div>)}</div>
        </div>
      </div>
    </div>
  )
}