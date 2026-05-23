export default function Filters({ sectors, filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by title or description..."
        value={filters.search}
        onChange={e => setFilters({ ...filters, search: e.target.value })}
        className="border p-2 rounded flex-grow"
      />
      <select
        value={filters.sector}
        onChange={e => setFilters({ ...filters, sector: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Sectors</option>
        {sectors.map(s => <option key={s}>{s}</option>)}
      </select>
      <select
        value={filters.classification}
        onChange={e => setFilters({ ...filters, classification: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Classifications</option>
        <option>Public</option>
        <option>Restricted</option>
        <option>Confidential</option>
      </select>
    </div>
  );
}