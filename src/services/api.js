import axios from "axios";
import { API_CONFIG } from '../config/env';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  marketTrends: API_CONFIG.MARKET_TRENDS,
  structuredMarketAnalysis: API_CONFIG.STRUCTURED_MARKET_ANALYSIS,
  financialAnalysis: API_CONFIG.FINANCIAL_ANALYSIS,
  zoningOptimizer: API_CONFIG.ZONING_OPTIMIZER,
};

// API service methods
export const fetchMarketTrends = async (location) => {
  try {
    const response = await api.post(endpoints.marketTrends, { location });
    console.log("Market trends API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching market trends:", error);
    throw error;
  }
};

export const fetchStructuredMarketAnalysis = async (location) => {
  try {
    const response = await api.post(endpoints.structuredMarketAnalysis, { location });
    console.log("Structured market analysis API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching structured market analysis:", error);
    throw error;
  }
};

export const fetchFinancialAnalysis = async (location, investmentAmount) => {
  try {
    const response = await api.get(`${endpoints.financialAnalysis}/${encodeURIComponent(location)}`, {
      params: { investmentAmount },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching financial analysis:", error);
    throw error;
  }
};

export const fetchZoningOptimization = async (location, size, currentUse) => {
  try {
    const response = await api.get(endpoints.zoningOptimizer, {
      params: { location, size, currentUse }
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching zoning optimization:", error);
    throw error;
  }
};

export default api;