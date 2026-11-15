import { useState, useEffect, useCallback } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Study from './components/sections/Study';
import Shop from './components/sections/Shop';
import Footer from './components/layout/Footer';
import ClientPortalModal from './components/modals/ClientPortalModal';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalContext, setPortalContext] = useState(null);
  const [session, setSession] = useState(null);

  const openPortal = useCallback((context = null) => {
    setPortalContext(context);
    setPortalOpen(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    supabase.auth.getSession()
      .then(({ data }) => setSession(data?.session ?? null))
      .catch((err) => console.error('Supabase session error:', err));

    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      data?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenPortal={openPortal}
        session={session}
      />
      <main>
        <Hero onOpenPortal={openPortal} />
        <Study onOpenPortal={openPortal} />
        <Shop onOpenPortal={openPortal} />
      </main>
      <Footer onOpenPortal={openPortal} />
      <ClientPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        session={session}
        initialContext={portalContext}
      />
    </div>
  );
}
