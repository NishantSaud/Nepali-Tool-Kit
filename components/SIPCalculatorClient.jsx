// frontend/components/SIPCalculatorClient.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function SIPCalculatorClient() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const calculateSIP = useCallback(() => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;

    if (monthlyRate === 0) {
      const total = monthlyInvestment * months;
      setTotalInvestment(total);
      setEstimatedReturns(0);
      setTotalValue(total);
      return;
    }

    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const totalInv = monthlyInvestment * months;
    const returns = futureValue - totalInv;

    setTotalInvestment(Math.round(totalInv));
    setEstimatedReturns(Math.round(returns));
    setTotalValue(Math.round(futureValue));

    // Generate yearly data
    const data = [];
    for (let year = 1; year <= timePeriod; year++) {
      const monthsUpToYear = year * 12;
      const valueAtYear =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, monthsUpToYear) - 1) / monthlyRate) *
        (1 + monthlyRate);
      const invested = monthlyInvestment * monthsUpToYear;

      data.push({
        year: `Year ${year}`,
        invested: Math.round(invested),
        returns: Math.round(valueAtYear - invested),
        total: Math.round(valueAtYear),
      });
    }
    setYearlyData(data);
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  useEffect(() => {
    calculateSIP();
  }, [calculateSIP]);

  const totalPercent = (totalInvestment / totalValue) * 100;
  const returnsPercent = (estimatedReturns / totalValue) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Calculator Card */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 24,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Monthly Investment (₹)
              </label>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>₹500</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600 }}>{formatCurrency(monthlyInvestment)}</span>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>₹1L</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Expected Return (% p.a.)
              </label>
              <input
                type="range"
                min="4"
                max="20"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>4%</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600 }}>{expectedReturn}%</span>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>20%</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Time Period (Years)
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>1 year</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600 }}>{timePeriod} years</span>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>30 years</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
            }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '.8rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>Total Value</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatCurrency(totalValue)}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-tertiary)', marginBottom: 2 }}>Total Investment</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {formatCurrency(totalInvestment)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-tertiary)', marginBottom: 2 }}>Estimated Returns</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#10b981' }}>
                    {formatCurrency(estimatedReturns)}
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', marginBottom: 6 }}>
                  <span>Investment: {Math.round(totalPercent)}%</span>
                  <span>Returns: {Math.round(returnsPercent)}%</span>
                </div>
                <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${totalPercent}%`, background: 'var(--color-primary)' }} />
                  <div style={{ width: `${returnsPercent}%`, background: '#10b981' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Growth Table */}
      {yearlyData.length > 0 && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-2xl)',
          padding: 24,
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 16 }}>Year-by-Year Growth</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '.85rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 8px' }}>Year</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px' }}>Total Invested</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px' }}>Returns Earned</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px' }}>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((row) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 500 }}>{row.year}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px' }}>
                      {formatCurrency(row.invested)}
                    </td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: '#10b981' }}>
                      {formatCurrency(row.returns)}
                    </td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 500 }}>
                      {formatCurrency(row.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}