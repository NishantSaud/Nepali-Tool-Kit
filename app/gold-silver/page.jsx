'use client';

import { useState } from 'react';
import GoldHistoryChart from '../../components/GoldHistoryChart';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import Badge from '../../components/ui/Badge';

export default function GoldSilverPage() {
  const [activeGoldType, setActiveGoldType] = useState('hallmark');

  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary">Tool 03</Badge>}
        title="Gold & Silver Rates"
        description="Official prices published by the Federation of Nepal Gold & Silver Dealers (FNGOSDA), updated daily at 11:00 AM Nepal Time."
      />

      {/* Official FNGOSDA Widget - Price Table */}
      <div className="tool-wrap" style={{ padding: '24px' }}>
        <div className="tool-label" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>💎 Official FNGOSDA Rates</span>
          <Badge variant="accent">📍 Nepal Market</Badge>
        </div>
        
        <iframe 
          src="https://www.ashesh.com.np/gold/widget.php?api=170166q210&header_color=0d0d0d&body_color=ffffff&text_color=3a3a3a&price_color=c8932a&border_color=eeede9"
          frameBorder="0" 
          scrolling="no" 
          style={{ 
            border: 'none', 
            width: '100%', 
            height: '280px', 
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}
          allowTransparency="true"
          title="Gold Price in Nepal - Live Updates from FNGOSDA"
        />
        
        <div style={{ 
          marginTop: '12px', 
          fontSize: '0.7rem', 
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          <span>Source: </span>
          <a 
            href="https://www.ashesh.com.np/gold/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
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
        background: 'var(--color-primary-light)',
        borderRadius: 'var(--radius-md)',
        borderLeft: '4px solid var(--color-primary)',
      }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
          <strong>📌 Note:</strong> Nepal&apos;s gold prices include import duty (13% GST), 
          dealer margins, and hallmarking charges. International market prices are approximately 
          40-45% lower than Nepal&apos;s retail prices.
        </p>
      </div>

      {/* Understanding Gold Rates */}
      <div style={{
        marginTop: 32,
        padding: '20px 24px',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-2xl)',
        borderLeft: '4px solid var(--color-primary)',
      }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '12px', fontWeight: 600 }}>
          Understanding Gold Rates in Nepal
        </h3>
        <div style={{ display: 'grid', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p>
            <strong>Why are Nepal&apos;s gold prices higher than international rates?</strong><br />
            Nepal imposes import duties, GST (13%), hallmarking charges, and dealer margins 
            on gold, which can add 100-135% to the international base price.
          </p>
          <p>
            <strong>Current price breakdown (approximate):</strong><br />
            • International gold price: ~40%<br />
            • Import duty &amp; GST: ~35%<br />
            • Dealer margins &amp; costs: ~15%<br />
            • Hallmarking &amp; other charges: ~10%
          </p>
        </div>
      </div>
    </Container>
  );
}
