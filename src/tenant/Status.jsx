import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "./Status.css";
import Navbar from "./Navbar";
import { useAuth } from "../box/AuthContext";

function Status() {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    if (!user || !user.email) return;
    axios
      .get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/MaintainanceData.json"
      )
      .then((response) => {
        const fetchedData = response.data || {};
        const userFilteredData = Object.keys(fetchedData)
          .map((key) => ({
            id: key,
            ...fetchedData[key],
          }))
          .filter((item) => item.email === user.email);
        setMaintenanceData(userFilteredData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, [user]);
  const filteredData = maintenanceData.filter((item) => {
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesUrgency = urgencyFilter
      ? item.urgency === urgencyFilter
      : true;
    const matchesStatus = statusFilter
      ? item.formstatus === statusFilter
      : true;
    return matchesCategory && matchesUrgency && matchesStatus;
  });

  if (!user) {
    return <p className="loading">User not authenticated. Please log in.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="Status">
        <h1>Tenant Dashboard</h1>
        {loading && <p className="loading">Loading data...</p>}
        {error && <p className="error">{error}</p>}

        <div className="filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="General">General</option>
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
          >
            <option value="">Urgency</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Process">Under Process</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="cards-container">
          {filteredData.length > 0
            ? filteredData.map((item, index) => (
                <div key={item.id} className="card">
                  <h3>Maintenance Request {index + 1}</h3>
                  <p>
                    <strong>Name:</strong> {item.name || "No Name"}
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category || "No Category"}
                  </p>
                  <p>
                    <strong>Urgency:</strong> {item.urgency || "Unknown"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {item.description || "No Description"}
                  </p>
                  <p>
                    <strong>Form Status:</strong>{" "}
                    {item.formstatus || "Not Updated"}
                  </p>

                  <div className="attachment">
                    <p>
                      <strong>Attachment:</strong>
                    </p>
                    {item.file ? (
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Attachment
                      </a>
                    ) : (
                      "No File"
                    )}
                  </div>
                </div>
              ))
            : !loading && (
                <p className="no-bill">No maintenance requests available.</p>
              )}
        </div>
      </div>
    </>
  );
}

export default Status;
