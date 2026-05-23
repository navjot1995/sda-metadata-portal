# SDA Metadata Background

The **State Data Authority (SDA) of Uttar Pradesh** is building a **Metadata Registry Platform** - a central catalogue that enables all UP government departments to register, discover, and govern their data assets in line with the state's Vision 2030 and the DPDP Act.

You are tasked with building a **prototype of two core interfaces** of this platform:

1. A **public dataset discovery portal** - where users can search and explore datasets registered by UP departments.
2. A **department metadata registration form** - where government staff can submit new dataset entries for review.

## Tech Stack

- **Backend**: Node.js + Express
- **Data**: In-memory (loaded from `data/seed_datasets.json`)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/datasets` | List all datasets. Support query params: `sector`, `classification`, `status`, `search` (text match on title/description) |
| `GET` | `/api/datasets/{id}` | Return a single dataset by ID |
| `POST` | `/api/datasets` | Accept a new dataset registration entry |
| `GET` | `/api/sectors` | Return list of distinct sectors |
| `GET` | `/api/departments` | Return list of distinct departments |

## Quick Start (from a fresh clone)

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### 1. Project Run Dev Mode
```bash

npm install
npm run dev      # starts on http://localhost:5000

```