import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MarketTrends from "./pages/MarketTrends";
import ZoningOptimizer from "./pages/ZoningOptimizer";
import FinancialAnalysis from "./pages/FinancialAnalysis";
import Header from "./components/Header";
import Footer from "./components/Fotter";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market-trends" element={<MarketTrends />} />
        <Route path="/zoning-optimizer" element={<ZoningOptimizer />} />
        <Route path="/financial-analysis" element={<FinancialAnalysis />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
