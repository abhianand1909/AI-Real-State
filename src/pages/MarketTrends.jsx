import { useState } from "react";
import ChatInput from "../components/ChatInput";
import ChatResponse from "../components/ChatResponse";
import MarketAnalysisGraphs from "../components/MarketAnalysisGraphs";
import "../css/MarketTrends.css";
import { fetchMarketTrends, fetchStructuredMarketAnalysis } from "../services/api";

const MarketTrends = () => {
  const [response, setResponse] = useState(null);
  const [structuredData, setStructuredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("summary");

  const handleLocationSubmit = async (location) => {
    if (!location.trim()) return;
    setLoading(true);
    setResponse(null);
    setStructuredData(null);
    setLocation(location);

    try {
      // Fetch both regular market trends and structured data
      const [trendsResponse, structuredResponse] = await Promise.all([
        fetchMarketTrends(location),
        fetchStructuredMarketAnalysis(location)
      ]);
      
      console.log("Trends response:", trendsResponse);
      console.log("Structured response:", structuredResponse);
      
      setResponse(trendsResponse);
      setStructuredData(structuredResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("❌ Failed to fetch market trends. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-trends">
      <div className="market-trends-container">
        <div className="market-trends-header">
          <div className="header-content">
            <h1 className="animate-text">Market Trends Analysis</h1>
            <p className="animate-text-delay">
              Get AI-powered insights about real estate trends in any location
            </p>
          </div>
        </div>

        <div className="market-trends-content">
          <div className="search-section">
            <div className="search-container">
              <h2>Enter Location</h2>
              <p>Type a city or region to analyze market trends</p>
              <ChatInput onSubmit={handleLocationSubmit} />
            </div>
          </div>

          <div className="results-section">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Analyzing market trends for {location}...</p>
              </div>
            ) : (response || structuredData) ? (
              <div className="response-container">
                <h2>Market Analysis for {location}</h2>
                
                <div className="analysis-tabs">
                  <button 
                    className={`tab ${activeTab === "summary" ? "active" : ""}`}
                    onClick={() => setActiveTab("summary")}
                  >
                    Summary
                  </button>
                  <button 
                    className={`tab ${activeTab === "graphs" ? "active" : ""}`}
                    onClick={() => setActiveTab("graphs")}
                  >
                    Data Visualization
                  </button>
                </div>
                
                {activeTab === "summary" && response && (
                  <ChatResponse response={response} />
                )}
                
                {activeTab === "graphs" && structuredData && (
                  <MarketAnalysisGraphs data={structuredData} />
                )}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📊</div>
                <h3>Ready to Analyze</h3>
                <p>Enter a location above to get started with market trend analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;
