import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import '../css/MarketAnalysisGraphs.css';

// Updated color palette with more vibrant and modern colors
const COLORS = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949'];

const MarketAnalysisGraphs = ({ data }) => {
  const [activeTab, setActiveTab] = useState('supply_demand');
  
  console.log("Raw data received:", data);
  
  // Parse the data if it's a string
  let marketData;
  try {
    marketData = typeof data === 'string' ? JSON.parse(data) : data;
    console.log("Parsed market data:", marketData);
  } catch (error) {
    console.error("Error parsing data:", error);
    return <div className="error-message">Error parsing data: {error.message}</div>;
  }
  
  if (!marketData || !marketData.years) {
    console.error("Invalid data structure:", marketData);
    return <div className="error-message">No data available for visualization</div>;
  }

  // Prepare data for charts
  const years = marketData.years;
  
  // Supply & Demand data
  const supplyDemandData = years.map((year, index) => ({
    year,
    'Property Demand Index': marketData.supply_demand.property_demand_index[index],
    'Property Supply Index': marketData.supply_demand.property_supply_index[index],
    'Price Growth Rate (%)': marketData.supply_demand.price_growth_rate[index],
    'Vacancy Rate (%)': marketData.supply_demand.vacancy_rate[index]
  }));
  
  // Macroeconomic data
  const macroData = years.map((year, index) => ({
    year,
    'Inflation Rate (%)': marketData.macroeconomic_trends.inflation_rate[index],
    'Interest Rate (%)': marketData.macroeconomic_trends.interest_rate_mortgages[index],
    'GDP Growth Rate (%)': marketData.macroeconomic_trends.gdp_growth_rate[index],
    'Employment Rate (%)': marketData.macroeconomic_trends.employment_rate[index]
  }));
  
  // Socio-demographics data
  const socioData = years.map((year, index) => ({
    year,
    'Population Growth Rate (%)': marketData.socio_demographics.population_growth_rate[index],
    'Median Household Income (INR)': marketData.socio_demographics.median_household_income[index] / 10000, // Scale down for better visualization
    'Migration Rate (%)': marketData.socio_demographics.migration_rate[index]
  }));
  
  // Age distribution data for the most recent year
  const ageData = [
    { name: '18-25', value: marketData.socio_demographics.age_distribution['18-25'][years.length - 1] },
    { name: '26-40', value: marketData.socio_demographics.age_distribution['26-40'][years.length - 1] },
    { name: '41-60', value: marketData.socio_demographics.age_distribution['41-60'][years.length - 1] },
    { name: '60+', value: marketData.socio_demographics.age_distribution['60+'][years.length - 1] }
  ];
  
  // Zoning data
  const zoningData = years.map((year, index) => ({
    year,
    'Residential (%)': marketData.zoning_development.residential_zoning_percentage[index],
    'Commercial (%)': marketData.zoning_development.commercial_zoning_percentage[index],
    'Industrial (%)': marketData.zoning_development.industrial_zoning_percentage[index],
    'New Building Permits': marketData.zoning_development.new_building_permits[index],
    'Zoning Law Changes (%)': marketData.zoning_development.zoning_law_changes[index],
    'Infrastructure Investment Index': marketData.zoning_development.infrastructure_investment_index[index]
  }));

  // Render the appropriate chart based on the active tab
  const renderChart = () => {
    switch (activeTab) {
      case 'supply_demand':
        return (
          <div className="chart-container">
            <h3>Supply & Demand Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={supplyDemandData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="year" stroke="#333" />
                <YAxis stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }} />
                <Legend />
                <Line type="monotone" dataKey="Property Demand Index" stroke={COLORS[0]} activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Property Supply Index" stroke={COLORS[1]} strokeWidth={2} />
                <Line type="monotone" dataKey="Price Growth Rate (%)" stroke={COLORS[2]} strokeWidth={2} />
                <Line type="monotone" dataKey="Vacancy Rate (%)" stroke={COLORS[3]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'macroeconomic':
        return (
          <div className="chart-container">
            <h3>Macroeconomic Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={macroData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="year" stroke="#333" />
                <YAxis stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }} />
                <Legend />
                <Line type="monotone" dataKey="Inflation Rate (%)" stroke={COLORS[0]} activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Interest Rate (%)" stroke={COLORS[1]} strokeWidth={2} />
                <Line type="monotone" dataKey="GDP Growth Rate (%)" stroke={COLORS[2]} strokeWidth={2} />
                <Line type="monotone" dataKey="Employment Rate (%)" stroke={COLORS[3]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'socio_demographics':
        return (
          <div className="chart-container">
            <h3>Socio-Demographic Trends</h3>
            <div className="charts-row">
              <div className="chart-half">
                <h4>Population & Income Trends</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={socioData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }} />
                    <Legend />
                    <Line type="monotone" dataKey="Population Growth Rate (%)" stroke={COLORS[0]} activeDot={{ r: 8 }} strokeWidth={2} />
                    <Line type="monotone" dataKey="Median Household Income (INR)" stroke={COLORS[1]} strokeWidth={2} />
                    <Line type="monotone" dataKey="Migration Rate (%)" stroke={COLORS[2]} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-half">
                <h4>Age Distribution (Current Year)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {ageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      
      case 'zoning':
        return (
          <div className="chart-container">
            <h3>Zoning & Development Trends</h3>
            <div className="charts-row">
              <div className="chart-half">
                <h4>Zoning Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={zoningData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }} />
                    <Legend />
                    <Bar dataKey="Residential (%)" stackId="a" fill={COLORS[0]} />
                    <Bar dataKey="Commercial (%)" stackId="a" fill={COLORS[1]} />
                    <Bar dataKey="Industrial (%)" stackId="a" fill={COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-half">
                <h4>Development Indicators</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={zoningData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }} />
                    <Legend />
                    <Line type="monotone" dataKey="New Building Permits" stroke={COLORS[0]} activeDot={{ r: 8 }} strokeWidth={2} />
                    <Line type="monotone" dataKey="Zoning Law Changes (%)" stroke={COLORS[1]} strokeWidth={2} />
                    <Line type="monotone" dataKey="Infrastructure Investment Index" stroke={COLORS[2]} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="market-analysis-graphs">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'supply_demand' ? 'active' : ''}`}
          onClick={() => setActiveTab('supply_demand')}
        >
          Supply & Demand
        </button>
        <button 
          className={`tab ${activeTab === 'macroeconomic' ? 'active' : ''}`}
          onClick={() => setActiveTab('macroeconomic')}
        >
          Macroeconomic
        </button>
        <button 
          className={`tab ${activeTab === 'socio_demographics' ? 'active' : ''}`}
          onClick={() => setActiveTab('socio_demographics')}
        >
          Socio-Demographics
        </button>
        <button 
          className={`tab ${activeTab === 'zoning' ? 'active' : ''}`}
          onClick={() => setActiveTab('zoning')}
        >
          Zoning & Development
        </button>
      </div>
      
      <div className="chart-wrapper">
        {renderChart()}
      </div>
    </div>
  );
};

export default MarketAnalysisGraphs; 