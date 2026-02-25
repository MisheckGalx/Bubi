import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations, activities, accommodations } from '../data/mockData';

export default function DestinationPage() {
  const { slug } = useParams();
  const dest = destinations.find(d => d.slug === slug);
  const [budgetTier, setBudgetTier] = useState('mid');
  const [activeTab, setActiveTab] = useState('overview');

  if (!dest) return (
    <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '100vh', background: '#1A1612' }}>
      <h2 style={{ color: '#FDFAF4', fontFamily: "'Playfair Display',serif", fontSize: '32px' }}>Destination not found</h2>
      <Link to="/explore" style={{ color: '#E07D50', marginTop: '16px', display: 'inline-block' }}>← Back to Explore</Link>
    </div>
  );

  const destActivities = dest.activities || [];
  const destAccomm = dest.accommodations || [];
  const prices = dest.prices[budgetTier];

  const tabs = ['overview', 'activities', 'accommodations', 'costs'];
  const tierMap = { budget: '🎒 Budget', mid: '✈️ Mid-Range', luxury: '🌟 Luxury' };

  return (
    <div style={{ minHeight: '100vh', background: '#1A1612' }}>
      {/* Hero */}
      <div style={{
        height: '70vh', minHeight: '500px', position: 'relative',
        background: `linear-gradient(to bottom, rgba(26,22,18,0.3) 0%, rgba(26,22,18,0.95) 100%), url('${dest.hero_image_url}') center/cover`,
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{ padding: '0 64px 56px', width: '100%' }}>
          <Link to="/explore" style={{ color: '#D4A843', fontSize: '13px', letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            ← All Destinations
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px', display: 'inline-block' }}>{dest.tag}</span>
              {dest.unesco_heritage && <span className="badge badge-terra" style={{ marginBottom: '12px', display: 'inline-block', marginLeft: '8px' }}>UNESCO Heritage</span>}
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, color: '#FDFAF4', lineHeight: 1.0 }}>{dest.name}</h1>
              <p style={{ color: '#C4B89A', fontSize: '16px', marginTop: '10px' }}>📍 {dest.province}, Zimbabwe</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/planner" className="btn btn-primary">Plan a Trip Here</Link>
              <a href={`https://wa.me/?text=I want to visit ${dest.name} Zimbabwe`} target="_blank" rel="noreferrer"
                className="btn btn-ghost">💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#1E2E1A', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 64px', position: 'sticky', top: '68px', zIndex: 90 }}>
        <div className="container" style={{ display: 'flex', gap: '0' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '18px 24px', border: 'none', background: 'transparent',
              color: activeTab === tab ? '#D4A843' : '#8C7B6B',
              borderBottom: activeTab === tab ? '2px solid #D4A843' : '2px solid transparent',
              fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px',
	      fontFamily: "'Outfit',sans-serif", cursor: 'pointer', transition: 'color 0.2s',
	      textTransform: 'capitalize',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '56px 64px' }}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '64px' }}>
            <div>
              <p style={{ fontSize: '17px', color: '#C4B89A', lineHeight: 1.8, marginBottom: '40px' }}>{dest.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <InfoBox icon="📅" title="Best Months" content={dest.best_months.join(', ')} />
                <InfoBox icon="🛡️" title="Safety" content={dest.safety_notes} />
                <InfoBox icon="💡" title="Travel Tip" content={dest.travel_tips} />
                <InfoBox icon="📍" title="Province" content={dest.province} />
              </div>
            </div>
            {/* Sidebar */}
            <div>
              {/* Budget switcher */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '28px', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#FDFAF4', marginBottom: '16px' }}>Estimated Costs</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {Object.entries(tierMap).map(([k, v]) => (
                    <button key={k} onClick={() => setBudgetTier(k)} style={{
                      flex: 1, padding: '8px', border: '1px solid',
                      borderColor: budgetTier === k ? '#D4A843' : 'rgba(255,255,255,0.1)',
                      background: budgetTier === k ? 'rgba(212,168,67,0.12)' : 'transparent',
                      color: budgetTier === k ? '#D4A843' : '#8C7B6B',
                      borderRadius: '3px', fontSize: '11px', cursor: 'pointer', fontFamily: "'Outfit',sans-serif",
                    }}>{v}</button>
                  ))}
                </div>
                {[
                  { icon: '🏨', label: 'Hotel', val: `$${prices.hotel}/night` },
                  { icon: '🍽️', label: 'Meals', val: `$${prices.meals}/day` },
                  { icon: '🦁', label: 'Activities', val: `$${prices.activities}` },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontSize: '14px', color: '#C4B89A' }}>{row.icon} {row.label}</span>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '17px', fontWeight: 700, color: '#D4A843' }}>{row.val}</span>
                  </div>
                ))}
                <Link to="/planner" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px', display: 'flex' }}>
                  Build Full Itinerary →
                </Link>
              </div>

              {/* Image gallery */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {dest.image_urls.slice(0,4).map((url, i) => (
                  <img key={i} src={url} alt="" style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px' }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === 'activities' && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', color: '#FDFAF4', marginBottom: '32px' }}>
              Activities in <em style={{ color: '#E07D50', fontStyle: 'italic' }}>{dest.name}</em>
            </h2>
            {destActivities.length === 0 ? (
              <p style={{ color: '#8C7B6B', fontSize: '16px' }}>No activities listed yet for this destination.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
                {destActivities.map(act => (
                  <ActivityCard key={act.id} act={act} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACCOMMODATIONS TAB */}
        {activeTab === 'accommodations' && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', color: '#FDFAF4', marginBottom: '32px' }}>
              Where to Stay in <em style={{ color: '#E07D50', fontStyle: 'italic' }}>{dest.name}</em>
            </h2>
            {destAccomm.length === 0 ? (
              <p style={{ color: '#8C7B6B', fontSize: '16px' }}>No accommodations listed yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
                {destAccomm.map(acc => <AccomCard key={acc.id} acc={acc} />)}
              </div>
            )}
          </div>
        )}

        {/* COSTS TAB */}
        {activeTab === 'costs' && (
          <div style={{ maxWidth: '700px' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', color: '#FDFAF4', marginBottom: '12px' }}>
              Full Cost Breakdown
            </h2>
            <p style={{ color: '#8C7B6B', marginBottom: '32px' }}>All prices in USD. Ranges based on real provider data.</p>
            {['budget', 'mid', 'luxury'].map(tier => (
              <div key={tier} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '28px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', color: '#FDFAF4' }}>{tierMap[tier]}</h3>
                  <span style={{ fontSize: '12px', color: '#8C7B6B', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {tier === 'budget' ? 'Backpacker / hostel / local transport' : tier === 'mid' ? 'Lodge / guided tours / restaurants' : 'Private camps / exclusive / fine dining'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                  {Object.entries(dest.prices[tier]).map(([k, v]) => (
                    <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '4px', padding: '16px' }}>
                      <div style={{ fontSize: '11px', color: '#8C7B6B', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>{k}</div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: '#D4A843' }}>${v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBox({ icon, title, content }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '20px' }}>
      <div style={{ fontSize: '22px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '8px' }}>{title}</div>
      <p style={{ fontSize: '14px', color: '#C4B89A', lineHeight: 1.6 }}>{content}</p>
    </div>
  );
}

function ActivityCard({ act }) {
  const categoryColors = { adventure: 'badge-terra', wildlife: 'badge-green', cultural: 'badge-gold', water: 'badge-blue', leisure: 'badge-green', scenic: 'badge-gold', extreme: 'badge-terra' };
  return (
    <div className="card-lift" style={{ background: '#2D4426', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
      <img src={act.image_url} alt={act.name} style={{ width: '100%', height: '175px', objectFit: 'cover' }} />
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span className={`badge ${categoryColors[act.category] || 'badge-gold'}`}>{act.category}</span>
          <span className="badge badge-terra">{act.difficulty}</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', fontWeight: 700, color: '#FDFAF4', marginBottom: '8px' }}>{act.name}</h3>
        <p style={{ fontSize: '13px', color: '#C4B89A', lineHeight: 1.6, marginBottom: '16px' }}>{act.short_summary}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: '#D4A843' }}>
              ${act.price_min}–${act.price_max}
            </div>
            <div style={{ fontSize: '11px', color: '#8C7B6B' }}>⏱ {act.duration_hours}hrs</div>
          </div>
          <a href={act.booking_url} className="btn btn-gold" style={{ padding: '9px 18px', fontSize: '11px' }}>Book Now</a>
        </div>
      </div>
    </div>
  );
}

function AccomCard({ acc }) {
  return (
    <div className="card-lift" style={{ background: '#222018', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', display: 'grid', gridTemplateColumns: '200px 1fr' }}>
      <img src={acc.image_url} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '19px', fontWeight: 700, color: '#FDFAF4' }}>{acc.name}</h3>
          <span style={{ color: '#D4A843', fontSize: '14px' }}>{'★'.repeat(acc.star_rating || 3)}</span>
        </div>
        <span className="badge badge-gold" style={{ marginBottom: '10px', display: 'inline-block' }}>{acc.accommodation_type}</span>
        <p style={{ fontSize: '13px', color: '#C4B89A', lineHeight: 1.6, marginBottom: '16px' }}>{acc.short_summary}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: '#D4A843' }}>
            ${acc.price_min}–${acc.price_max}<span style={{ fontSize: '12px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif", fontWeight: 300 }}>/night</span>
          </div>
          <a href={acc.booking_url} className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '11px' }}>Book →</a>
        </div>
      </div>
    </div>
  );
}
