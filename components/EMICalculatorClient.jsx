// frontend/components/EMICalculatorClient.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function EMICalculatorClient() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState([]);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const calculateEMI = useCallback(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const months = tenureYears * 12;

    if (monthlyRate === 0) {
      const emiValue = principal / months;
      setEmi(Math.round(emiValue));
      setTotalPayment(principal);
      setTotalInterest(0);
      return;
    }

    const emiValue =
      principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const total = emiValue * months;
    const interest = total - principal;

    setEmi(Math.round(emiValue));
    setTotalPayment(Math.round(total));
    setTotalInterest(Math.round(interest));

    // Generate yearly breakdown
    const breakdown = [];
    let remainingPrincipal = principal;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;

    for (let year = 1; year <= tenureYears; year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        const monthInterest = remainingPrincipal * monthlyRate;
        const monthPrincipal = emiValue - monthInterest;
        yearInterest += monthInterest;
        yearPrincipal += monthPrincipal;
        remainingPrincipal -= monthPrincipal;
        if (remainingPrincipal <= 0.01) break;
      }

      cumulativeInterest += yearInterest;
      cumulativePrincipal += yearPrincipal;

      breakdown.push({
        year,
        principalPaid: Math.round(yearPrincipal),
        interestPaid: Math.round(yearInterest),
        remainingBalance: Math.max(0, Math.round(remainingPrincipal)),
        cumulativePrincipal: Math.round(cumulativePrincipal),
        cumulativeInterest: Math.round(cumulativeInterest),
      });

      if (remainingPrincipal <= 0.01) break;
    }

    setYearlyBreakdown(breakdown);
  }, [loanAmount, interestRate, tenureYears]);

  useEffect(() => {
    calculateEMI();
  }, [calculateEMI]);

  const principalPercent = (loanAmount / totalPayment) * 100;
  const interestPercent = (totalInterest / totalPayment) * 100;

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
                Loan Amount (₹)
              </label>
              <input
                type="range"
                min="100000"
                max="20000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>₹1L</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600 }}>{formatCurrency(loanAmount)}</span>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>₹2Cr</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Interest Rate (% p.a.)
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>5%</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600 }}>{interestRate}%</span>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>20%</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Loan Tenure (Years)
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>1 year</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600 }}>{tenureYears} years</span>
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
                <div style={{ fontSize: '.8rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>Monthly EMI</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatCurrency(emi)}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-tertiary)', marginBottom: 2 }}>Total Interest</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ef4444' }}>
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-tertiary)', marginBottom: 2 }}>Total Payment</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {formatCurrency(totalPayment)}
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', marginBottom: 6 }}>
                  <span>Principal: {Math.round(principalPercent)}%</span>
                  <span>Interest: {Math.round(interestPercent)}%</span>
                </div>
                <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${principalPercent}%`, background: 'var(--color-primary)' }} />
                  <div style={{ width: `${interestPercent}%`, background: '#ef4444' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Amortization Table */}
      {yearlyBreakdown.length > 0 && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-2xl)',
          padding: 24,
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 16 }}>Yearly Payment Breakdown</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '.85rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 8px' }}>Year</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px' }}>Principal Paid</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px' }}>Interest Paid</th>
                  <th style={{ textAlign: 'right', padding: '10px 8px' }}>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {yearlyBreakdown.map((row) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 500 }}>{row.year}</td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: 'var(--color-primary)' }}>
                      {formatCurrency(row.principalPaid)}
                    </td>
                    <td style={{ textAlign: 'right', padding: '10px 8px', color: '#ef4444' }}>
                      {formatCurrency(row.interestPaid)}
                    </td>
                    <td style={{ textAlign: 'right', padding: '10px 8px' }}>
                      {formatCurrency(row.remainingBalance)}
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