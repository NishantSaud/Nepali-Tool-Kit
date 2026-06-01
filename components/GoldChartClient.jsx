// components/GoldChartClient.jsx
'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function GoldChartClient({ metal = 'gold', initialHistory = [] }) {
  const [data, setData] = useState(initialHistory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistoricalData();
  }, [metal]);

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      
      // Fetch real historical data from Stooq API (free, no key needed)
      const response = await fetch(`/api/gold/history?metal=${metal}&days=90`);
      const result = await response.json();
      
      if (result.ok && result.data) {
        setData(result.data);
      } else {
        // Fallback to mock data
        setData(generateMockData());
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setData(generateMockData());
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    const mockData = [];
    let basePrice = metal === 'gold' ? 125000 : 1450;
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = (Math.random() - 0.5) * (metal === 'gold' ? 2000 : 30);
      mockData.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(basePrice + variation, metal === 'gold' ? 110000 : 1200),
        [metal]: Math.max(basePrice + variation, metal === 'gold' ? 110000 : 1200)
      });
    }
    return mockData;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading chart data...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          stroke="var(--ink-3)"
          tick={{ fontSize: 12 }}
          interval="preserveStartEnd"
        />
        <YAxis 
          stroke="var(--ink-3)"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `₨${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value) => [`₨${value.toLocaleString()}`, metal === 'gold' ? 'Gold Price' : 'Silver Price']}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke={metal === 'gold' ? '#c8932a' : '#717171'} 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}