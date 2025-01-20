import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "./Bill.css";
import Navbar_1 from "./Navbar_1";

function Bill() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billData, setBillData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentBill, setCurrentBill] = useState({});
  const [billAmount, setBillAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchBillData();
  }, []);

  const fetchBillData = () => {
    axios
      .get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/BillData.json"
      )
      .then((response) => {
        const fetchedBills = response.data || {};
        const formattedBills = Object.keys(fetchedBills).map((key) => ({
          id: key,
          ...fetchedBills[key],
        }));
        setBillData(formattedBills);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch bill data.");
        setLoading(false);
      });
  };

  const handleGenerateBill = (bill) => {
    setCurrentBill(bill);
    setBillAmount(bill.amount || "");
    setDueDate(bill.dueDate || "");
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setBillAmount("");
    setDueDate("");
  };

  const handleBillSubmit = () => {
    if (!billAmount || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    const billDetails = {
      name: currentBill.name,
      address: currentBill.address,
      category: currentBill.category,
      urgency: currentBill.urgency,
      amount: billAmount,
      dueDate,
      billstatus: currentBill.billstatus || "Pending",
      email: currentBill.email,
    };

    const updatedBillData = billData.map((bill) =>
      bill.id === currentBill.id ? { ...bill, amount: billAmount, dueDate } : bill
    );
    setBillData(updatedBillData);

    axios
      .put(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/BillData/${currentBill.id}.json`,
        billDetails
      )
      .then(() => {
        alert("Bill updated successfully.");
        handleClosePopup();
      })
      .catch(() => {
        alert("Failed to update bill.");
      });
  };

  const handleStatusUpdate = (billId, newStatus) => {
    const updatedBillData = billData.map((bill) => 
      bill.id === billId ? { ...bill, billstatus: newStatus } : bill
    );
    setBillData(updatedBillData);

    axios
      .put(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/BillData/${billId}.json`,
        { ...updatedBillData.find(bill => bill.id === billId), billstatus: newStatus }
      )
      .then(() => {})
      .catch(() => {
        setError("Failed to update status.");
      });
  };

  const handleDeleteBill = (billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      axios
        .delete(
          `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/BillData/${billId}.json`
        )
        .then(() => {
          alert("Bill deleted successfully.");
          fetchBillData();
        })
        .catch(() => {
          alert("Failed to delete bill.");
        });
    }
  };

  const filteredBills = billData
    .filter((bill) => (categoryFilter === "All" || bill.category === categoryFilter))
    .filter((bill) => (urgencyFilter === "All" || bill.urgency === urgencyFilter))
    .filter((bill) => (statusFilter === "All" || bill.billstatus === statusFilter));

  return (
    <>
      <Navbar_1 />
      <div className="Data">
        <h1>Bill History</h1>
        <div className="filters">
          <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
            <option value="All">Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="General">General</option>
          </select>
          
          <select onChange={(e) => setUrgencyFilter(e.target.value)} value={urgencyFilter}>
            <option value="All">Urgency</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="All">Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <p className="loadings">Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="Bill_1">
            {filteredBills.length > 0 ? (
              <div className="cards">
                {filteredBills.map((bill) => (
                  <div key={bill.id} className="card">
                    <div className="card-content">
                      <p><strong>Name:</strong> {bill.name || "No Name"}</p>
                      <p><strong>Address:</strong> {bill.address || "No Address"}</p>
                      <p><strong>Category:</strong> {bill.category || "No Category"}</p>
                      <p><strong>Urgency:</strong> {bill.urgency || "Not Mentioned"}</p>
                      <p><strong>Amount:</strong> {bill.amount}</p>
                      <p><strong>Due Date:</strong> {bill.dueDate}</p>
                      <p><strong>Bill Status:</strong> {bill.billstatus || "Pending"}</p>
                      <select
                        value={bill.billstatus || "Pending"}
                        onChange={(e) => handleStatusUpdate(bill.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <div className="card-edit">
                        <button onClick={() => handleGenerateBill(bill)} className="edit-btn">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteBill(bill.id)} className="delete-btn">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-bill">No Bill Data Available.</p>
            )}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup_1">
          <div className="bill_1-form">
            <h2>Edit Bill</h2>
            <p><strong>Name:</strong> {currentBill.name}</p>
            <p><strong>Address:</strong> {currentBill.address}</p>
            <p><strong>Category:</strong> {currentBill.category}</p>
            <p><strong>Urgency:</strong> {currentBill.urgency}</p>
            <label>
              Bill Amount:
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <button onClick={handleBillSubmit} className="submit-btn_1">Update Bill</button>
            <button onClick={handleClosePopup} className="close-btn_1">✖</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Bill;