import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '../../data/mockData';

const TIERS = [
  { key: 'budget',  icon: '🎒', label: 'Budget'   },
  { key: 'mid',     icon: '✈️', label: 'Mid-Range' },
  { key: 'luxury',  icon: '🌟', label: 'Luxury'    },
];

const DAYS = [3, 5, 7, 10];

const COST_ROWS = [
  { id: 'hotel',     icon: '🏨', label: 'Accommodation', unit: '/ night', iconBg: 'rgba(201,98,47,.15)',  bar: 65 },
  { id: 'meals',     icon: '🍽️', label: 'Meals',          unit: '/ day',   iconBg: 'rgba(39,174,96,.15)',  bar: 35 },
  { id: 'activities',icon: '🦁', label: 'Activities',     unit: '/ activity', iconBg: 'rgba(212,168,67,.12)', bar: 52 },
  { id: 'transport', icon: '🚌', label: 'Transport',      unit: '/ transfer', iconBg: 'rgba(46,134,171,.15)', bar: 40 },
];

/**
 * CostWidget
 *
 * Props:
 *   destSlug   – current destination slug (controls which prices display)
 *   onSwitch   – callback(slug) when user clicks a different destination
 */
export default function CostWidget({ destSlug, onSwitch }) {
  const [tier, setTier] = useState('mid');
  const [days, setDays] = useState(5);

  const dest    = destinations.find(d => d.slug === destSlug) || destinations[0];
  const prices  = dest?.prices?.[tier] || {};

  // Compute estimated total from raw price strings
  const { totalLow, totalHigh } = useMemo(() => {
    const parse = str => {
      if (!str) return [0, 0];
      const nums = str.replace(/[^0-9–\-]/g, '').split(/–|-/).map(Number).filter(Boolean);
      return nums.length >= 2 ? nums : [nums[0] || 0, nums[0] || 0];
    };
    const [hLo, hHi]  = parse(prices.hotel);
    const [mLo, mHi]  = parse(prices.meals);
    const [aLo, aHi]  = parse(prices.activities);
    // (hotel + meals/day + 1 activity) * days, rough estimate
    return {
      totalLow:  Math.round((hLo + mLo + aLo * 0.6) * days),
      totalHigh: Math.round((hHi + mHi + aHi * 0.6) * days),
    };
  }, [dest, tier, days, prices]);

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in visiting ${dest?.name}, Zimbabwe. Bubi.com says it's around $${totalLow}–$${totalHigh} for ${days} days on a ${tier} budget. Can you help?`
  );

  return (
    <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* ── Destination Switcher ── */}
      <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '8px', padding: '16px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '12px', fontFamily: "'Outfit',sans-serif" }}>
          Switch Destination
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {destinations.map(d => (
            <button key={d.id} onClick={() => onSwitch?.(d.slug)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
              borderRadius: '4px', border: '1px solid',
              borderColor: d.slug === destSlug ? 'rgba(201,98,47,.35)' : 'transparent',
              background: d.slug === destSlug ? 'rgba(201,98,47,.1)' : 'transparent',
              cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all .2s',
            }}
              onMouseEnter={e => { if(d.slug !== destSlug) e.currentTarget.style.background = 'rgba(255,255,255,.04)'; }}
              onMouseLeave={e => { if(d.slug !== destSlug) e.currentTarget.style.background = 'transparent'; }}
            >
              <img src={d.hero_image_url} alt={d.name} style={{ width: '36px', height: '36px', borderRadius: '3px', objectFit: 'cover', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: d.slug === destSlug ? '#E07D50' : '#C4B89A', fontFamily: "'Outfit',sans-serif" }}>{d.name}</div>
                <div style={{ fontSize: '10px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif" }}>{d.tag}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Cost Widget ── */}
      <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '8px', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '22px 24px 0' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700, color: '#FDFAF4', marginBottom: '16px' }}>
            {dest?.name}
          </div>

          {/* Tier tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,.07)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
            {TIERS.map(t => (
              <button key={t.key} onClick={() => setTier(t.key)} style={{
                padding: '10px 6px', textAlign: 'center', border: 'none',
                background: tier === t.key ? '#C9622F' : 'rgba(255,255,255,.03)',
                color: tier === t.key ? '#fff' : '#8C7B6B',
                fontSize: '11px', fontFamily: "'Outfit',sans-serif",
                cursor: 'pointer', transition: 'all .2s', fontWeight: tier === t.key ? 600 : 400,
              }}>
                <span style={{ fontSize: '17px', display: 'block', marginBottom: '3px' }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cost rows */}
        <div style={{ padding: '0 24px 8px' }}>
          {COST_ROWS.map(row => (
            <div key={row.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: row.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                  {row.icon}
                </div>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif", marginBottom: '4px' }}>
                    {row.label}
                  </div>
                  <div style={{ height: '3px', width: '80px', background: 'rgba(255,255,255,.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${row.bar}%`, background: 'linear-gradient(to right, #C9622F, #D4A843)', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 700, color: '#FDFAF4' }}>
                  ${prices[row.id] || '—'}
                </div>
                <div style={{ fontSize: '11px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif" }}>{row.unit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Days estimator */}
        <div style={{ padding: '16px 24px 0' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '10px', fontFamily: "'Outfit',sans-serif" }}>
            Estimate for how many days?
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setDays(d)} style={{
                flex: 1, padding: '10px', border: '1px solid',
                borderColor: days === d ? '#C9622F' : 'rgba(255,255,255,.1)',
                background: days === d ? '#C9622F' : 'transparent',
                color: days === d ? '#fff' : '#C4B89A',
                borderRadius: '3px', fontSize: '13px', cursor: 'pointer',
                fontFamily: "'Outfit',sans-serif", fontWeight: days === d ? 600 : 400,
                transition: 'all .2s',
              }}>{d}</button>
            ))}
          </div>
        </div>

        {/* Total estimate */}
        <div style={{ margin: '0 24px 18px', background: 'rgba(212,168,67,.08)', border: '1px solid rgba(212,168,67,.22)', borderRadius: '4px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4A843', fontFamily: "'Outfit',sans-serif", marginBottom: '4px' }}>Estimated Total</div>
            <div style={{ fontSize: '11px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif" }}>
              {days} days · {tier === 'mid' ? 'mid-range' : tier} · per person
            </div>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 700, color: '#FDFAF4' }}>
            ~${totalLow}–${totalHigh}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to={`/planner?dest=${destSlug}&tier=${tier}&days=${days}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: '#C9622F', color: '#fff', padding: '13px',
            borderRadius: '3px', fontSize: '12px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif",
            transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#E07D50'}
            onMouseLeave={e => e.currentTarget.style.background = '#C9622F'}
          >
            Build Full Itinerary →
          </Link>

          <a href={`https://wa.me/?text=${whatsappMsg}`} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: '#25D366', color: '#fff', padding: '13px',
            borderRadius: '3px', fontSize: '12px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif",
          }}>
            💬 WhatsApp Enquiry
          </a>

          <button onClick={() => {
            const txt = `${dest?.name} — ${days} days (${tier}): ~$${totalLow}–$${totalHigh} | Hotel: $${prices.hotel}/night | Meals: $${prices.meals}/day | Activities: $${prices.activities} | via Bubi.com`;
            navigator.clipboard.writeText(txt);
          }} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,.15)',
            color: '#C4B89A', padding: '11px', borderRadius: '3px',
            fontSize: '11px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase',
            fontFamily: "'Outfit',sans-serif", cursor: 'pointer', transition: 'border-color .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#D4A843'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'}
          >
            📋 Copy Cost Summary
          </button>
        </div>
      </div>
    </div>
  );
}
