export default function Profile() {
  return (
    <div className="container-custom py-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-light"></div>
        <div><h1 className="text-3xl font-bold">Alex Johnson</h1><p className="text-gray">alex@example.com</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <div><label className="block text-sm font-medium text-gray-dark">Full name</label><input type="text" className="w-full px-4 py-2 border border-gray-light rounded-full" defaultValue="Alex Johnson" /></div>
          <div><label className="block text-sm font-medium text-gray-dark">Email</label><input type="email" className="w-full px-4 py-2 border border-gray-light rounded-full" defaultValue="alex@example.com" /></div>
          <div><label className="block text-sm font-medium text-gray-dark">Photo</label><input type="file" /></div>
          <div><label className="block text-sm font-medium text-gray-dark">Language</label><select className="w-full px-4 py-2 border border-gray-light rounded-full"><option>English</option><option>Spanish</option></select></div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Preplanned trips</h3>
          <div className="space-y-2">{['Tokyo', 'Paris'].map(trip => <div key={trip} className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center"><span>{trip}</span><button className="text-teal">View</button></div>)}</div>
          <h3 className="font-semibold mt-6 mb-4">Previous trips</h3>
          <div className="space-y-2">{['Bali', 'NYC'].map(trip => <div key={trip} className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center"><span>{trip}</span><button className="text-teal">View</button></div>)}</div>
          <button className="mt-8 text-sm text-gray hover:text-red-400">Delete account</button>
        </div>
      </div>
    </div>
  )
}