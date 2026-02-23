import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './styles/global.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DestinationPage from './pages/DestinationPage';
import ActivitiesPage from './pages/ActivitiesPage';
import PlannerPage from './pages/PlannerPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                      element={<HomePage />} />
          <Route path="/explore"               element={<ExplorePage />} />
          <Route path="/destination/:slug"     element={<DestinationPage />} />
          <Route path="/activities"            element={<ActivitiesPage />} />
          <Route path="/planner"               element={<PlannerPage />} />
          <Route path="*"                      element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1A1612', paddingTop: '68px' }}>
      <div style={{ fontSize: '80px', marginBottom: '24px' }}>🌍</div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', color: '#FDFAF4', marginBottom: '16px' }}>Page Not Found</h1>
      <p style={{ color: '#8C7B6B', fontSize: '17px', marginBottom: '36px' }}>This destination doesn't exist — yet.</p>
      <a href="/" style={{ background: '#C9622F', color: '#fff', padding: '14px 32px', borderRadius: '3px', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif" }}>
        ← Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
