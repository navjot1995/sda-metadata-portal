import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function RegistrationForm() {
  const [sectors, setSectors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    sector: "",
    formats: [],
    update_frequency: "",
    coverage: "State",
    description: "",
    classification: "Public",
    tags: "",
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/sectors`).then((res) => setSectors(res.data));
  }, []);

  const formatOptions = ["CSV", "XLSX", "JSON", "API", "PDF", "GeoJSON"];
  const freqOptions = [
    "Daily",
    "Monthly",
    "Quarterly",
    "Annual",
    "Seasonal",
    "One-time",
  ];
  const coverageOptions = ["Village", "Block", "District", "Division", "State"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormatToggle = (format) => {
    setFormData((prev) => ({
      ...prev,
      formats: prev.formats.includes(format)
        ? prev.formats.filter((f) => f !== format)
        : [...prev.formats, format],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (formData.formats.length === 0)
      newErrors.formats = "At least one format is required";
    if (!formData.update_frequency)
      newErrors.update_frequency = "Update frequency is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.classification)
      newErrors.classification = "Classification is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(`${API_URL}/datasets`, formData);
      toast.success(
        "Dataset registered successfully! It will be reviewed by the admin.",
      );
      setMessage({
        type: "success",
        text: "Dataset registered successfully! It will be reviewed by the admin.",
      });
      // reset form
      setFormData({
        title: "",
        department: "",
        sector: "",
        formats: [],
        update_frequency: "",
        coverage: "State",
        description: "",
        classification: "Public",
        tags: "",
      });
      setErrors({});
    } catch (err) {
      const errMsg =
        err.response?.data?.error || "Registration failed. Please try again.";
      toast.error(errMsg);
      setMessage({
        type: "error",
        text: errMsg,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register a New Dataset</h2>
      {message && (
        <div
          className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Sector *</label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select sector</option>
            {sectors.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {errors.sector && (
            <p className="text-red-500 text-sm">{errors.sector}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Data Formats *</label>
          <div className="flex flex-wrap gap-2">
            {formatOptions.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => handleFormatToggle(f)}
                className={`px-3 py-1 rounded border ${formData.formats.includes(f) ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              >
                {f}
              </button>
            ))}
          </div>
          {errors.formats && (
            <p className="text-red-500 text-sm">{errors.formats}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Update Frequency *</label>
          <select
            name="update_frequency"
            value={formData.update_frequency}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select frequency</option>
            {freqOptions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
          {errors.update_frequency && (
            <p className="text-red-500 text-sm">{errors.update_frequency}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Coverage Level</label>
          <select
            name="coverage"
            value={formData.coverage}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            {coverageOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Description *</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Classification *</label>
          <select
            name="classification"
            value={formData.classification}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option>Public</option>
            <option>Restricted</option>
            <option>Confidential</option>
          </select>
          {errors.classification && (
            <p className="text-red-500 text-sm">{errors.classification}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="e.g., agriculture, monsoon, yield"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-4 focus:ring-blue-200 shadow-xs font-medium leading-5 rounded text-sm px-4 py-2.5 focus:outline-none transition"
        >
          Submit for Review
        </button>

        <span className="mx-2"></span>

        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
          className="inline-flex items-center bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-black focus:ring-4 focus:ring-gray-200 shadow-xs font-medium leading-5 rounded text-sm px-4 py-2.5 focus:outline-none transition"
        >
          <IoIosArrowRoundBack className="mr-1 text-xl" />
          Back to list
        </button>
      </form>
    </div>
  );
}
