export default function Admin() {
  return (
    <div className="container-custom py-8">
      <span className="eyebrow">ADMIN</span>
      <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {['Users', 'Cities', 'Activities', 'Trends'].map(tab => <button key={tab} className="px-4 py-2 rounded-full bg-white border border-gray-light text-sm">{tab}</button>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {['Total users', 'Active trips', 'Revenue', 'Avg. budget'].map(metric => <div key={metric} className="bg-white rounded-2xl p-4 shadow-sm"><div className="text-2xl font-bold">123</div><div className="text-sm text-gray">{metric}</div></div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm h-64 flex items-center justify-center border border-gray-light">[Bar chart placeholder]</div>
        <div className="bg-white rounded-3xl p-6 shadow-sm h-64 flex items-center justify-center border border-gray-light">[Line chart placeholder]</div>
        <div className="bg-white rounded-3xl p-6 shadow-sm h-64 flex items-center justify-center border border-gray-light">[Donut chart placeholder]</div>
        <div className="bg-white rounded-3xl p-6 shadow-sm h-64 flex items-center justify-center border border-gray-light">[Summary]</div>
      </div>
    </div>
  )
}