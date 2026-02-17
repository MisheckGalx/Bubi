import { Link } from 'react-router-dom';

const S = {
  footer: { background: '#111009', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '72px 64px 40px' },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '56px' },
  logo: { fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 900, color: '#FDFAF4', marginBottom: '16px' },
  logoDot: { color: '#C9622F' },
  desc: { fontSize: '14px', fontWeight: 300, color: '#8C7B6B', lineHeight: 1.7, marginBottom: '24px', maxWidth: '280px' },
  colTitle: { fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C4B89A', marginBottom: '18px', fontWeight: 600 },
  linkList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' },
  link: { fontSize: '14px', color: '#8C7B6B', transition: 'color 0.2s' },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)' },
  copy: { fontSize: '13px', color: '#8C7B6B' },
  copySpan: { color: '#E07D50' },
  badge: { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C7B6B', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '6px 14px', borderRadius: '3px' },
  socials: { display: 'flex', gap: '10px', marginTop: '4px' },
  socialBtn: { width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#8C7B6B', transition: 'all 0.2s', cursor: 'pointer' },
};

export default function Footer() {
  return (
    <footer style={S.footer}>
      <div style={S.grid}>
        <div>
          <div style={S.logo}>Bubi<span style={S.logoDot}>.</span>com</div>
          <p style={S.desc}>Zimbabwe's premier tourism intelligence platform. Clear prices. Real experiences. Confident planning.</p>
          <div style={S.socials}>
            {['𝕏','in','📷','▶'].map(s => (
              <div key={s} style={S.socialBtn}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#C9622F'; e.currentTarget.style.color='#E07D50'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#8C7B6B'; }}
              >{s}</div>
            ))}
          </div>
        </div>

        <div>
          <div style={S.colTitle}>Destinations</div>
          <ul style={S.linkList}>
            {['Victoria Falls','Hwange National Park','Lake Kariba','Great Zimbabwe','Eastern Highlands'].map(d => (
              <li key={d}><Link to="/explore" style={S.link}
                onMouseEnter={e => e.target.style.color='#E07D50'}
                onMouseLeave={e => e.target.style.color='#8C7B6B'}
              >{d}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div style={S.colTitle}>Plan</div>
          <ul style={S.linkList}>
            {[['Trip Planner','/planner'],['Cost Calculator','/planner'],['Activity Finder','/activities'],['Accommodations','/explore'],['Interactive Map','/explore']].map(([label, to]) => (
              <li key={label}><Link to={to} style={S.link}
                onMouseEnter={e => e.target.style.color='#E07D50'}
                onMouseLeave={e => e.target.style.color='#8C7B6B'}
              >{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div style={S.colTitle}>Company</div>
          <ul style={S.linkList}>
            {['About Bubi','List Your Business','Affiliate Program','Contact Us','Privacy Policy'].map(l => (
              <li key={l}><a href="#" style={S.link}
                onMouseEnter={e => e.target.style.color='#E07D50'}
                onMouseLeave={e => e.target.style.color='#8C7B6B'}
              >{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div style={S.bottom}>
        <p style={S.copy}>© 2025 <span style={S.copySpan}>Bubi.com</span> — Zimbabwe Tourism Intelligence</p>
        <div style={S.badge}>Made with ♥ for Zimbabwe 🇿🇼</div>
      </div>
    </footer>
  );
}
