import React from "react";
import { Link } from "react-router-dom";
import { APP_CONFIG } from "../config/env";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-text">Transform Your Real Estate Vision</h1>
          <p className="animate-text-delay">AI-powered insights for optimal building design and investment decisions</p>
          <Link to="/market-trends" className="cta-button animate-button">Get Started</Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <Link to="/market-trends" className="service-card">
              <div className="service-icon">📊</div>
              <h3>Market Analysis</h3>
              <p>Comprehensive real estate market trends and insights powered by AI</p>
              <div className="service-hover-effect"></div>
            </Link>
            <Link to="/zoning-optimizer" className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Zoning Optimization</h3>
              <p>Smart land usage recommendations based on local regulations</p>
              <div className="service-hover-effect"></div>
            </Link>
            <Link to="/financial-analysis" className="service-card">
              <div className="service-icon">💰</div>
              <h3>Investment Analysis</h3>
              <p>Data-driven financial insights for real estate investments</p>
              <div className="service-hover-effect"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="section-container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="about-grid">
            <div className="about-item">
              <div className="about-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Leveraging cutting-edge AI technology for accurate predictions</p>
            </div>
            <div className="about-item">
              <div className="about-icon">👥</div>
              <h3>Expert Team</h3>
              <p>Industry professionals with years of experience</p>
            </div>
            <div className="about-item">
              <div className="about-icon">💡</div>
              <h3>Innovative Solutions</h3>
              <p>Customized approaches for your unique needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="section-container">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-content">
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
                <span className="form-highlight"></span>
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
                <span className="form-highlight"></span>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" required></textarea>
                <span className="form-highlight"></span>
              </div>
              <button type="submit" className="submit-button">
                <span>Send Message</span>
                <div className="button-effect"></div>
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer with app info */}
      <footer className="app-info">
        <p>{APP_CONFIG.NAME} v{APP_CONFIG.VERSION}</p>
      </footer>
    </div>
  );
};

export default Home;
