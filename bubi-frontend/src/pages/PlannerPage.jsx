import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { destinations, itineraryTemplates, costMultipliers } from '../data/mockData';

const dayOptions = [3, 5, 7, 10, 14];

export default function PlannerPage() {
  const [destSlug, setDestSlug] = useState('victoria-falls');
  const [days, setDays] = useState(5);
  const [tier, setTier] = useState('mid');
  const [generated, setGenerated] = useState(false);

  const dest = destinations.find(d => d.slug === destSlug) || destinations[0];
  const template = itineraryTemplates[destSlug]?.[tier] || itineraryTemplates['victoria-falls']['mid'];
  const mult = costMultipliers[tier];

  const itinerary = useMemo(() => {
    if (!template) return [];
    const base = template;
    const result = [];
    for (let i = 0; i < days; i++) {
      if (base[i]) result.push({ ...base[i], day: i + 1 });
      else result.push({
        day: i + 1,
        title: i % 3 === 0 ? 'Exploration Day' : i % 3 === 1 ? 'Adventure & Activities' : 'Cultural Experience',
        items: ['Guided excursion or self-exploration', 'Lunch at local restaurant', 'Evening relaxation'],
        cost: Math.round(80 * mult.low + Math.random() * 40),
      });
    }
    return result;
  }, [destSlug, days, tier, template]);

  const totalLow = useMemo(() => itinerary.reduce((s, d) => s + (d.cost || 80) * mult.low, 0), [itinerary, mult]);
  const totalHigh = useMemo(() => itinerary.reduce((s, d) => s + (d.cost || 80) * mult.high, 0), [itinerary, mult]);

  const tierLabels = { budget: '🎒 Budget', mid: '✈️ Mid-Range', luxury: '🌟 Luxury' };

  return (
    <div style={{ paddingTop: '68px', minHeight: '100vh', background: '#1A1612' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1E2E1A, #1A1612)', padding: '64px 64px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container">
          <div className="eyebrow">Trip Planner</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(34px,5vw,60px)' }}>
            Build Your <em>Itinerary</em>
          </h1>
          <p className="section-desc">Customise your Zimbabwe adventure — we'll generate a realistic plan with honest cost estimates.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '56px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '48px', alignItems: 'start' }}>

          {/* ── LEFT: FORM ── */}
          <div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '36px' }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', color: '#FDFAF4', marginBottom: '32px' }}>Configure Your Trip</h2>

              {/* Destination */}
              <FormGroup label="Destination">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                  {destinations.map(d => (
                    <button key={d.id} onClick={() => { setDestSlug(d.slug); setGenerated(false); }} style={{
                      padding: '12px 14px', borderRadius: '4px', border: '1px solid',
                      borderColor: destSlug === d.slug ? '#C9622F' : 'rgba(255,255,255,0.1)',
                      background: destSlug === d.slug ? 'rgba(201,98,47,0.12)' : 'rgba(255,255,255,0.03)',
                      color: destSlug === d.slug ? '#E07D50' : '#C4B89A',
                      fontSize: '13px', fontFamily: "'Outfit',sans-serif", cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.2s',
                    }}>
                      {d.name}
                    </button>
                  ))}
                </div>
              </FormGroup>

              {/* Days */}
              <FormGroup label="Number of Days">
                <div style={{ display: 'flex', gap: '8px' }}>
                  {dayOptions.map(d => (
                    <button key={d} onClick={() => { setDays(d); setGenerated(false); }} style={{
                      flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid',
                      borderColor: days === d ? '#C9622F' : 'rgba(255,255,255,0.1)',
                      background: days === d ? 'rgba(201,98,47,0.12)' : 'transparent',
                      color: days === d ? '#E07D50' : '#C4B89A',
                      fontSize: '14px', fontFamily: "'Outfit',sans-serif", cursor: 'pointer',
                      fontWeight: days === d ? 600 : 400, transition: 'all 0.2s',
                    }}>{d}</button>
                  ))}
                </div>
              </FormGroup>

              {/* Budget */}
              <FormGroup label="Budget Level">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
                  {Object.entries(tierLabels).map(([k, v]) => (
                    <button key={k} onClick={() => { setTier(k); setGenerated(false); }} style={{
                      padding: '16px 10px', borderRadius: '4px', border: '1px solid',
                      borderColor: tier === k ? '#D4A843' : 'rgba(255,255,255,0.1)',
                      background: tier === k ? 'rgba(212,168,67,0.1)' : 'transparent',
                      color: tier === k ? '#D4A843' : '#C4B89A',
                      fontSize: '12px', fontFamily: "'Outfit',sans-serif", cursor: 'pointer',
                      transition: 'all 0.2s', textAlign: 'center', lineHeight: 1.4,
                    }}>
                      <div style={{ fontSize: '22px', marginBottom: '6px' }}>{v.split(' ')[0]}</div>
                      <div>{v.split(' ').slice(1).join(' ')}</div>
                      <div style={{ fontSize: '10px', color: '#8C7B6B', marginTop: '4px' }}>{costMultipliers[k].desc.split('/')[0]}</div>
                    </button>
                  ))}
                </div>
              </FormGroup>

              <button
                onClick={() => setGenerated(true)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '15px', marginTop: '8px', fontSize: '13px' }}
              >
                Generate My Itinerary ✨
              </button>
            </div>

            {/* Selected destination preview */}
            <div style={{ marginTop: '20px', borderRadius: '6px', overflow: 'hidden', position: 'relative', height: '180px' }}>
              <img src={dest.hero_image_url} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,22,18,0.85), transparent)', display: 'flex', alignItems: 'center', padding: '24px' }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: '#FDFAF4' }}>{dest.name}</div>
                  <div style={{ fontSize: '13px', color: '#C4B89A', marginTop: '4px' }}>📍 {dest.province}</div>
                  <Link to={`/destination/${dest.slug}`} style={{ color: '#D4A843', fontSize: '12px', marginTop: '8px', display: 'inline-block', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: RESULT ── */}
          <div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', color: '#FDFAF4' }}>
                    {dest.name} — {days} Days
                  </h2>
                  <p style={{ color: '#8C7B6B', fontSize: '13px', marginTop: '4px' }}>{tierLabels[tier]}</p>
                </div>
                {generated && (
                  <span className="badge badge-green" style={{ fontSize: '11px' }}>✓ Generated</span>
                )}
              </div>

              {/* Day by day */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {itinerary.map((day, i) => (
                  <div key={i} style={{
                    borderBottom: i < itinerary.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    padding: '18px 0',
                    opacity: generated ? 1 : 0.5,
                    transition: `opacity 0.4s ${i * 60}ms`,
                  }}>
                    <div style={{ display: 'flex', gap: '14px', marginBottom: '10px' }}>
                      <div style={{
                        width: '30px', height: '30px', borderRadius: '50%', background: '#C9622F',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: 700, flexShrink: 0, color: '#FDFAF4',
                      }}>{day.day}</div>
                      <div style={{ fontWeight: 600, color: '#FDFAF4', fontSize: '15px', paddingTop: '4px' }}>{day.title}</div>
                    </div>
                    <div style={{ marginLeft: '44px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {day.items.map((item, j) => (
                        <div key={j} style={{ fontSize: '13px', color: '#C4B89A', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5 }}>
                          <span style={{ color: '#C9622F', marginTop: '1px', flexShrink: 0 }}>•</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total cost */}
              <div style={{
                marginTop: '24px', background: 'rgba(212,168,67,0.08)',
                border: '1px solid rgba(212,168,67,0.25)', borderRadius: '6px', padding: '20px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#D4A843', marginBottom: '4px' }}>Estimated Total</div>
                  <div style={{ fontSize: '12px', color: '#8C7B6B' }}>{days} days • {tierLabels[tier]} • per person</div>
                </div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 900, color: '#FDFAF4' }}>
                  ~${Math.round(totalLow)}–${Math.round(totalHigh)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => { navigator.clipboard.writeText(`${dest.name} ${days}-day ${tierLabels[tier]} itinerary — ~$${Math.round(totalLow)}–$${Math.round(totalHigh)}`); }}>
                  📋 Copy Summary
                </button>
                <a href={`https://wa.me/?text=Planning ${days} days in ${dest.name} Zimbabwe on a ${tierLabels[tier]} budget — about $${Math.round(totalLow)}–$${Math.round(totalHigh)} via Bubi.com`}
                  target="_blank" rel="noreferrer"
                  style={{ flex: 1, background: '#25D366', color: '#fff', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif" }}>
                  💬 Share via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '12px', fontFamily: "'Outfit',sans-serif" }}>{label}</label>
      {children}
    </div>
  );
}
