# SDA Metadata Registry Platform

A full-stack prototype for the Uttar Pradesh State Data Authority – allowing government departments to register datasets and citizens to discover them.

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React + Vite + Tailwind CSS
- **Data**: In-memory (loaded from `data/seed_datasets.json`)

## Features

- 🔍 Public dataset discovery with **search**, **sector/classification filters**, and **pagination**
- 📄 Detailed dataset view (modal)
- 📝 Department registration form with validation
- ✅ New submissions automatically receive `Pending Review` status
- 🎨 Clean, accessible UI for non‑technical users

## Quick Start (from a fresh clone)

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone & enter project
```bash
git clone <repository-url>
cd sda-metadata-portal