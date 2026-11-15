import { useState, useEffect, useCallback } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Study from './components/sections/Study';
import Shop from './components/sections/Shop';
import Cart from './components/sections/Cart';
import Dashboard from './components/sections/Dashboard';
import Footer from './components/layout/Footer';
import ClientPortalModal from './components/modals/ClientPortalModal';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalContext, setPortalContext] = useState(null);
  const [session, setSession] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('edushop_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('edushop_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    if (!session) {
      setIsCartOpen(false);
      openPortal('checkout');
      return;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const { error } = await supabase
      .from('orders')
      .insert([{ user_id: session.user.id, items: cartItems, total_amount: subtotal }]);

    if (error) {
      alert('Checkout error: ' + error.message);
    } else {
      alert('Order saved to Supabase!');
      setCartItems([]);
      setIsCartOpen(false);
    }
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        <Shop onOpenPortal={openPortal} onAddToCart={handleAddToCart} />
        {session && <Dashboard session={session} />}
      </main>
      <Footer onOpenPortal={openPortal} />

      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full shadow-lg font-medium flex items-center space-x-2 transition-transform hover:scale-105 cursor-pointer"
      >
        <span>Cart</span>
        <span className="bg-white text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
          {totalItemsCount}
        </span>
      </button>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <ClientPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        session={session}
        initialContext={portalContext}
      />
    </div>
  );
}