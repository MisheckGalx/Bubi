import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { destinations } from '../data/mockData';
import { useReveal } from '../hooks/useReveal';

const filters = ['All', 'UNESCO Heritage', 'Big Five Safari', 'Lake Escape', 'Ancient Ruins', 'Mountain Escape'];

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const titleRef = useReveal(0.1);

  const filtered = activeFilter === 'All'
    ? destinations
    : destinations.filter(d => d.tag === activeFilter);

  return (
    <div style={{ paddingTop: '68px', minHeight: '100vh', background: '#1A1612' }}>
      {/* Page Header */}
      <div style={{
        background: `linear-gradient(to bottom, rgba(26,22,18,0.97), rgba(26,22,18,0.85)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=70') center/cover`,
        padding: '80px 64px 64px',
      }}>
        <div className="container" ref={titleRef}>
          <div className="eyebrow reveal visible">Explore Zimbabwe</div>
          <h1 className="section-title reveal visible" style={{ fontSize: 'clamp(36px,5vw,64px)', marginBottom: '16px' }}>
            All <em>Destinations</em>
          </h1>
          <p className="section-desc reveal visible">
            {destinations.length} extraordinary places — each with honest pricing, real photos, and structured travel info.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#1E2E1A', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '20px 64px', position: 'sticky', top: '68px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '9px 20px', borderRadius: '20px', border: '1px solid',
              borderColor: activeFilter === f ? '#D4A843' : 'rgba(255,255,255,0.15)',
              background: activeFilter === f ? 'rgba(212,168,67,0.15)' : 'transparent',
              color: activeFilter === f ? '#D4A843' : '#C4B89A',
              fontSize: '13px', fontFamily: "'Outfit',sans-serif",
              cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeFilter === f ? 600 : 400,
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container" style={{ padding: '56px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filtered.map(dest => (
            <Link key={dest.id} to={`/destination/${dest.slug}`}
              style={{ borderRadius: '6px', overflow: 'hidden', display: 'block', border: '1px solid rgba(255,255,255,0.07)', transition: 'transform 0.3s, border-color 0.3s' }}
              className="card-lift"
              onMouseEnter={() => setHoveredId(dest.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img src={dest.hero_image_url} alt={dest.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hoveredId === dest.id ? 'scale(1.07)' : 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,22,18,0.7) 0%, transparent 60%)' }} />
                <span className="badge badge-gold" style={{ position: 'absolute', top: 16, left: 16 }}>{dest.tag}</span>
                {dest.unesco_heritage && (
                  <span className="badge badge-terra" style={{ position: 'absolute', top: 16, right: 16 }}>UNESCO</span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '24px', background: '#222018' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', fontWeight: 700, color: '#FDFAF4', marginBottom: '6px' }}>{dest.name}</h3>
                <p style={{ fontSize: '12px', color: '#8C7B6B', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {dest.province}</p>
                <p style={{ fontSize: '14px', color: '#C4B89A', lineHeight: 1.6, marginBottom: '20px' }}>{dest.short_summary}</p>

                {/* Price range */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '4px' }}>Mid-Range Hotel</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', fontWeight: 700, color: '#D4A843' }}>
                      ${dest.prices.mid.hotel}<span style={{ fontSize: '12px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif", fontWeight: 300 }}>/night</span>
                    </div>
                  </div>
                  <div style={{
                    background: '#C9622F', color: '#fff', padding: '9px 18px', borderRadius: '3px',
                    fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                    fontFamily: "'Outfit',sans-serif",
                  }}>
                    Explore →
                  </div>
                </div>

                {/* Best months */}
                <div style={{ marginTop: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', color: '#8C7B6B', marginRight: '4px' }}>Best:</span>
                  {dest.best_months.slice(0, 4).map(m => (
                    <span key={m} className="badge badge-green" style={{ fontSize: '10px' }}>{m}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#8C7B6B' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
            <p style={{ fontSize: '18px' }}>No destinations match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
