import React, { useState } from "react";
import ChatResponse from "../components/ChatResponse";
import { fetchZoningOptimization } from "../services/api";
import "../css/ZoningOptimizer.css";

const ZoningOptimizer = () => {
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [currentUse, setCurrentUse] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleZoningOptimization = async () => {
    if (!location || !size || !currentUse) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const data = await fetchZoningOptimization(location, size, currentUse);
      console.log("API Response:", data);
      setResponse(data);
    } catch (error) {
      console.error("Error fetching zoning optimization:", error);
      setResponse({
        candidates: [
          { content: { parts: [{ text: "❌ Unable to fetch zoning optimization data. Try again later." }] } },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zoning-optimizer">
      <div className="zoning-container">
        <div className="zoning-header">
          <div className="header-content">
            <h1 className="animate-text"> Zoning Optimizer</h1>
            <p className="animate-text-delay">Find the best land use potential for your property.</p>
          </div>
        </div>

        <div className="zoning-content">
          <div className="input-section">
            <div className="input-container">
              <h2 className="section-title">Property Details</h2>
              <p className="section-description">Enter your property information to get zoning optimization suggestions.</p>
              
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter location (e.g., New York)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Enter size (sqft)"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Current Use (e.g., Residential)"
                  value={currentUse}
                  onChange={(e) => setCurrentUse(e.target.value)}
                />
              </div>

              <button 
                onClick={handleZoningOptimization} 
                disabled={loading}
                className="optimize-button"
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Optimize Zoning</span>
                    <span className="button-icon">→</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="response-section">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Analyzing zoning optimization for your property...</p>
              </div>
            ) : !response ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏗️</div>
                <h3>Enter Property Details</h3>
                <p>Fill in the form on the left to get zoning optimization suggestions.</p>
              </div>
            ) : (
              <div className="response-container">
                <h2>Zoning Optimization Results</h2>
                <ChatResponse response={response} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoningOptimizer;
