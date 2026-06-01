// frontend/components/GoldChartClient.jsx
'use client';
import { useState, useCallback } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const PERIODS = [
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
];

const formatNPR = (v) => '₨' + Math.round(v / 1000) + 'k';
const formatFull = (v) => '₨' + Number(v).toLocaleString('en-IN');
const fmtDate  = (d) => {
  const [, m, day] = d.split('-');
  return `${day}/${m}`;
};

export default function GoldChartClient({ initialHistory }) {
  const [period, setPeriod]   = useState(90);
  const [loading, setLoading] = useState(false);
  const [data, setData]       = useState(initialHistory);

  const switchPeriod = useCallback(async (days) => {
    setPeriod(days);
    if (days === 90) { setData(initialHistory); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/gold?days=${days}`);
      const json = await res.json();
      setData(json.data ?? []);
    } catch {
      // keep current data on failure
    } finally {
      setLoading(false);
    }
  }, [initialHistory]);

  return (
    <div>
      {/* PERIOD SWITCHER */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {PERIODS.map(({ label, days }) => (
          <button
            key={days}
            onClick={() => switchPeriod(days)}
            className={`size-pill${period === days ? ' active' : ''}`}
          >
            {label}
          </button>
        ))}
        {loading && (
          <span style={{ fontSize: '.78rem', color: 'var(--ink4)', alignSelf: 'center', marginLeft: 8 }}>
            Loading…
          </span>
        )}
      </div>

      {/* CHART */}
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#c8932a" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#c8932a" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#717171" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#717171" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,13,13,.05)" />
            <XAxis
              dataKey="rate_date"
              tickFormatter={fmtDate}
              tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: '#a8a8a8' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="gold"
              tickFormatter={formatNPR}
              tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: '#a8a8a8' }}
              tickLine={false}
              axisLine={false}
              width={52}
            />
            <YAxis
              yAxisId="silver"
              orientation="right"
              tickFormatter={(v) => '₨' + v}
              tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: '#a8a8a8' }}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip
              contentStyle={{
                fontFamily: 'DM Sans', fontSize: 12,
                border: '1px solid var(--border)',
                borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,.08)',
              }}
              formatter={(value, name) => [formatFull(value), name]}
              labelFormatter={(l) => `Date: ${l}`}
            />
            <Legend
              wrapperStyle={{ fontFamily: 'DM Sans', fontSize: 12, paddingTop: 12 }}
            />
            <Area
              yAxisId="gold"
              type="monotone"
              dataKey="hallmark_per_tola"
              name="Hallmark Gold (₨/tola)"
              stroke="#c8932a"
              strokeWidth={2}
              fill="url(#goldGrad)"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Area
              yAxisId="silver"
              type="monotone"
              dataKey="silver_per_tola"
              name="Silver (₨/tola)"
              stroke="#717171"
              strokeWidth={1.5}
              fill="url(#silverGrad)"
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
