const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Load seed data
const dataPath = path.join(__dirname, 'data', 'seed_datasets.json');
let datasets = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Helper: get distinct values
const getDistinct = (key) => {
  const values = datasets.map(d => d[key]).filter(v => v);
  return [...new Set(values)].sort();
};


// Routes

// GET /api/datasets - list with filters
app.get('/api/datasets', (req, res) => {
  let { sector, classification, status, search, limit = 10, offset = 0 } = req.query;
  
  // Convert to numbers
  limit = parseInt(limit);
  offset = parseInt(offset);
  
  let results = [...datasets];

  // Apply filters (same as before)
  if (sector && sector !== '') {
    results = results.filter(d => d.sector === sector);
  }
  if (classification && classification !== '') {
    results = results.filter(d => d.classification === classification);
  }
  if (status && status !== '') {
    results = results.filter(d => d.status === status);
  }
  if (search && search !== '') {
    const term = search.toLowerCase();
    results = results.filter(d => 
      d.title.toLowerCase().includes(term) || 
      d.description.toLowerCase().includes(term)
    );
  }

  const total = results.length;
  const paginated = results.slice(offset, offset + limit);

  res.json({
    data: paginated,
    total,
    limit,
    offset,
    hasMore: offset + limit < total
  });
});

// GET /api/datasets/:id
app.get('/api/datasets/:id', (req, res) => {
  const dataset = datasets.find(d => d.id === req.params.id);
  if (!dataset) return res.status(404).json({ error: 'Dataset not found' });
  res.json(dataset);
});

// POST /api/datasets - register new dataset
app.post('/api/datasets', (req, res) => {
  const required = ['title', 'department', 'sector', 'formats', 'update_frequency', 'description', 'classification'];
  const missing = required.filter(field => !req.body[field]);

  if (missing.length > 0) {
    return res.status(422).json({
      error: `Missing required fields: ${missing.join(', ')}`
    });
  }

  // Generate new ID
  const prefix = req.body.sector.substring(0, 3).toUpperCase();
  const maxId = Math.max(...datasets.map(d => {
    const num = parseInt(d.id.split('-')[2]);
    return isNaN(num) ? 0 : num;
  }), 0);
  const newId = `${prefix}-${maxId + 1}`.padEnd(8, '0');

  const newDataset = {
    id: newId,
    title: req.body.title,
    department: req.body.department,
    sector: req.body.sector,
    formats: req.body.formats,
    update_frequency: req.body.update_frequency,
    last_updated: new Date().toISOString().split('T')[0],
    record_count: 0, // default; could be optional
    coverage: req.body.coverage || 'State',
    description: req.body.description,
    tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [],
    classification: req.body.classification,
    status: 'Pending Review'  // automatically set for new submissions
  };

  datasets.push(newDataset);
  res.status(201).json(newDataset);
});

// GET /api/sectors
app.get('/api/sectors', (req, res) => {
  res.json(getDistinct('sector'));
});

// GET /api/departments
app.get('/api/departments', (req, res) => {
  res.json(getDistinct('department'));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});