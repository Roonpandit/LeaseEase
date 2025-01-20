import React, { useState } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav"
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!validateEmail(inputEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please provide a valid email before submitting.");
      return;
    }

    setIsLoading(true);

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send(
        "finance-manager",
        "finance-manager",
        templateParams,
        "Xf6azrxo-2fVUNC3p"
      )
      .then(() => {
        alert("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setEmailError("");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("An error occurred while sending your message. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
    <Nav/>
        <div>
      <div className="contact-container">
      <button onClick={handleClose} className="close-button">
        &times;
      </button>
        <h1>Contact Management</h1>
        <p>
          If you have any questions or need assistance, feel free to reach out
          to us!
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter your email"
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Enter your message"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
    </>

  );
}

export default Contact;