export default function Calendar() {
  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex gap-2"><button className="px-4 py-2 border border-gray-light rounded-full text-sm">Prev</button><button className="px-4 py-2 border border-gray-light rounded-full text-sm">Next</button></div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d} className="text-center font-medium text-sm text-gray">{d}</div>)}
        {Array.from({length: 30}, (_,i) => (
          <div key={i} className="bg-white rounded-xl p-2 min-h-20 border border-gray-light/50 relative">
            <span className="text-xs">{i+1}</span>
            {i === 5 && <div className="absolute bottom-1 left-1 right-1 bg-teal-light text-xs rounded-full px-1 text-center truncate">Trip to Kyoto</div>}
          </div>
        ))}
      </div>
    </div>
  )
}