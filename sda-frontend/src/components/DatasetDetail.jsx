export default function DatasetDetail({ dataset, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold">{dataset.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="mt-4 space-y-2">
          <p><strong>ID:</strong> {dataset.id}</p>
          <p><strong>Department:</strong> {dataset.department}</p>
          <p><strong>Sector:</strong> {dataset.sector}</p>
          <p><strong>Formats:</strong> {dataset.formats.join(', ')}</p>
          <p><strong>Update Frequency:</strong> {dataset.update_frequency}</p>
          <p><strong>Last Updated:</strong> {dataset.last_updated}</p>
          <p><strong>Record Count:</strong> {dataset.record_count?.toLocaleString()}</p>
          <p><strong>Coverage:</strong> {dataset.coverage}</p>
          <p><strong>Description:</strong> {dataset.description}</p>
          <p><strong>Tags:</strong> {dataset.tags?.join(', ')}</p>
          <p><strong>Classification:</strong> {dataset.classification}</p>
          <p><strong>Status:</strong> {dataset.status}</p>
        </div>
      </div>
    </div>
  );
}