import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 48px', height: '68px',
    transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
  },
  navScrolled: {
    background: 'rgba(26,22,18,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(212,168,67,0.15)',
  },
  navTransparent: {
    background: 'linear-gradient(to bottom, rgba(26,22,18,0.85), transparent)',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '26px', fontWeight: 900, color: '#FDFAF4',
    letterSpacing: '-0.5px', display: 'flex', alignItems: 'baseline', gap: '1px',
  },
  logoDot: { color: '#C9622F' },
  logoSup: {
    fontFamily: "'Outfit', sans-serif", fontSize: '10px', fontWeight: 300,
    letterSpacing: '3px', color: '#D4A843', textTransform: 'uppercase',
    verticalAlign: 'super', marginLeft: '2px',
  },
  links: {
    display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none',
  },
  link: {
    fontSize: '12px', fontWeight: 500, letterSpacing: '1.5px',
    textTransform: 'uppercase', color: '#C4B89A', padding: '8px 12px',
    borderRadius: '3px', transition: 'color 0.2s',
    fontFamily: "'Outfit', sans-serif",
  },
  linkActive: { color: '#D4A843' },
  cta: {
    background: '#C9622F', color: '#FDFAF4', padding: '10px 22px',
    borderRadius: '3px', fontSize: '11px', fontWeight: 600,
    letterSpacing: '2px', textTransform: 'uppercase',
    fontFamily: "'Outfit', sans-serif", transition: 'background 0.2s',
  },
};

const links = [
  { to: '/explore', label: 'Destinations' },
  { to: '/planner', label: 'Plan Your Trip' },
  { to: '/activities', label: 'Activities' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    ...styles.nav,
    ...(scrolled || !isHome ? styles.navScrolled : styles.navTransparent),
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        Bubi<span style={styles.logoDot}>.</span>
        <sup style={styles.logoSup}>com</sup>
      </Link>

      {/* Desktop links */}
      <ul style={styles.links}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.linkActive : {}),
              })}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
        <li style={{ marginLeft: '8px' }}>
          <Link to="/planner" style={styles.cta}
            onMouseEnter={e => e.target.style.background = '#E07D50'}
            onMouseLeave={e => e.target.style.background = '#C9622F'}
          >
            Plan Trip
          </Link>
        </li>
      </ul>
    </nav>
  );
}
