// frontend/components/QRGeneratorClient.jsx
'use client';
// ─────────────────────────────────────────────────────────────
// Uses qrcode.react — install: npm install qrcode.react
// ─────────────────────────────────────────────────────────────
import { useState, useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const SIZES   = [128, 256, 512, 1024];
const EC_OPTS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];
const TYPE_PREFIXES = { url: '', text: '', tel: 'tel:', email: 'mailto:', sms: 'sms:' };
const TYPE_PLACEHOLDERS = {
  url: 'https://example.com', text: 'Your message here',
  tel: '+977-9800000000', email: 'hello@example.com', sms: '+977-9800000000',
};

export default function QRGeneratorClient() {
  const [raw,     setRaw]     = useState('');
  const [type,    setType]    = useState('url');
  const [size,    setSize]    = useState(256);
  const [ec,      setEc]      = useState('M');
  const [fgColor, setFgColor] = useState('#000000');
  const canvasRef = useRef(null);

  const content = raw.trim()
    ? (TYPE_PREFIXES[type] && !raw.startsWith(TYPE_PREFIXES[type])
        ? TYPE_PREFIXES[type] + raw.trim()
        : raw.trim())
    : '';

  const download = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    if (size <= 256) {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `qr-code-${size}px.png`;
      a.click();
    } else {
      const big = document.createElement('canvas');
      big.width = size; big.height = size;
      big.getContext('2d').drawImage(canvas, 0, 0, size, size);
      const a = document.createElement('a');
      a.href = big.toDataURL('image/png');
      a.download = `qr-code-${size}px.png`;
      a.click();
    }
  }, [size]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>

      {/* ── CONTROLS ── */}
      <div className="tool-wrap">
        {/* Type selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {Object.keys(TYPE_PREFIXES).map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={`size-pill${type === t ? ' active' : ''}`}
              style={{ fontSize: '.8rem', textTransform: 'capitalize' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Text input */}
        <div className="tool-label" style={{ marginBottom: 6 }}>Content</div>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={TYPE_PLACEHOLDERS[type]}
          rows={3}
          style={{ fontSize: '.9rem', resize: 'vertical', minHeight: 80, width: '100%' }}
        />
        {raw && (
          <div style={{ fontSize: '.75rem', color: 'var(--ink4)', marginTop: 4 }}>
            {raw.length} characters
          </div>
        )}

        {/* Size */}
        <div style={{ marginTop: 20 }}>
          <div className="tool-label" style={{ marginBottom: 8 }}>Size (px)</div>
          <div className="size-pills">
            {SIZES.map((s) => (
              <button key={s} className={`size-pill${size === s ? ' active' : ''}`}
                onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>
        </div>

        {/* Options grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
          <div>
            <div className="tool-label" style={{ marginBottom: 6 }}>Error correction</div>
            <select value={ec} onChange={(e) => setEc(e.target.value)}
              style={{ height: 38, fontSize: '.85rem' }}>
              {EC_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <div className="tool-label" style={{ marginBottom: 6 }}>Foreground</div>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
              style={{ height: 38, padding: '2px 4px', cursor: 'pointer' }} />
          </div>
        </div>

        <button onClick={download} disabled={!content}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: 20, height: 46,
            opacity: content ? 1 : 0.4, cursor: content ? 'pointer' : 'default' }}>
          ↓ Download PNG
        </button>
      </div>

      {/* ── PREVIEW ── */}
      <div style={{
        background: 'var(--surf2)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: 24,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 14, minHeight: 260, justifyContent: 'center',
      }}>
        {content ? (
          <>
            <div ref={canvasRef} style={{ background: '#fff', padding: 10, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
              <QRCodeCanvas
                value={content}
                size={Math.min(size, 200)}
                level={ec}
                fgColor={fgColor}
                bgColor="#ffffff"
              />
            </div>
            <div style={{ fontSize: '.75rem', color: 'var(--ink4)', textAlign: 'center', wordBreak: 'break-all', maxWidth: 220 }}>
              {content.length > 50 ? content.slice(0, 50) + '…' : content}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--ink4)' }}>
            <div style={{ fontSize: 2.5+'rem', marginBottom: 10, opacity: .3 }}>◉</div>
            <div style={{ fontSize: '.875rem' }}>Enter content to generate a QR code</div>
          </div>
        )}
      </div>

    </div>
  );
}
