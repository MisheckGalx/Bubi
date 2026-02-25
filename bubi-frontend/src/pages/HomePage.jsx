import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { getDestinations, getAlerts, getActivities } from '../services/api';

// ── HERO ───────────────────────────────────────────────────
function Hero({ destinations = [] }) {
  const [where, setWhere] = useState('');
  const [budget, setBudget] = useState('mid');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (where) params.set('dest', where);
    params.set('budget', budget);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <section style={{ position:'relative', height:'100vh', minHeight:'680px', display:'flex', alignItems:'flex-end' }}>
      {/* BG */}
      <div style={{
        position:'absolute', inset:0,
        background:`linear-gradient(to top, #1A1612 0%, rgba(26,22,18,0.5) 45%, rgba(26,22,18,0.15) 100%),
                    linear-gradient(135deg, rgba(140,58,21,0.25) 0%, transparent 55%),
                    url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&q=85&fit=crop') center/cover no-repeat`,
      }} />

      {/* Content */}
      <div style={{ position:'relative', zIndex:2, padding:'0 80px 90px', width:'100%' }}>
        <div style={{ marginBottom:'16px', animation:'fadeUp 0.8s 0.2s both' }}>
          <span className="eyebrow" style={{ color:'#D4A843' }}>Zimbabwe Tourism Intelligence</span>
        </div>

        <h1 style={{
          fontFamily:"'Playfair Display', serif", fontWeight:900, lineHeight:1.0,
          fontSize:'clamp(52px, 7.5vw, 100px)', color:'#FDFAF4', marginBottom:'28px',
          animation:'fadeUp 0.8s 0.35s both', letterSpacing:'-1px',
        }}>
          Discover <em style={{ fontStyle:'italic', color:'#E07D50' }}>Zimbabwe</em><br />
          Your Adventure<br />Starts Here
        </h1>

        <p style={{
          fontSize:'18px', fontWeight:300, color:'#C4B89A', maxWidth:'500px',
          lineHeight:1.65, marginBottom:'44px', animation:'fadeUp 0.8s 0.5s both',
        }}>
          Clear pricing. Real experiences. Structured planning.<br />
          One platform — zero guesswork.
        </p>

        {/* Search bar */}
        <div style={{
          display:'flex', gap:'0', background:'rgba(253,250,244,0.96)', borderRadius:'4px',
          overflow:'hidden', maxWidth:'680px', boxShadow:'0 16px 48px rgba(0,0,0,0.4)',
          animation:'fadeUp 0.8s 0.65s both',
        }}>
          <div style={{ flex:'1.2', borderRight:'1px solid #EAE0C8' }}>
            <select value={where} onChange={e=>setWhere(e.target.value)} style={{
              width:'100%', height:'58px', border:'none', outline:'none', padding:'0 20px',
              fontSize:'15px', color:where?'#1A1612':'#8C7B6B', background:'transparent',
              fontFamily:"'Outfit',sans-serif", cursor:'pointer',
            }}>
              <option value="">Where to?</option>
              {destinations.map(d=><option key={d.id} value={d.slug}>{d.name}</option>)}
            </select>
          </div>
          <div style={{ flex:'1', borderRight:'1px solid #EAE0C8' }}>
            <select value={budget} onChange={e=>setBudget(e.target.value)} style={{
              width:'100%', height:'58px', border:'none', outline:'none', padding:'0 20px',
              fontSize:'15px', color:'#1A1612', background:'transparent',
              fontFamily:"'Outfit',sans-serif", cursor:'pointer',
            }}>
              <option value="budget">🎒 Budget</option>
              <option value="mid">✈️ Mid-Range</option>
              <option value="luxury">🌟 Luxury</option>
            </select>
          </div>
          <button onClick={handleSearch} style={{
            background:'#2E86AB', color:'#fff', border:'none', padding:'0 32px',
            fontSize:'14px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase',
            cursor:'pointer', fontFamily:"'Outfit',sans-serif", transition:'background 0.2s',
          }}
            onMouseEnter={e=>e.target.style.background='#3498DB'}
            onMouseLeave={e=>e.target.style.background='#2E86AB'}
          >
            Search
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:'absolute', right:'48px', bottom:'60px', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', animation:'fadeUp 1s 1.2s both' }}>
        <div style={{ width:'1px', height:'50px', background:'linear-gradient(to bottom, #8C7B6B, transparent)', animation:'scrollPulse 2s infinite' }} />
        <span style={{ fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#8C7B6B', writingMode:'vertical-rl' }}>Scroll</span>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scrollPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>
    </section>
  );
}

// ── STATS BAR ──────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { num: '12+', label: 'Destinations' },
    { num: '80+', label: 'Activities' },
    { num: '200+', label: 'Vetted Providers' },
    { num: '$0', label: 'Booking Fees' },
  ];
  return (
    <div style={{ background:'#1E2E1A', borderBottom:'1px solid rgba(212,168,67,0.1)', display:'flex', justifyContent:'center' }}>
      <div style={{ display:'flex', width:'100%', maxWidth:'1280px' }}>
        {stats.map((s,i) => (
          <div key={i} style={{ flex:1, padding:'28px 40px', borderRight: i<stats.length-1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'34px', fontWeight:700, color:'#D4A843' }}>{s.num}</div>
            <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'#8C7B6B', marginTop:'4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DESTINATION GRID ───────────────────────────────────────
function DestinationGrid({ destinations = [] }) {
  const ref = useReveal(0.1);
  const featured = destinations.filter(d => d.is_featured);
  const rest = destinations.filter(d => !d.is_featured);

  return (
    <section className="section" style={{ background:'#1A1612' }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'52px' }}>
          <div>
            <div className="eyebrow">Where to Go</div>
            <h2 className="section-title">Iconic <em>Destinations</em></h2>
          </div>
          <Link to="/explore" className="btn btn-ghost">View All →</Link>
        </div>

        {/* Masonry-style grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1.55fr 1fr 1fr', gridTemplateRows:'auto auto', gap:'14px' }}>
          {/* Big card */}
          {featured[0] && <DestCard dest={featured[0]} big style={{ gridRow:'1/3' }} imgH="540px" />}
          {featured[1] && <DestCard dest={featured[1]} imgH="255px" />}
          {featured[2] && <DestCard dest={featured[2]} imgH="255px" />}
          {rest[0]     && <DestCard dest={rest[0]} imgH="255px" />}
          {rest[1]     && <DestCard dest={rest[1]} imgH="255px" />}
        </div>
      </div>
    </section>
  );
}

function DestCard({ dest, big, imgH = '255px', style: extraStyle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={`/destination/${dest.slug}`}
      style={{ position:'relative', overflow:'hidden', borderRadius:'4px', display:'block', ...extraStyle }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
    >
      <img src={dest.hero_image_url} alt={dest.name}
        style={{ width:'100%', height:imgH, objectFit:'cover', transition:'transform 0.65s cubic-bezier(.25,.46,.45,.94)', transform:hovered?'scale(1.06)':'scale(1)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(26,22,18,0.92) 0%, rgba(26,22,18,0.15) 55%, transparent 100%)' }} />

      {/* Arrow */}
      <div style={{ position:'absolute', top:20, right:20, width:'34px', height:'34px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.25)', background: hovered?'#C9622F':'rgba(0,0,0,0)', display:'flex', alignItems:'center', justifyContent:'center', opacity:hovered?1:0, transition:'all 0.3s', color:'#fff', fontSize:'14px' }}>→</div>

      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'24px 24px 20px' }}>
        <span className="badge badge-gold" style={{ marginBottom:'10px', display:'inline-block' }}>{dest.tag}</span>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize: big?'30px':'21px', fontWeight:700, color:'#FDFAF4', marginBottom:'6px' }}>{dest.name}</div>
        <div style={{ fontSize:'13px', color:'#C4B89A', display:'flex', alignItems:'center', gap:'6px' }}>
          📍 {dest.province}
        </div>
      </div>
    </Link>
  );
}

// ── DESTINATION INFO PANEL (like mockup) ────────────────────
function DestinationPanel({ destinations = [], activities = [] }) {
  const [activeDest, setActiveDest] = useState(null);
  useEffect(() => { if (destinations.length > 0) setActiveDest(destinations[2] || destinations[0]); }, [destinations]);
  const ref = useReveal(0.1);
  if (!activeDest) return null;
  const destActivities = activities.filter(a => a.destination_id === activeDest.id).slice(0,3);
  const prices = activeDest.prices.mid;

  return (
    <section className="section" style={{ background:`linear-gradient(to bottom, rgba(26,22,18,0.97), rgba(30,46,26,0.97)), url('${activeDest.hero_image_url}') center/cover`, padding:'80px 64px' }}>
      <div className="container">
        {/* Destination tabs */}
        <div ref={ref} className="reveal" style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' }}>
          {destinations.map(d => (
            <button key={d.id} onClick={()=>setActiveDest(d)} style={{
              padding:'9px 18px', borderRadius:'20px', border:'1px solid',
              borderColor: activeDest.id===d.id ? '#D4A843' : 'rgba(255,255,255,0.15)',
              background: activeDest.id===d.id ? 'rgba(212,168,67,0.15)' : 'transparent',
              color: activeDest.id===d.id ? '#D4A843' : '#C4B89A',
              fontSize:'13px', fontFamily:"'Outfit',sans-serif", cursor:'pointer', transition:'all 0.2s',
            }}>
              {d.name}
            </button>
          ))}
        </div>

        {/* Destination name */}
        <div className="reveal" style={{ marginBottom:'28px' }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,4vw,44px)', fontWeight:700, color:'#FDFAF4' }}>
            Explore {activeDest.name}
          </h2>
          <p style={{ color:'#C4B89A', fontSize:'14px', marginTop:'4px' }}>📍 {activeDest.province}, Zimbabwe</p>
        </div>

        {/* 3-column panel */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr 1.1fr', gap:'20px', background:'rgba(253,250,244,0.96)', borderRadius:'8px', padding:'28px', color:'#1A1612' }}>
          {/* Col 1: Costs */}
          <div style={{ borderRight:'1px solid #EAE0C8', paddingRight:'24px' }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:700, marginBottom:'20px', color:'#1E2E1A' }}>Average Stay Cost</h3>
            {[
              { icon:'🏨', label:'Hotels', val:`$${prices.hotel}/night` },
              { icon:'🍽️', label:'Meals', val:`$${prices.meals}/day` },
              { icon:'🦁', label:'Activities', val:`$${prices.activities}` },
            ].map(row => (
              <div key={row.label} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
                <span style={{ fontSize:'22px' }}>{row.icon}</span>
                <div>
                  <div style={{ fontSize:'13px', color:'#8C7B6B' }}>{row.label}</div>
                  <div style={{ fontSize:'15px', fontWeight:600, color:'#1A1612' }}>{row.val}</div>
                </div>
              </div>
            ))}
            <img src={activeDest.hero_image_url} alt="" style={{ width:'100%', height:'110px', objectFit:'cover', borderRadius:'4px', marginTop:'12px' }} />
          </div>

          {/* Col 2: Activities */}
          <div style={{ borderRight:'1px solid #EAE0C8', padding:'0 24px' }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:700, marginBottom:'20px', color:'#1E2E1A' }}>Top Activities</h3>
            {destActivities.length > 0 ? destActivities.map(a => (
              <div key={a.id} style={{ marginBottom:'12px', borderRadius:'4px', overflow:'hidden', position:'relative' }}>
                <img src={a.image_url} alt={a.name} style={{ width:'100%', height:'80px', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.6), transparent)', display:'flex', alignItems:'center', paddingLeft:'12px' }}>
                  <span style={{ color:'#fff', fontSize:'13px', fontWeight:600 }}>{a.name}</span>
                </div>
              </div>
            )) : <p style={{ color:'#8C7B6B', fontSize:'14px' }}>No activities listed yet.</p>}
            <Link to="/activities" style={{ fontSize:'12px', color:'#2E86AB', letterSpacing:'1px', textTransform:'uppercase', marginTop:'4px', display:'inline-block' }}>See all →</Link>
          </div>

          {/* Col 3: Accommodations */}
          <div style={{ paddingLeft:'24px' }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:700, marginBottom:'20px', color:'#1E2E1A' }}>Where to Stay</h3>
            {activeDest && [
              { name:'Kariba Safari Lodge', price:'$120', img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&q=70' },
              { name:'Lakeview Houseboat', price:'$500', img: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?w=300&q=70' },
            ].map(acc => (
              <div key={acc.name} style={{ marginBottom:'12px', borderRadius:'4px', overflow:'hidden', position:'relative' }}>
                <img src={acc.img} alt={acc.name} style={{ width:'100%', height:'90px', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'10px 12px' }}>
                  <span style={{ color:'#fff', fontSize:'12px', fontWeight:600 }}>{acc.name}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'4px' }}>
                    <span style={{ color:'#C4B89A', fontSize:'11px' }}>from {acc.price} / night</span>
                    <button style={{ background:'#27AE60', color:'#fff', border:'none', padding:'3px 8px', borderRadius:'2px', fontSize:'10px', fontWeight:600, cursor:'pointer' }}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PLAN YOUR TRIP CARDS ────────────────────────────────────
function PlanCards() {
  const ref = useReveal(0.1);
  const cards = [
    { icon:'🗺️', title:'Create Your Itinerary', desc:'Customized travel plans', bg:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=60', to:'/planner', btnColor:'#C9622F' },
    { icon:'💰', title:'Budget Calculator', desc:'Estimate your trip costs', bg:'https://images.unsplash.com/photo-1455218873509-8097305ee378?w=500&q=60', to:'/planner', btnColor:'#2E86AB' },
    { icon:'📰', title:'Local Tips & News', desc:'Latest updates & safety info', bg:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=60', to:'/explore', btnColor:'#27AE60' },
  ];
  return (
    <section className="section" style={{ background:'#1A1612' }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom:'40px' }}>
          <h2 className="section-title">Plan Your <em>Trip</em></h2>
        </div>
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
          {cards.map(card => (
            <div key={card.title} style={{ borderRadius:'6px', overflow:'hidden', position:'relative', minHeight:'220px', border:'1px solid rgba(255,255,255,0.07)' }}>
              <img src={card.bg} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.4) saturate(0.7)' }} />
              <div style={{ position:'relative', zIndex:1, padding:'28px 24px 24px', display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between' }}>
                <div>
                  <span style={{ fontSize:'28px', marginBottom:'12px', display:'block' }}>{card.icon}</span>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:700, color:'#FDFAF4', marginBottom:'6px' }}>{card.title}</h3>
                  <p style={{ fontSize:'14px', color:'#C4B89A' }}>{card.desc}</p>
                </div>
                <Link to={card.to} style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:card.btnColor, color:'#fff', padding:'10px 20px', borderRadius:'3px', fontSize:'12px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', marginTop:'20px', width:'fit-content' }}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TRAVEL ALERTS ───────────────────────────────────────────
function TravelAlerts({ travelAlerts = [] }) {
  const ref = useReveal(0.1);
  const alertColors = { info:'#2E86AB', warning:'#E67E22', danger:'#C0392B' };
  return (
    <section style={{ background:'#111009', padding:'64px' }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom:'32px' }}>
          <h2 className="section-title">Traveller <em>Updates</em></h2>
        </div>
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'16px' }}>
          {travelAlerts.map(alert => (
            <div key={alert.id} style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${alertColors[alert.severity]}40`, borderRadius:'6px', overflow:'hidden', display:'flex', minHeight:'160px' }}>
              <div style={{ width:'5px', background:alertColors[alert.severity], flexShrink:0 }} />
              <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'16px', padding:'24px', alignItems:'start', flex:1 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                    <span style={{ fontSize:'24px' }}>{alert.icon}</span>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'18px', fontWeight:700, color:'#FDFAF4' }}>{alert.title}</h3>
                  </div>
                  <p style={{ fontSize:'14px', color:'#C4B89A', lineHeight:1.6 }}>{alert.body}</p>
                </div>
                <button style={{ background: alertColors[alert.severity], color:'#fff', border:'none', padding:'9px 18px', borderRadius:'3px', fontSize:'11px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', cursor:'pointer', whiteSpace:'nowrap', alignSelf:'flex-end', fontFamily:"'Outfit',sans-serif" }}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{
      background:'linear-gradient(135deg, #8C3A15 0%, #C9622F 45%, #E07D50 100%)',
      padding:'120px 64px', textAlign:'center', position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, background:"url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=50') center/cover", opacity:0.08 }} />
      <div style={{ position:'relative', zIndex:1 }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(40px,6vw,76px)', fontWeight:900, color:'#FDFAF4', marginBottom:'20px', lineHeight:1.05 }}>
          Zimbabwe Is Waiting.<br /><em>Are You Ready?</em>
        </h2>
        <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.8)', maxWidth:'460px', margin:'0 auto 40px', lineHeight:1.65, fontWeight:300 }}>
          Plan your perfect adventure with honest prices and real experiences.
        </p>
        <Link to="/planner" className="btn" style={{ background:'#FDFAF4', color:'#8C3A15', fontSize:'13px', padding:'16px 40px', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
          Start Planning Free →
        </Link>
      </div>
    </section>
  );
}

// ── PAGE ────────────────────────────────────────────────────
export default function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [travelAlerts, setTravelAlerts] = useState([]);

  useEffect(() => {
    getDestinations().then(setDestinations).catch(() => {});
    getActivities().then(setActivities).catch(() => {});
    getAlerts().then(setTravelAlerts).catch(() => {});
  }, []);

  return (
    <>
      <Hero destinations={destinations} />
      <StatsBar />
      <DestinationGrid destinations={destinations} />
      <DestinationPanel destinations={destinations} activities={activities} />
      <PlanCards />
      <TravelAlerts travelAlerts={travelAlerts} />
      <CTA />
    </>
  );
}
