import { useState, useEffect } from 'react';
import axios from 'axios';
import DatasetCard from './DatasetCard';
import DatasetDetail from './DatasetDetail';
import Filters from './Filters';

const API_URL = 'http://localhost:5000/api';

export default function DatasetDiscovery() {
  const [datasets, setDatasets] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);  // datasets per page
  const [sectors, setSectors] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [filters, setFilters] = useState({ sector: '', classification: '', search: '' });

  // Fetch sectors once
  useEffect(() => {
    axios.get(`${API_URL}/sectors`).then(res => setSectors(res.data));
  }, []);

  // Fetch datasets whenever filters or page changes
  useEffect(() => {
    fetchDatasets();
  }, [filters, page]);

  const fetchDatasets = async () => {
    const offset = (page - 1) * limit;
    const params = {
      ...filters,
      limit,
      offset
    };
    // Remove empty filter values
    Object.keys(params).forEach(key => !params[key] && delete params[key]);

    const res = await axios.get(`${API_URL}/datasets`, { params });
    setDatasets(res.data.data);
    setTotal(res.data.total);
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);  // reset to first page when filters change
  };

  return (
    <div>
      <Filters sectors={sectors} filters={filters} setFilters={handleFilterChange} />
      
      <div className="mt-4 text-gray-600">
        Showing {datasets.length} of {total} dataset(s) – Page {page} of {totalPages}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {datasets.map(ds => (
          <DatasetCard key={ds.id} dataset={ds} onClick={() => setSelectedDataset(ds)} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {selectedDataset && (
        <DatasetDetail dataset={selectedDataset} onClose={() => setSelectedDataset(null)} />
      )}
    </div>
  );
}
