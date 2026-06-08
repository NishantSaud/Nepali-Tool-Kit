// components/GoldHistoryChart.jsx
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

export default function GoldHistoryChart({ metal = 'gold', priceType = 'hallmark', days = 90 }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    fetchHistoricalData();
  }, [metal, days]);

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/gold/history?metal=${metal}&days=${days}`);
      const result = await response.json();
      
      if (result.ok && result.data && result.data.length > 0) {
        setData(result.data);
        setSource(result.source);
        
        // Get latest price
        const latest = result.data[result.data.length - 1];
        setCurrentPrice(priceType === 'hallmark' ? latest.hallmark_price : latest.tajabi_price);
      } else {
        throw new Error('No data received');
      }
    } catch (err) {
      console.error(`Error fetching ${metal} history:`, err);
      setError('Unable to load chart data');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value) => {
    return `₨${value.toLocaleString('en-IN')}`;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  const getChartColor = () => {
    return metal === 'gold' ? '#c8932a' : '#717171';
  };

  const getTitle = () => {
    if (metal === 'gold') {
      return priceType === 'hallmark' ? 'Hallmark Gold Price (99.9%)' : 'Tajabi Gold Price (99.5%)';
    }
    return 'Silver Price (999 Fine)';
  };

  if (loading) {
    return (
      <div style={{ 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div className="dot dot-ok" style={{ width: '12px', height: '12px' }}></div>
        <p style={{ color: 'var(--text-tertiary)' }}>Loading {metal} price history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div className="badge badge-red">⚠️ {error}</div>
        <button 
          onClick={fetchHistoricalData}
          className="btn btn-ghost"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            color: getChartColor(),
            display: 'inline-block'
          }}>
            {getTitle()}
          </h3>
          {currentPrice && (
            <div style={{ marginTop: '8px' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>
                Current: {formatPrice(currentPrice)} per tola
              </span>
            </div>
          )}
        </div>
        {source === 'mock' && (
          <div className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
            📊 Estimated Nepal Market Data
          </div>
        )}
        {source === 'stooq' && (
          <div className="badge badge-green" style={{ fontSize: '0.65rem' }}>
            📈 Live Market Data (incl. Nepal duties)
          </div>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--text-tertiary)"
            tick={{ fontSize: 11 }}
            tickFormatter={formatDate}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="var(--text-tertiary)"
            tick={{ fontSize: 11 }}
            tickFormatter={formatPrice}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'hallmark_price') return [formatPrice(value), 'Hallmark Gold (99.9%)'];
              if (name === 'tajabi_price') return [formatPrice(value), 'Tajabi Gold (99.5%)'];
              return [formatPrice(value), metal === 'gold' ? 'Gold Price' : 'Silver Price'];
            }}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
          />
          <Legend />
          {metal === 'gold' ? (
            <>
              <Line 
                type="monotone" 
                dataKey="hallmark_price" 
                name="Hallmark Gold (99.9%)"
                stroke="#c8932a" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#c8932a' }}
              />
              <Line 
                type="monotone" 
                dataKey="tajabi_price" 
                name="Tajabi Gold (99.5%)"
                stroke="#8a6118" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#8a6118' }}
              />
            </>
          ) : (
            <Line 
              type="monotone" 
              dataKey="hallmark_price" 
              name="Silver Price"
              stroke="#717171" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#717171' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      
      <div style={{ 
        marginTop: '16px', 
        fontSize: '0.7rem', 
        textAlign: 'center',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-light)',
        paddingTop: '12px'
      }}>
        <span>💰 Prices include import duty, GST (13%), and dealer margins</span>
        <br />
        <span>📊 1 Tola = 11.66 grams | Source: International market + Nepal market factors</span>
      </div>
    </div>
  );
}