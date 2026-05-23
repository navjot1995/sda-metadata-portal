import { Routes, Route, Link } from "react-router-dom";
import DatasetDiscovery from "./components/DatasetDiscovery";
import RegistrationForm from "./components/RegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SDA Metadata Registry</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Discover Datasets
            </Link>
            <Link to="/register" className="hover:underline">
              Register New Dataset
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DatasetDiscovery />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
