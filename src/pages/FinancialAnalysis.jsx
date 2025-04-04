import React, { useState } from "react";
import "../css/FinancialAnalysis.css";
import ChatResponse from "../components/ChatResponse";
import { fetchFinancialAnalysis } from "../services/api";

const FinancialAnalysis = () => {
  const [location, setLocation] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinancialAnalysis = async () => {
    if (!location || !investmentAmount) {
      alert("Please fill all fields.");
      return;
    }
    setLoading(true);
    setResponse(null);

    try {
      const data = await fetchFinancialAnalysis(location, investmentAmount);
      setResponse(data);
    } catch (error) {
      console.error("Error fetching financial analysis:", error);
      setResponse({
        candidates: [
          { content: { parts: [{ text: "❌ Unable to fetch financial analysis. Try again later." }] } }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="financial-analysis">
      <div className="financial-container">
        <div className="financial-header">
          <div className="header-content">
            <h1 className="animate-text"> Financial Investment Analysis</h1>
            <p className="animate-text-delay">Get AI-powered insights for your real estate investment decisions.</p>
          </div>
        </div>

        <div className="financial-content">
          <div className="input-section">
            <div className="input-container">
              <h2 className="animate-text">Investment Details</h2>
              <p className="animate-text-delay">Enter your location and investment amount to receive a comprehensive analysis.</p>
              
              <div className="input-group animate-text-delay">
                <input
                  type="text"
                  placeholder="Enter location (e.g., New York)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="input-group animate-text-delay">
                <input
                  type="number"
                  placeholder="Enter investment amount ()"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
              </div>

              <button 
                onClick={handleFinancialAnalysis} 
                disabled={loading}
                className="animate-text-delay"
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  "Get Analysis"
                )}
              </button>
            </div>
          </div>

          <div className="response-section">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Analyzing investment potential for your location...</p>
              </div>
            ) : !response ? (
              <div className="empty-state">
                <div className="empty-state-icon">💰</div>
                <h3>Enter Investment Details</h3>
                <p>Fill in the form on the left to get financial analysis insights.</p>
              </div>
            ) : (
              <div className="response-container">
                <h2>Financial Analysis Results</h2>
                <ChatResponse response={response} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;
