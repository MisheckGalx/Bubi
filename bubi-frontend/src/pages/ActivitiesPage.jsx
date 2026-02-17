import { useState } from 'react';
import { Link } from 'react-router-dom';
import { activities, destinations } from '../data/mockData';
import { useReveal } from '../hooks/useReveal';

const categories = ['All', 'wildlife', 'adventure', 'water', 'cultural', 'leisure', 'scenic', 'extreme'];
const difficulties = ['All', 'easy', 'moderate', 'challenging', 'extreme'];

export default function ActivitiesPage() {
  const [catFilter, setCatFilter] = useState('All');
  const [diffFilter, setDiffFilter] = useState('All');
  const [destFilter, setDestFilter] = useState('All');
  const titleRef = useReveal(0.1);

  const filtered = activities.filter(a => {
    if (catFilter !== 'All' && a.category !== catFilter) return false;
    if (diffFilter !== 'All' && a.difficulty !== diffFilter) return false;
    if (destFilter !== 'All' && a.destination_id !== Number(destFilter)) return false;
    return true;
  });

  const categoryColors = {
    adventure: 'badge-terra', wildlife: 'badge-green', cultural: 'badge-gold',
    water: 'badge-blue', leisure: 'badge-green', scenic: 'badge-gold', extreme: 'badge-terra'
  };

  return (
    <div style={{ paddingTop: '68px', minHeight: '100vh', background: '#1A1612' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(to bottom, rgba(26,22,18,0.92), #1A1612), url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&q=70') center/cover`,
        padding: '80px 64px 56px',
      }}>
        <div className="container" ref={titleRef}>
          <div className="eyebrow reveal visible">Experiences</div>
          <h1 className="section-title reveal visible" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            All <em>Activities</em>
          </h1>
          <p className="section-desc reveal visible">{activities.length} curated activities — real prices, real providers.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#1E2E1A', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '20px 64px', position: 'sticky', top: '68px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Category */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{
                padding: '7px 16px', borderRadius: '20px', border: '1px solid',
                borderColor: catFilter === c ? '#C9622F' : 'rgba(255,255,255,0.15)',
                background: catFilter === c ? 'rgba(201,98,47,0.15)' : 'transparent',
                color: catFilter === c ? '#E07D50' : '#C4B89A',
                fontSize: '12px', fontFamily: "'Outfit',sans-serif", cursor: 'pointer',
                textTransform: 'capitalize', transition: 'all 0.2s',
              }}>{c}</button>
            ))}
          </div>

          {/* Destination select */}
          <select value={destFilter} onChange={e => setDestFilter(e.target.value)} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#C4B89A', padding: '8px 14px', borderRadius: '3px',
            fontSize: '13px', fontFamily: "'Outfit',sans-serif", cursor: 'pointer',
          }}>
            <option value="All">All Destinations</option>
            {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="container" style={{ padding: '48px 64px' }}>
        <p style={{ color: '#8C7B6B', fontSize: '14px', marginBottom: '28px' }}>
          Showing <strong style={{ color: '#FDFAF4' }}>{filtered.length}</strong> activities
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filtered.map(act => {
            const dest = destinations.find(d => d.id === act.destination_id);
            return (
              <div key={act.id} className="card-lift" style={{
                background: '#222018', borderRadius: '6px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img src={act.image_url} alt={act.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,22,18,0.6), transparent 50%)' }} />
                  <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: '6px' }}>
                    <span className={`badge ${categoryColors[act.category] || 'badge-gold'}`}>{act.category}</span>
                    <span className="badge badge-terra">{act.difficulty}</span>
                  </div>
                </div>
                <div style={{ padding: '20px 22px 22px' }}>
                  {dest && (
                    <Link to={`/destination/${dest.slug}`} style={{ fontSize: '11px', color: '#8C7B6B', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                      📍 {dest.name}
                    </Link>
                  )}
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '19px', fontWeight: 700, color: '#FDFAF4', marginBottom: '8px', lineHeight: 1.2 }}>{act.name}</h3>
                  <p style={{ fontSize: '13px', color: '#C4B89A', lineHeight: 1.6, marginBottom: '18px' }}>{act.short_summary}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#8C7B6B', marginBottom: '16px' }}>
                    <span>⏱ {act.duration_hours}hrs</span>
                    {act.whatsapp_number && <span>💬 WhatsApp</span>}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '21px', fontWeight: 700, color: '#D4A843' }}>
                        ${act.price_min}–${act.price_max}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8C7B6B' }}>per person</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {act.whatsapp_number && (
                        <a href={`https://wa.me/${act.whatsapp_number}`} target="_blank" rel="noreferrer"
                          style={{ background: '#25D366', color: '#fff', padding: '9px 12px', borderRadius: '3px', fontSize: '12px', fontWeight: 600 }}>
                          WhatsApp
                        </a>
                      )}
                      <a href={act.booking_url} className="btn btn-primary" style={{ padding: '9px 16px', fontSize: '11px' }}>Book</a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#8C7B6B' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '18px' }}>No activities match your filters.</p>
            <button onClick={() => { setCatFilter('All'); setDiffFilter('All'); setDestFilter('All'); }}
              className="btn btn-ghost" style={{ marginTop: '16px' }}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
