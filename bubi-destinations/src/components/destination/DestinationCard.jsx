import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * DestinationCard
 *
 * Props:
 *  dest     – destination object from mockData
 *  big      – boolean, renders tall featured card (grid-row 1/3)
 *  tier     – 'budget' | 'mid' | 'luxury' (controls which prices show)
 */
export default function DestinationCard({ dest, big = false, tier = 'mid' }) {
  const [hovered, setHovered] = useState(false);
  const prices = dest.prices?.[tier] || dest.prices?.mid || {};

  const imgHeight = big ? '540px' : '255px';
  const nameSize  = big ? '32px'  : '21px';

  return (
    <Link
      to={`/destination/${dest.slug}`}
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: '8px', display: 'block',
        border: `1px solid ${hovered ? 'rgba(201,98,47,.4)' : 'rgba(255,255,255,.05)'}`,
        transition: 'border-color .3s',
        gridRow: big ? '1 / 3' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={dest.hero_image_url}
        alt={dest.name}
        style={{
          width: '100%', height: imgHeight, objectFit: 'cover', display: 'block',
          transition: 'transform .65s cubic-bezier(.25,.46,.45,.94)',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,22,18,.94) 0%, rgba(26,22,18,.2) 55%, transparent 100%)',
        opacity: hovered ? .85 : 1, transition: 'opacity .3s',
      }} />

      {/* Top-left badges */}
      <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <span style={badge('gold')}>{dest.tag}</span>
        {dest.unesco_heritage && <span style={badge('terra')}>UNESCO</span>}
        {dest.is_featured && big && <span style={badge('terra')}>🔥 Most Visited</span>}
      </div>

      {/* Arrow */}
      <div style={{
        position: 'absolute', top: 20, right: 20,
        width: '36px', height: '36px', borderRadius: '50%',
        border: '1px solid rgba(255,255,255,.25)',
        background: hovered ? '#C9622F' : 'transparent',
        borderColor: hovered ? '#C9622F' : 'rgba(255,255,255,.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'all .3s', color: '#fff', fontSize: '16px',
      }}>→</div>

      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: big ? '28px 26px 22px' : '22px 22px 18px' }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, color: '#FDFAF4', fontSize: nameSize, marginBottom: '6px', lineHeight: 1.1 }}>
          {dest.name}
        </div>
        <div style={{ fontSize: '13px', color: '#C4B89A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          📍 {dest.province}
        </div>

        {/* Inline cost strip */}
        <div style={{ display: 'flex', gap: '18px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,.1)', flexWrap: 'wrap' }}>
          <CostPill label="Hotel from" value={`$${prices.hotel?.split('–')[0]}/night`} />
          <CostPill label="Activities" value={`from $${prices.activities?.split('–')[0]}`} />
          <CostPill label="Best" value={dest.best_months?.slice(0,3).join(', ')} />
        </div>
      </div>

      {/* Hover strip — slides up */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(26,22,18,.97)',
        borderTop: '1px solid rgba(212,168,67,.2)',
        padding: '16px 20px',
        transform: hovered ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .35s cubic-bezier(.25,.46,.45,.94)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <HoverCost label="Hotel/night"  value={`$${prices.hotel}`} />
            <HoverCost label="Meals/day"    value={`$${prices.meals}`} />
            <HoverCost label="Activities"   value={`$${prices.activities}`} />
          </div>
          <div style={{
            background: '#C9622F', color: '#fff', padding: '10px 18px', borderRadius: '3px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
            fontFamily: "'Outfit',sans-serif", whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            Explore →
          </div>
        </div>
      </div>
    </Link>
  );
}

function CostPill({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif" }}>{label}</div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F0C96A', fontFamily: "'Outfit',sans-serif" }}>{value}</div>
    </div>
  );
}

function HoverCost({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 700, color: '#D4A843', display: 'block' }}>{value}</div>
      <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif" }}>{label}</div>
    </div>
  );
}

// badge helper
function badge(type) {
  const map = {
    gold:  { bg: 'rgba(212,168,67,.12)', color: '#F0C96A', border: 'rgba(212,168,67,.3)' },
    terra: { bg: 'rgba(201,98,47,.15)',  color: '#E07D50', border: 'rgba(201,98,47,.3)'  },
    green: { bg: 'rgba(39,174,96,.15)',  color: '#6FCF97', border: 'rgba(39,174,96,.3)'  },
  };
  const t = map[type] || map.gold;
  return {
    display: 'inline-block', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
    padding: '4px 10px', borderRadius: '2px', fontWeight: 600, fontFamily: "'Outfit',sans-serif",
    background: t.bg, color: t.color, border: `1px solid ${t.border}`,
  };
}
