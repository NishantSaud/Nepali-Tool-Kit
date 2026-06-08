// frontend/components/ShareCalculatorClient.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ShareCalculatorClient() {
  const [buyPrice, setBuyPrice] = useState(250);
  const [sellPrice, setSellPrice] = useState(300);
  const [quantity, setQuantity] = useState(100);
  const [brokerageRate, setBrokerageRate] = useState(0.4);
  const [dpFee, setDpFee] = useState(25);
  
  const [investment, setInvestment] = useState(0);
  const [brokerageBuy, setBrokerageBuy] = useState(0);
  const [brokerageSell, setBrokerageSell] = useState(0);
  const [totalBrokerage, setTotalBrokerage] = useState(0);
  const [sebonFee, setSebonFee] = useState(0);
  const [cdsFee, setCdsFee] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [returnPercentage, setReturnPercentage] = useState(0);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const calculate = useCallback(() => {
    const totalBuy = buyPrice * quantity;
    const totalSell = sellPrice * quantity;
    
    // Brokerage calculation
    const buyBrokerage = (totalBuy * brokerageRate) / 100;
    const sellBrokerage = (totalSell * brokerageRate) / 100;
    const totalBrokerageCalc = buyBrokerage + sellBrokerage;
    
    // SEBON fee (0.015%)
    const sebonFeeCalc = (totalSell * 0.015) / 100;
    
    // CDS fee (0.02%)
    const cdsFeeCalc = (totalSell * 0.02) / 100;
    
    // Gross profit before fees and tax
    const grossProfitCalc = totalSell - totalBuy;
    
    // Total deductions
    const totalDeductions = totalBrokerageCalc + sebonFeeCalc + cdsFeeCalc + dpFee;
    
    // Taxable profit
    const taxableProfit = grossProfitCalc - totalDeductions;
    
    // Capital gains tax (7.5% for individuals)
    const taxCalc = taxableProfit > 0 ? (taxableProfit * 7.5) / 100 : 0;
    
    // Net profit
    const netProfitCalc = taxableProfit - taxCalc;
    const returnPct = totalBuy > 0 ? (netProfitCalc / totalBuy) * 100 : 0;
    
    setInvestment(totalBuy);
    setBrokerageBuy(Math.round(buyBrokerage));
    setBrokerageSell(Math.round(sellBrokerage));
    setTotalBrokerage(Math.round(totalBrokerageCalc));
    setSebonFee(Math.round(sebonFeeCalc));
    setCdsFee(Math.round(cdsFeeCalc));
    setGrossProfit(Math.round(grossProfitCalc));
    setTaxAmount(Math.round(taxCalc));
    setNetProfit(Math.round(netProfitCalc));
    setReturnPercentage(returnPct);
  }, [buyPrice, sellPrice, quantity, brokerageRate, dpFee]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const isProfit = netProfit >= 0;

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Buy Price (₹ per share)
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(Number(e.target.value))}
                style={{
                  width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Sell Price (₹ per share)
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                style={{
                  width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Quantity (Kitta)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                style={{
                  width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Brokerage Rate (%)
              </label>
              <select
                value={brokerageRate}
                onChange={(e) => setBrokerageRate(Number(e.target.value))}
                style={{
                  width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
                }}
              >
                <option value={0.27}>Above ₹30L - 0.27%</option>
                <option value={0.30}>₹20L-30L - 0.30%</option>
                <option value={0.34}>₹7L-20L - 0.34%</option>
                <option value={0.37}>₹2.5L-7L - 0.37%</option>
                <option value={0.40}>Up to ₹2.5L - 0.40%</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                DP Fee (₹)
              </label>
              <input
                type="number"
                value={dpFee}
                onChange={(e) => setDpFee(Number(e.target.value))}
                style={{
                  width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
                }}
              />
            </div>
          </div>

          {/* Results */}
          <div>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
            }}>
              <div style={{ marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: '.8rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>Net Profit / Loss</div>
                <div style={{
                  fontSize: '2rem', fontWeight: 700,
                  color: isProfit ? '#10b981' : '#ef4444',
                }}>
                  {formatCurrency(Math.abs(netProfit))}
                  <span style={{ fontSize: '1rem', marginLeft: 4 }}>{isProfit ? 'profit' : 'loss'}</span>
                </div>
                <div style={{ fontSize: '.85rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
                  Return: {returnPercentage > 0 ? '+' : ''}{returnPercentage.toFixed(2)}%
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>Total Investment</span>
                  <span style={{ fontWeight: 500 }}>{formatCurrency(investment)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>Gross Profit</span>
                  <span style={{ fontWeight: 500, color: '#10b981' }}>{formatCurrency(grossProfit)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>Total Brokerage</span>
                  <span>{formatCurrency(totalBrokerage)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>SEBON + CDS Fee</span>
                  <span>{formatCurrency(sebonFee + cdsFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>DP Fee</span>
                  <span>{formatCurrency(dpFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--text-tertiary)' }}>Capital Gains Tax (7.5%)</span>
                  <span style={{ color: '#ef4444' }}>{formatCurrency(taxAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}