import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { destinations, activities, accommodations } from '../data/mockData';
import { useReveal } from '../hooks/useReveal';
import CostWidget from '../components/destination/CostWidget';

const TABS = ['Overview', 'Activities', 'Where to Stay', 'Full Cost Breakdown'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function DestinationPage() {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const [tab, setTab]      = useState('Overview');
  const [widgetDest, setWidgetDest] = useState(slug);

  const dest    = destinations.find(d => d.slug === slug);
  const destActs = activities.filter(a => a.destination_id === dest?.id);
  const destAcc  = accommodations.filter(a => a.destination_id === dest?.id);

  const heroRef   = useReveal(0.05);

  if (!dest) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1A1612', paddingTop: '68px' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌍</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '36px', color: '#FDFAF4', marginBottom: '12px' }}>Destination Not Found</h2>
      <Link to="/explore" style={{ color: '#E07D50', fontSize: '14px' }}>← Back to all destinations</Link>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#1A1612' }}>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative', height: '75vh', minHeight: '520px',
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, rgba(26,22,18,1) 0%, rgba(26,22,18,.5) 40%, rgba(26,22,18,.12) 100%),
                       url('${dest.hero_image_url}') center/cover`,
        }} />

        <div ref={heroRef} className="reveal visible" style={{ position: 'relative', zIndex: 2, padding: '0 64px 52px', width: '100%' }}>
          {/* Breadcrumb */}
          <button onClick={() => navigate('/explore')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: '#D4A843', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif",
            marginBottom: '20px', padding: 0, transition: 'color .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#F0C96A'}
            onMouseLeave={e => e.currentTarget.style.color = '#D4A843'}
          >
            ← All Destinations
          </button>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Badge type="gold">{dest.tag}</Badge>
            {dest.unesco_heritage && <Badge type="terra">UNESCO Heritage</Badge>}
            {dest.is_featured && <Badge type="terra">🔥 Most Visited</Badge>}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, lineHeight: 1.0,
            fontSize: 'clamp(48px, 6.5vw, 88px)', color: '#FDFAF4', marginBottom: '12px',
          }}>
            {dest.name}
          </h1>

          <div style={{ fontSize: '15px', color: '#C4B89A', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <span>📍 {dest.province}, Zimbabwe</span>
            <span style={{ color: '#4A6741' }}>·</span>
            <span>🌤️ Best: {dest.best_months?.slice(0, 3).join(', ')}</span>
            {dest.unesco_heritage && <><span style={{ color: '#4A6741' }}>·</span><span>🏛️ UNESCO World Heritage</span></>}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to={`/planner?dest=${dest.slug}`} style={btnStyle('primary')}>
              Plan a Trip Here
            </Link>
            <a href={`https://wa.me/?text=I want to visit ${dest.name} Zimbabwe`} target="_blank" rel="noreferrer"
              style={btnStyle('whatsapp')}>
              💬 WhatsApp Enquiry
            </a>
            <Link to="/explore" style={btnStyle('ghost')}>
              🗺️ View on Map
            </Link>
          </div>
        </div>
      </div>

      {/* ── STICKY TABS ── */}
      <div style={{ background: '#1E2E1A', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '0 64px', position: 'sticky', top: '68px', zIndex: 90 }}>
        <div style={{ display: 'flex' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '17px 22px', border: 'none', background: 'transparent',
              color: tab === t ? '#D4A843' : '#8C7B6B',
              borderBottom: `2px solid ${tab === t ? '#D4A843' : 'transparent'}`,
              fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: "'Outfit',sans-serif", cursor: 'pointer', transition: 'color .2s',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* ── BODY: 2-col layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '64px', padding: '56px 64px 80px', maxWidth: '1280px', margin: '0 auto', alignItems: 'start' }}>

        {/* ── LEFT CONTENT ── */}
        <div>

          {/* OVERVIEW */}
          {tab === 'Overview' && (
            <div>
              <p style={{ fontSize: '17px', fontWeight: 300, color: '#C4B89A', lineHeight: 1.85, marginBottom: '48px' }}>
                {dest.description}
              </p>

              {/* Info boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '48px' }}>
                <InfoBox icon="📅" title="Best Time to Visit" body={`${dest.best_months?.join(', ')} offer the best conditions.`} delay={0} />
                <InfoBox icon="🛡️" title="Safety Notes"        body={dest.safety_notes} delay={80} />
                <InfoBox icon="💡" title="Travel Tip"          body={dest.travel_tips}  delay={140} />
                <InfoBox icon="✈️" title="Getting There"       body="Daily flights from Harare. KAZA UniVisa covers Zimbabwe & Zambia." delay={200} />
              </div>

              {/* Best months */}
              <SectionLabel>Best Months to Visit</SectionLabel>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {MONTHS.map((m, i) => {
                  const isPeak = dest.best_months?.includes(m);
                  return (
                    <span key={m} style={{
                      padding: '7px 14px', borderRadius: '16px', fontSize: '12px',
                      fontFamily: "'Outfit',sans-serif", transition: 'all .2s',
                      border: '1px solid', cursor: 'default',
                      borderColor: isPeak ? 'rgba(39,174,96,.4)'   : 'rgba(255,255,255,.12)',
                      background:  isPeak ? 'rgba(39,174,96,.12)'  : 'rgba(255,255,255,.04)',
                      color:       isPeak ? '#6FCF97'              : '#8C7B6B',
                      fontWeight:  isPeak ? 600 : 400,
                    }}>{m}</span>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '48px' }}>
                <Legend color="#6FCF97" label="Peak season" />
                <Legend color="rgba(255,255,255,.15)" label="Off-peak" border="rgba(255,255,255,.2)" />
              </div>

              {/* Photo gallery */}
              <SectionLabel>Photo Gallery</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {dest.image_urls?.map((url, i) => (
                  <img key={i} src={url} alt={dest.name}
                    style={{
                      width: '100%', height: i === 0 ? '260px' : '160px',
                      objectFit: 'cover', borderRadius: '4px',
                      gridColumn: i === 0 ? '1 / -1' : undefined,
                      transition: 'transform .4s',
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITIES */}
          {tab === 'Activities' && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '34px', color: '#FDFAF4', marginBottom: '28px' }}>
                Top Activities in <em style={{ fontStyle: 'italic', color: '#E07D50' }}>{dest.name}</em>
              </h2>
              {destActs.length === 0 ? (
                <Empty icon="🎯" msg="No activities listed yet for this destination." />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {destActs.map(act => <ActivityRow key={act.id} act={act} />)}
                </div>
              )}
            </div>
          )}

          {/* WHERE TO STAY */}
          {tab === 'Where to Stay' && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '34px', color: '#FDFAF4', marginBottom: '28px' }}>
                Where to Stay in <em style={{ fontStyle: 'italic', color: '#E07D50' }}>{dest.name}</em>
              </h2>
              {destAcc.length === 0 ? (
                <Empty icon="🏨" msg="No accommodations listed yet." />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {destAcc.map(acc => <AccomRow key={acc.id} acc={acc} />)}
                </div>
              )}
            </div>
          )}

          {/* COST BREAKDOWN */}
          {tab === 'Full Cost Breakdown' && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '34px', color: '#FDFAF4', marginBottom: '8px' }}>Full Cost Breakdown</h2>
              <p style={{ color: '#8C7B6B', fontSize: '14px', marginBottom: '36px' }}>All prices in USD. Updated from real provider data.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['budget','mid','luxury'].map(t => (
                  <CostTierCard key={t} tier={t} prices={dest.prices?.[t]} />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── RIGHT: COST WIDGET ── */}
        <CostWidget destSlug={widgetDest} onSwitch={(slug) => { setWidgetDest(slug); navigate(`/destination/${slug}`); }} />

      </div>
    </div>
  );
}

// ── SUB-COMPONENTS ─────────────────────────────────────────

function Badge({ children, type }) {
  const map = {
    gold:  { bg: 'rgba(212,168,67,.12)', color: '#F0C96A', border: 'rgba(212,168,67,.3)' },
    terra: { bg: 'rgba(201,98,47,.15)',  color: '#E07D50', border: 'rgba(201,98,47,.3)'  },
  };
  const t = map[type] || map.gold;
  return (
    <span style={{ display: 'inline-block', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px', fontWeight: 600, fontFamily: "'Outfit',sans-serif", background: t.bg, color: t.color, border: `1px solid ${t.border}` }}>
      {children}
    </span>
  );
}

function InfoBox({ icon, title, body, delay = 0 }) {
  const ref = useReveal(0.1, delay);
  return (
    <div ref={ref} className="reveal" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '8px', padding: '22px' }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '8px', fontFamily: "'Outfit',sans-serif" }}>{title}</div>
      <p style={{ fontSize: '14px', color: '#C4B89A', lineHeight: 1.65 }}>{body}</p>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '14px', fontFamily: "'Outfit',sans-serif" }}>{children}</div>;
}

function Legend({ color, label, border }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif" }}>
      <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: color, border: border ? `1px solid ${border}` : undefined, display: 'inline-block', flexShrink: 0 }} />
      {label}
    </div>
  );
}

function ActivityRow({ act }) {
  const catColor = { adventure:'terra', wildlife:'green', cultural:'gold', water:'blue', leisure:'green', scenic:'gold', extreme:'terra' };
  const bg = { terra:'rgba(201,98,47,.15)', green:'rgba(39,174,96,.15)', gold:'rgba(212,168,67,.12)', blue:'rgba(46,134,171,.15)' };
  const col = { terra:'#E07D50', green:'#6FCF97', gold:'#F0C96A', blue:'#74C0FC' };
  const c = catColor[act.category] || 'gold';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '8px', padding: '16px', transition: 'border-color .3s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor='rgba(201,98,47,.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,.07)'}
    >
      <img src={act.image_url} alt={act.name} style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} />
      <div>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px', fontWeight: 600, fontFamily: "'Outfit',sans-serif", background: bg[c], color: col[c], border: `1px solid ${col[c]}40` }}>{act.category}</span>
          <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px', fontWeight: 600, fontFamily: "'Outfit',sans-serif", background: 'rgba(201,98,47,.12)', color: '#E07D50', border: '1px solid rgba(201,98,47,.25)' }}>{act.difficulty}</span>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 600, color: '#FDFAF4', marginBottom: '4px' }}>{act.name}</div>
        <div style={{ fontSize: '12px', color: '#8C7B6B', display: 'flex', gap: '14px', fontFamily: "'Outfit',sans-serif" }}>
          <span>⏱ {act.duration_hours}hrs</span>
          {act.whatsapp_number && <span>💬 WhatsApp available</span>}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', fontWeight: 700, color: '#D4A843' }}>${act.price_min}–{act.price_max}</div>
        <div style={{ fontSize: '11px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif", marginBottom: '10px' }}>per person</div>
        <a href={act.booking_url} style={{ display: 'inline-block', background: '#D4A843', color: '#1A1612', padding: '9px 18px', borderRadius: '3px', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif" }}>
          Book Now
        </a>
      </div>
    </div>
  );
}

function AccomRow({ acc }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.03)', transition: 'all .3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,98,47,.3)'; e.currentTarget.style.transform='translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.07)'; e.currentTarget.style.transform='translateY(0)'; }}
    >
      <img src={acc.image_url} alt={acc.name} style={{ width: '180px', height: '140px', objectFit: 'cover' }} />
      <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 600, color: '#FDFAF4' }}>{acc.name}</div>
            <div style={{ color: '#D4A843', fontSize: '13px', letterSpacing: '1px' }}>{'★'.repeat(acc.star_rating || 3)}</div>
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '10px', fontFamily: "'Outfit',sans-serif" }}>{acc.accommodation_type} · {acc.budget_tier?.replace('_',' ')}</div>
          <p style={{ fontSize: '13px', color: '#C4B89A', lineHeight: 1.6 }}>{acc.short_summary}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700, color: '#D4A843' }}>
            ${acc.price_min}–{acc.price_max}<span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '11px', color: '#8C7B6B', fontWeight: 300 }}>/night</span>
          </div>
          <a href={acc.booking_url} style={{ background: '#C9622F', color: '#fff', padding: '9px 18px', borderRadius: '3px', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif' }}>
            Book →
          </a>
        </div>
      </div>
    </div>
  );
}

function CostTierCard({ tier, prices }) {
  const meta = {
    budget: { icon: '🎒', label: 'Budget', desc: 'Hostels · local transport · self-catering', accent: 'rgba(255,255,255,.05)', border: 'rgba(255,255,255,.08)', textColor: '#D4A843' },
    mid:    { icon: '✈️', label: 'Mid-Range', desc: 'Lodges · guided tours · restaurants', accent: 'rgba(201,98,47,.06)', border: 'rgba(201,98,47,.2)', textColor: '#E07D50' },
    luxury: { icon: '🌟', label: 'Luxury', desc: 'Private camps · exclusive access · fine dining', accent: 'rgba(212,168,67,.05)', border: 'rgba(212,168,67,.18)', textColor: '#F0C96A' },
  };
  const m = meta[tier];
  if (!prices) return null;
  return (
    <div style={{ background: m.accent, border: `1px solid ${m.border}`, borderRadius: '8px', padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', color: '#FDFAF4' }}>{m.icon} {m.label} {tier==='mid'&&<span style={{ fontSize:'13px',color:'#E07D50',fontFamily:"'Outfit',sans-serif",fontStyle:'normal',fontWeight:400 }}>Most Popular</span>}</h3>
        <span style={{ fontSize: '12px', color: '#8C7B6B', fontFamily: "'Outfit',sans-serif" }}>{m.desc}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
        {['hotel','meals','activities'].map(k => (
          <div key={k} style={{ background: 'rgba(255,255,255,.05)', borderRadius: '4px', padding: '16px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: '6px', fontFamily: "'Outfit',sans-serif" }}>{k}</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', fontWeight: 700, color: m.textColor }}>${prices[k]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Empty({ icon, msg }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0', color: '#8C7B6B' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <p style={{ fontSize: '16px', fontFamily: "'Outfit',sans-serif" }}>{msg}</p>
    </div>
  );
}

function btnStyle(type) {
  const map = {
    primary:  { background: '#C9622F', color: '#fff', border: 'none' },
    whatsapp: { background: '#25D366', color: '#fff', border: 'none' },
    ghost:    { background: 'transparent', color: '#FDFAF4', border: '1px solid rgba(255,255,255,.2)' },
  };
  const b = map[type] || map.ghost;
  return {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '12px 24px', borderRadius: '3px',
    fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
    fontFamily: "'Outfit',sans-serif", cursor: 'pointer', transition: 'all .2s',
    ...b,
  };
}
