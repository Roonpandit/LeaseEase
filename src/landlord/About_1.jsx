import React from "react";
import "../index.css";
import "./About_1.css";
import Navbar_1 from "./Navbar_1";
function About_1() {
  return (
    <div>
      <Navbar_1 />
      <div className="about_1-container">
        <h1 className="about_1-title">About LeaseEase</h1>

        <p className="about_1-description">
          LeaseEase is an innovative tenant-landlord communication platform
          designed to streamline property management, resolve maintenance
          issues, and ensure seamless communication between tenants and
          landlords. Our goal is to provide a transparent, efficient, and
          user-friendly experience for both parties, making property management
          smoother and more effective.
        </p>

        <h2 className="about_1-section-title">Our Mission</h2>
        <p className="about_1-text">
          Our mission is to empower tenants and landlords with a reliable,
          real-time communication system that simplifies the management of
          property-related issues, maintenance requests, and rent payments.
          LeaseEase aims to provide a one-stop platform that enhances
          interaction, transparency, and efficiency.
        </p>

        <h2 className="about_1-section-title">What We Do</h2>
        <ul className="about_1-list">
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

        <h2 className="about_1-section-title">Our Vision</h2>
        <p className="about_1-text">
          We envision a future where tenant-landlord communication is seamless,
          efficient, and transparent. LeaseEase aims to simplify property
          management, minimize misunderstandings, and enhance satisfaction for
          both tenants and landlords.
        </p>

        <p className="about_1-text">
          Join us in creating a more efficient, collaborative, and user-friendly
          environment for tenants and landlords. With LeaseEase, managing your
          property has never been easier.
        </p>
      </div>
    </div>
  );
}

export default About_1;
