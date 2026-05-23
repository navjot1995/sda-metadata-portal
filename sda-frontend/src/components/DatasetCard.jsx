export default function DatasetCard({ dataset, onClick }) {
  const formatColors = {
    CSV: 'bg-green-100 text-green-800',
    JSON: 'bg-blue-100 text-blue-800',
    XLSX: 'bg-yellow-100 text-yellow-800',
    API: 'bg-purple-100 text-purple-800',
    PDF: 'bg-red-100 text-red-800',
    GeoJSON: 'bg-indigo-100 text-indigo-800'
  };

  return (
    <div onClick={onClick} className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition bg-white">
      <h3 className="font-bold text-lg">{dataset.title}</h3>
      <p className="text-gray-600 text-sm">{dataset.department} • {dataset.sector}</p>
      <div className="flex flex-wrap gap-1 my-2">
        {dataset.formats.map(f => (
          <span key={f} className={`text-xs px-2 py-1 rounded ${formatColors[f] || 'bg-gray-100'}`}>{f}</span>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Updated: {dataset.last_updated}</span>
        <span className={`px-2 rounded ${dataset.classification === 'Public' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
          {dataset.classification}
        </span>
      </div>
      <div className="text-xs mt-1 text-gray-400">Status: {dataset.status}</div>
    </div>
  );
}