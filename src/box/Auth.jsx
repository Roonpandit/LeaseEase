import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../index.css";
import "./Auth.css";
import axios from "axios";
import Nav from "./Nav";

const Auth = () => {
  const [formType, setFormType] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({});
  const [signupData, setSignupData] = useState({
    username: "",
    role: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [loginData, setLoginData] = useState({
    role: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAuthData();
  }, []);

  const fetchAuthData = async () => {
    try {
      const response = await axios.get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/LogInData.json"
      );
      setData(response.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    const { username, role, email, password, confirmpassword } = signupData;

    if (!username || !role || !email || !password || !confirmpassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    if (Object.values(data).some((user) => user.email === email)) {
      alert("User already exists with this Email!");
      return;
    }

    try {
      await axios.post(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/LeaseEase/LogInData.json",
        { username, role, email, password }
      );

      alert("Account created successfully! Please login.");
      setSignupData({
        username: "",
        role: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      setFormType("login");
      fetchAuthData();
    } catch (error) {
      console.log("signup failed", error.response?.data || error.message);
    }
  };

  const handleLogin = () => {
    const { role, email, password } = loginData;

    if (!email || !password) {
      alert("All fields are required!");
      return;
    }

    const user = Object.values(data).find(
      (user) =>
        user.email === email && user.password === password && user.role === role
    );

    if (user) {
      login(user);
      if (user.email === "tarunvashisth0000@gmail.com") {   // {only for owner}
        navigate("/Data");
      } else if (user.role === "tenant") {        // {for multiple tenants}
        navigate("/Status");
      }
    } else {
      alert("Invalid Email or Password!");
      setLoginData({ email: "", password: "", role: "" });
    }
  };

  const services = [
    {
      section: "Plumbing",
      items: [
        {
          title: "Leak Repair",
          description: "Quick leak repair solutions.",
          image: "Plumbing1.jpg",
        },
        {
          title: "Pipe Fixing",
          description: "Reliable pipe fixing service.",
          image: "Plumbing2.jpg",
        },
        {
          title: "Using Quality Products",
          description: "Work is well inspected by experts.",
          image: "Plumbing3.jpg",
        },
        {
          title: "Tap Installation",
          description: "Expert tap installations.",
          image: "Plumbing4.jpg",
        },
        {
          title: "Drain Maintenance",
          description: "Efficient drain cleaning.",
          image: "Plumbilg5.jpg",
        },
        {
          title: "Water Tank Cleaning",
          description: "Cleaning and repairing water tanks.",
          image: "Plumbilg6.jpg",
        },
      ],
    },
    {
      section: "Electrical",
      items: [
        {
          title: "Wiring",
          description: "Safe and secure wiring.",
          image: "electrical1.jpg",
        },
        {
          title: "Fan Repair",
          description: "Fan repairing or installation.",
          image: "electrical2.jpg",
        },
        {
          title: "Appliance Repair",
          description: "Appliance repair services.",
          image: "electrical3.jpg",
        },
        {
          title: "Television Repair",
          description: "Television repairing or installation.",
          image: "electrical4.jpg",
        },
        {
          title: "Washing Machine Repair",
          description: "Fixing washing machine issues.",
          image: "electrical5.jpg",
        },
        {
          title: "Water Heater Repair",
          description: "Reliable water heater repair services.",
          image: "elactrical6.jpg",
        },
      ],
    },
    {
      section: "General",
      items: [
        {
          title: "Painting",
          description: "Professional painting services.",
          image: "general1.jpg",
        },
        {
          title: "Carpentry",
          description: "Expert carpentry solutions.",
          image: "general2.jpg",
        },
        {
          title: "Maintenance",
          description: "Door or window maintenance.",
          image: "general3.jpg",
        },
      ],
    },
  ];

  const renderCards = (section) => (
    <section key={section.section} className="service-section">
      <h2>{section.section} Services</h2>
      <div className="card-container">
        {section.items.map((item, index) => (
          <div key={index} className="card">
            <img
              src={`/assets/${item.image}`}
              alt={item.title}
              onError={(e) => (e.target.src = "/assets/default.jpg")}
            />
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div>
      <Nav />
      <div className="auth-content">
        <div className="auth-container">
          <div className="welcome-section">
            <h1>Welcome to LeaseEase</h1>
            <p>Discover the Best Services with Ease.</p>
          </div>
          {formType === "" && (
            <div className="button-container">
              <button
                onClick={() => setFormType("login")}
                className="auth-button"
              >
                Login
              </button>
              <button
                onClick={() => setFormType("signup")}
                className="auth-button"
              >
                Sign Up
              </button>
            </div>
          )}

          {formType === "login" && (
            <div className="form-container">
              <h2>Login</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Role:</label>
                  <select
                    value={loginData.role}
                    onChange={(e) =>
                      setLoginData({ ...loginData, role: e.target.value })
                    }
                  >
                    <option value="">Select Role</option>
                    <option value="tenant">Tenant</option>
                    <option value="landlord">Landlord</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
                <button onClick={handleLogin} className="form-button">
                  Login
                </button>
              </form>
              <p>
                Don't have an account?{" "}
                <span
                  className="link-text"
                  onClick={() => setFormType("signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          )}

          {formType === "signup" && (
            <div className="form-container">
              <h2>Sign Up</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group">
                  <label>Role:</label>
                  <select
                    value={signupData.role}
                    onChange={(e) =>
                      setSignupData({ ...signupData, role: e.target.value })
                    }
                  >
                    <option value="">Select Role</option>
                    <option value="tenant">Tenant</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    value={signupData.confirmpassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmpassword: e.target.value,
                      })
                    }
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                <button onClick={handleSignup} className="form-button">
                  Create Account
                </button>
              </form>
              <p>
                Already have an account?{" "}
                <span
                  className="link-text"
                  onClick={() => setFormType("login")}
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="home-page">
        <main className="cards-container">{services.map(renderCards)}</main>

        <footer className="footer">
          <div className="footer-body">
            <div className="footer-extra">
              <h4>Contact Information:</h4>
              <p>Email: support@servicehub.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Service Hub St, Cityville</p>
            </div>
            <div className="footer-extra">
              <h4>Our Services</h4>
              <p>Electrical works: Repairing or installation.</p>
              <p>Plumbing works: Leak fixing or installation.</p>
              <p>Furniture-related work or others.</p>
            </div>
            <div className="footer-extra">
              <h4>About:</h4>
              <p>Address: 123 Service Hub St, Cityville</p>
              <p>50+ apartments with quality furnishings and accessories.</p>
            </div>
          </div>

          <div className="footer-content">
            <p>
              Copyright &copy; 2024 Sorting LeaseEase Technologies Pvt Ltd. All
              Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
