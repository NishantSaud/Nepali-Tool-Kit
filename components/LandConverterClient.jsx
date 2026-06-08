// frontend/components/LandConverterClient.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function LandConverterClient() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('ropani');
  const [toUnit, setToUnit] = useState('sqft');
  const [result, setResult] = useState(0);
  const [fromFull, setFromFull] = useState({ ropani: 0, aana: 0, paisa: 0, daam: 0 });
  const [toFull, setToFull] = useState({ ropani: 0, aana: 0, paisa: 0, daam: 0 });

  // Conversion factors to square feet
  const toSqft = {
    ropani: 5476,
    aana: 342.25,
    paisa: 85.5625,
    daam: 21.390625,
    sqft: 1,
    sqm: 10.7639,
    hectare: 107639,
    bigha: 72900,
    kattha: 3645,
    dhur: 182.25,
  };

  const units = [
    { id: 'ropani', name: 'Ropani', symbol: 'रोपनी' },
    { id: 'aana', name: 'Aana', symbol: 'आना' },
    { id: 'paisa', name: 'Paisa', symbol: 'पैसा' },
    { id: 'daam', name: 'Daam', symbol: 'दाम' },
    { id: 'sqft', name: 'Square Feet', symbol: 'sq ft' },
    { id: 'sqm', name: 'Square Meter', symbol: 'm²' },
    { id: 'hectare', name: 'Hectare', symbol: 'ha' },
    { id: 'bigha', name: 'Bigha', symbol: 'बिघा' },
    { id: 'kattha', name: 'Kattha', symbol: 'कठ्ठा' },
    { id: 'dhur', name: 'Dhur', symbol: 'धुर' },
  ];

  const formatNumber = useCallback((num) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 4,
      minimumFractionDigits: 2,
    }).format(num);
  }, []);

  const convert = useCallback(() => {
    const sqftValue = value * toSqft[fromUnit];
    const convertedValue = sqftValue / toSqft[toUnit];
    setResult(convertedValue);
  }, [value, fromUnit, toUnit, toSqft]);

  const parseFullUnits = useCallback((valueSqft) => {
    const ropani = Math.floor(valueSqft / 5476);
    let remaining = valueSqft % 5476;
    const aana = Math.floor(remaining / 342.25);
    remaining = remaining % 342.25;
    const paisa = Math.floor(remaining / 85.5625);
    remaining = remaining % 85.5625;
    const daam = Math.round(remaining / 21.390625);
    
    return { ropani, aana, paisa, daam };
  }, []);

  const handleFullUnitChange = useCallback((field, val) => {
    const newFromFull = { ...fromFull, [field]: Math.max(0, parseInt(val) || 0) };
    setFromFull(newFromFull);
    
    const totalSqft = 
      newFromFull.ropani * 5476 +
      newFromFull.aana * 342.25 +
      newFromFull.paisa * 85.5625 +
      newFromFull.daam * 21.390625;
    
    const toFullUnits = parseFullUnits(totalSqft);
    setToFull(toFullUnits);
  }, [fromFull, parseFullUnits]);

  const swapUnits = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }, [fromUnit, toUnit]);

  useEffect(() => {
    convert();
  }, [convert]);

  const getUnitSymbol = (unitId) => {
    const unit = units.find(u => u.id === unitId);
    return unit ? unit.symbol : unitId;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Simple Converter */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 24,
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 20 }}>Quick Conversion</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', fontSize: '.8rem', color: 'var(--text-tertiary)', marginBottom: 6 }}>
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              style={{
                width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '.8rem', color: 'var(--text-tertiary)', marginBottom: 6 }}>
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
              }}
            >
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
            <button
              onClick={swapUnits}
              style={{
                padding: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)', cursor: 'pointer',
              }}
            >
              ↔
            </button>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '.8rem', color: 'var(--text-tertiary)', marginBottom: 6 }}>
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: '.9rem',
              }}
            >
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)',
          padding: 20, textAlign: 'center', marginTop: 24,
        }}>
          <div style={{ fontSize: '.8rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>
            {value} {getUnitSymbol(fromUnit)} =
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {formatNumber(result)} {getUnitSymbol(toUnit)}
          </div>
        </div>
      </div>

      {/* Ropani-Aana-Paisa-Daam Converter */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        padding: 24,
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 20 }}>
          Ropani · Aana · Paisa · Daam Converter
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          <div>
            <div style={{ fontSize: '.85rem', fontWeight: 500, marginBottom: 12 }}>Input (Traditional)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['ropani', 'aana', 'paisa', 'daam'].map((unit) => (
                <div key={unit}>
                  <label style={{ fontSize: '.75rem', color: 'var(--text-tertiary)' }}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </label>
                  <input
                    type="number"
                    value={fromFull[unit]}
                    onChange={(e) => handleFullUnitChange(unit, e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', marginTop: 4,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)', fontSize: '.9rem',
                    }}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '.85rem', fontWeight: 500, marginBottom: 12 }}>Output (Traditional)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['ropani', 'aana', 'paisa', 'daam'].map((unit) => (
                <div key={unit}>
                  <label style={{ fontSize: '.75rem', color: 'var(--text-tertiary)' }}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={toFull[unit]}
                    readOnly
                    style={{
                      width: '100%', padding: '10px 12px', marginTop: 4,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)', fontSize: '.9rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{
          marginTop: 20, padding: 12,
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '.85rem', color: 'var(--text-tertiary)' }}>Total Area: </span>
          <strong>
            {toFull.ropani}.{toFull.aana}{toFull.paisa ? `.${toFull.paisa}` : ''}{toFull.daam ? `.${toFull.daam}` : ''} Ropani
          </strong>
        </div>
      </div>
    </div>
  );
}