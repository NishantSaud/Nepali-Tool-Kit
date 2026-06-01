// frontend/app/gold-silver/page.jsx
'use client';

import { useState } from 'react';
import GoldHistoryChart from '../../components/GoldHistoryChart';

export default function GoldSilverPage() {
  const [activeGoldType, setActiveGoldType] = useState('hallmark');

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <div className="page-header">
        <div className="eyebrow">Tool 03</div>
        <h2>Gold & Silver Rates</h2>
        <p>
          Official prices published by the Federation of Nepal Gold & Silver Dealers (FNGOSDA),
          updated daily at 11:00 AM Nepal Time.
        </p>
      </div>

      {/* Official FNGOSDA Widget - Price Table */}
      <div className="tool-wrap" style={{ padding: '24px' }}>
        <div className="tool-label" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>💎 Official FNGOSDA Rates</span>
          <div className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
            📍 Nepal Market
          </div>
        </div>
        
        <iframe 
          src="https://www.ashesh.com.np/gold/widget.php?api=170166q210&header_color=0d0d0d&body_color=ffffff&text_color=3a3a3a&price_color=c8932a&border_color=eeede9"
          frameBorder="0" 
          scrolling="no" 
          style={{ 
            border: 'none', 
            width: '100%', 
            height: '280px', 
            borderRadius: 'var(--r-md)',
            boxShadow: 'var(--shadow-sm)'
          }}
          allowTransparency="true"
          title="Gold Price in Nepal - Live Updates from FNGOSDA"
        />
        
        <div style={{ 
          marginTop: '12px', 
          fontSize: '0.7rem', 
          textAlign: 'center',
          color: 'var(--ink-4)'
        }}>
          <span>Source: </span>
          <a 
            href="https://www.ashesh.com.np/gold/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--gold)', textDecoration: 'none' }}
          >
            Federation of Nepal Gold & Silver Dealers (FNGOSDA)
          </a>
          <span> · Updated daily at 11:00 AM NPT</span>
        </div>
      </div>

      {/* Historical Charts Section */}
      <div style={{ marginTop: '40px' }}>
        <div className="tool-label" style={{ marginBottom: '24px' }}>
          📈 Historical Price Trends (90 Days)
        </div>
        
        {/* Gold Type Selector */}
        <div style={{ marginBottom: '20px' }}>
          <div className="size-pills">
            <button
              className={`size-pill ${activeGoldType === 'hallmark' ? 'active' : ''}`}
              onClick={() => setActiveGoldType('hallmark')}
            >
              Hallmark Gold (99.9%)
            </button>
            <button
              className={`size-pill ${activeGoldType === 'tajabi' ? 'active' : ''}`}
              onClick={() => setActiveGoldType('tajabi')}
            >
              Tajabi Gold (99.5%)
            </button>
          </div>
        </div>
        
        {/* Gold Chart */}
        <div className="tool-wrap" style={{ padding: '24px', marginBottom: '32px' }}>
          <GoldHistoryChart 
            metal="gold" 
            priceType={activeGoldType}
            days={90} 
          />
        </div>

        {/* Silver Chart */}
        <div className="tool-wrap" style={{ padding: '24px' }}>
          <GoldHistoryChart 
            metal="silver" 
            days={90} 
          />
        </div>
      </div>

      {/* Price Note */}
      <div style={{
        marginTop: 24,
        padding: '16px 20px',
        background: 'var(--gold-light)',
        borderRadius: 'var(--r-md)',
        borderLeft: '4px solid var(--gold)',
      }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', margin: 0 }}>
          <strong>📌 Note:</strong> Nepal's gold prices include import duty (13% GST), 
          dealer margins, and hallmarking charges. International market prices are approximately 
          40-45% lower than Nepal's retail prices.
        </p>
      </div>

      {/* Rest of your content remains the same */}
      <div style={{
        marginTop: 32,
        padding: '20px 24px',
        background: 'var(--surface-2)',
        borderRadius: 'var(--r-lg)',
        borderLeft: '4px solid var(--gold)',
      }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '12px', fontWeight: 600 }}>
          Understanding Gold Rates in Nepal
        </h3>
        <div style={{ display: 'grid', gap: '12px', fontSize: '0.9rem', color: 'var(--ink-2)' }}>
          <p>
            <strong>Why are Nepal's gold prices higher than international rates?</strong><br />
            Nepal imposes import duties, GST (13%), hallmarking charges, and dealer margins 
            on gold, which can add 100-135% to the international base price.
          </p>
          <p>
            <strong>Current price breakdown (approximate):</strong><br />
            • International gold price: ~40%<br />
            • Import duty & GST: ~35%<br />
            • Dealer margins & costs: ~15%<br />
            • Hallmarking & other charges: ~10%
          </p>
        </div>
      </div>
    </div>
  );
}