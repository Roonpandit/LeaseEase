import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "./About.css";
import Nav from "./Nav";

function About() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div>
      <Nav />
      <div className="about-container">
        <button className="about-close-icon" onClick={handleClose}>
          &times;
        </button>
        <h1 className="about-title">About LeaseEase</h1>
        <p className="about-description">
          LeaseEase is an innovative tenant-landlord communication platform
          designed to streamline property management, resolve maintenance
          issues, and ensure seamless communication between tenants and
          landlords. Our goal is to provide a transparent, efficient, and
          user-friendly experience for both parties, making property management
          smoother and more effective.
        </p>

        <h2 className="about-section-title">Our Mission</h2>
        <p className="about-text">
          Our mission is to empower tenants and landlords with a reliable,
          real-time communication system that simplifies the management of
          property-related issues, maintenance requests, and rent payments.
          LeaseEase aims to provide a one-stop platform that enhances
          interaction, transparency, and efficiency.
        </p>

        <h2 className="about-section-title">What We Do</h2>
        <ul className="about-list">
          <li>
            Intuitive Maintenance Requests: Tenants can easily report issues and
            track their resolution in real-time.
          </li>
          <li>
            Seamless Communication: Our platform offers a direct messaging
            system for immediate communication between tenants and landlords.
          </li>
          <li>
            Rent Payment Tracker: A comprehensive system that helps both tenants
            and landlords keep track of payments and due dates.
          </li>
          <li>
            Maintenance History and Reports: Landlords can track the history of
            maintenance requests and generate exportable reports.
          </li>
          <li>
            Mobile-Friendly Design: LeaseEase is optimized for mobile devices,
            ensuring tenants and landlords can manage their properties on the
            go.
          </li>
        </ul>

        <h2 className="about-section-title">Our Vision</h2>
        <p className="about-text">
          We envision a future where tenant-landlord communication is seamless,
          efficient, and transparent. LeaseEase aims to simplify property
          management, minimize misunderstandings, and enhance satisfaction for
          both tenants and landlords.
        </p>

        <p className="about-text">
          Join us in creating a more efficient, collaborative, and user-friendly
          environment for tenants and landlords. With LeaseEase, managing your
          property has never been easier.
        </p>
      </div>
    </div>
  );
}

export default About;
