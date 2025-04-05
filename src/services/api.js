import axios from "axios";
import { API_CONFIG } from '../config/env';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false // Set to false for cross-origin requests
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

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
    console.log('📊 Fetching market trends for:', location);
    const response = await api.post(endpoints.marketTrends, { location });
    console.log("✅ Market trends API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching market trends:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchStructuredMarketAnalysis = async (location) => {
  try {
    console.log('📈 Fetching structured market analysis for:', location);
    const response = await api.post(endpoints.structuredMarketAnalysis, { location });
    console.log("✅ Structured market analysis API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching structured market analysis:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchFinancialAnalysis = async (location, investmentAmount) => {
  try {
    console.log('💰 Fetching financial analysis for:', location);
    const response = await api.get(`${endpoints.financialAnalysis}/${encodeURIComponent(location)}`, {
      params: { investmentAmount }
    });
    console.log("✅ Financial analysis API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching financial analysis:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchZoningOptimization = async (location, size, currentUse) => {
  try {
    console.log('🏢 Fetching zoning optimization for:', location);
    const response = await api.get(endpoints.zoningOptimizer, {
      params: { location, size, currentUse }
    });
    console.log("✅ Zoning optimization API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching zoning optimization:", error.response?.data || error.message);
    throw error;
  }
};

export default api;