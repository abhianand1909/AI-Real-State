// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://airealstate.onrender.com',
  MARKET_TRENDS: import.meta.env.VITE_MARKET_TRENDS_API || 'https://airealstate.onrender.com/api/market-trends',
  STRUCTURED_MARKET_ANALYSIS: import.meta.env.VITE_STRUCTURED_MARKET_ANALYSIS_API || 'https://airealstate.onrender.com/api/market-trends/structured',
  FINANCIAL_ANALYSIS: import.meta.env.VITE_FINANCIAL_ANALYSIS_API || 'https://airealstate.onrender.com/api/financial-analysis',
  ZONING_OPTIMIZER: import.meta.env.VITE_ZONING_OPTIMIZER_API || 'https://airealstate.onrender.com/api/zoning-optimizer',
};

// Application Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Real State Solution',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
};

// UI Configuration
export const UI_CONFIG = {
  THEME: import.meta.env.VITE_THEME || 'light',
  LANGUAGE: import.meta.env.VITE_LANGUAGE || 'en',
}; 