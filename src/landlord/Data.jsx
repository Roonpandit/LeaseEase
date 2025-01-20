import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "./Data.css";
import Navbar_1 from "./Navbar_1";

function Data() {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/MaintainanceData.json"
      )
      .then((response) => {
        const fetchedData = response.data || {};
        const dataArray = Object.keys(fetchedData).map((key) => ({
          id: key,
          ...fetchedData[key],
        }));
        setMaintenanceData(dataArray);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredData = maintenanceData.filter((item) => {
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesUrgency = urgencyFilter
      ? item.urgency === urgencyFilter
      : true;
    const formStatus = item.formstatus || "Pending";
    const matchesStatus = statusFilter ? formStatus === statusFilter : true;
    return matchesCategory && matchesUrgency && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    const previousStatus = maintenanceData.find(
      (item) => item.id === id
    ).formstatus;
    axios
      .patch(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/MaintainanceData/${id}.json`,
        { formstatus: newStatus }
      )
      .then(() => {
        const updatedData = maintenanceData.map((item) =>
          item.id === id ? { ...item, formstatus: newStatus } : item
        );
        setMaintenanceData(updatedData);
      })
      .catch(() => {
        setError("Failed to update status. Please try again.");
        const resetData = maintenanceData.map((item) =>
          item.id === id ? { ...item, formstatus: previousStatus } : item
        );
        setMaintenanceData(resetData);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      axios
        .delete(
          `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/MaintainanceData/${id}.json`
        )
        .then(() => {
          const updatedData = maintenanceData.filter((item) => item.id !== id);
          setMaintenanceData(updatedData);
        })
        .catch(() => {
          setError("Failed to delete the record. Please try again.");
        });
    }
  };

  return (
    <>
      <Navbar_1 />
      <div className="Status_1">
        <h1>Landlord Dashboard</h1>
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
            ? filteredData.map((item) => (
                <div className="card" key={item.id}>
                  <h3>{item.name || "No Name"}</h3>
                  <p>
                    <strong>Address:</strong> {item.address || "No Address"}
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
                    <strong>Form Status:</strong> {item.formstatus || "Pending"}
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
                  <div className="status-update">
                    <p>
                      <strong>Update Status:</strong>
                    </p>
                    <select
                      value={item.formstatus}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Process">Under Process</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="delete-btn">
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
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

export default Data;
