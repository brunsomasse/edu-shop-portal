import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Menu, X, Globe2, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bachelor');

  // Track header scroll state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Performant Scroll Reveal using vanilla IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const programs = {
    bachelor: [
      { name: "Computer Science", tuition: "20,000¥ ($3,400)", partial: "7,000¥ ($1,190)" },
      { name: "Mechanical Engineering", tuition: "20,000¥ ($3,400)", partial: "7,000¥ ($1,190)" },
      { name: "Architecture", tuition: "20,000¥ ($3,400)", partial: "7,000¥ ($1,190)" },
      { name: "International Economics & Trade", tuition: "18,000¥ ($3,060)", partial: "7,000¥ ($1,190)" },
    ],
    master: [
      { name: "Mechanical / Electrical / Civil Eng.", tuition: "23,000¥ ($3,910)", partial: "10,000¥ ($1,700)" },
      { name: "Biology & Medicine", tuition: "23,000¥ ($3,910)", partial: "10,000¥ ($1,700)" },
      { name: "Architecture & Computer Science", tuition: "23,000¥ ($3,910)", partial: "10,000¥ ($1,700)" },
      { name: "Business Administration", tuition: "21,000¥ ($3,570)", partial: "10,000¥ ($1,700)" },
    ],
    language: [
      { name: "One Year Chinese Language", tuition: "12,000¥ ($2,040)", partial: "7,000¥" },
    ]
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-white border-slate-200 py-4 shadow-sm' : 'bg-transparent border-transparent py-6 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <Globe2 className={`w-8 h-8 ${isScrolled ? 'text-blue-900' : 'text-white'}`} />
            <span className="text-xl font-bold tracking-tight uppercase">Edu<span className="font-light">Commerce</span></span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest font-semibold">
            <a href="#study" className="hover:text-blue-500 transition-colors">Study in China</a>
            <a href="#shop" className="hover:text-blue-500 transition-colors">Global Shop</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Insights</a>
          </nav>

          <button className="hidden md:flex items-center gap-2 bg-blue-900 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-blue-800 transition-colors">
            Client Login <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Global Network" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl">
            <p className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-6 border-l-2 border-blue-400 pl-4">Strategic Global Positioning</p>
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight mb-8">
              Clarity for a <br/><span className="font-bold">Complex World.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light mb-12 max-w-2xl leading-relaxed">
              Powering global mobility through elite educational pathways in China, alongside a rigorous, institutional-grade commercial marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#study" className="group flex items-center justify-between bg-blue-600 text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-blue-500 transition-colors w-full sm:w-auto">
                Explore Scholarships
                <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#shop" className="group flex items-center justify-between bg-transparent border border-white text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-slate-900 transition-all w-full sm:w-auto">
                Enter Global Shop
                <ChevronRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- HUBEI UNIVERSITY SECTION --- */}
      <section id="study" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
                Hubei University of Technology
              </h2>
              <p className="text-lg text-slate-600 font-light">
                Institutional data and tuition structuring for international candidates.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-900">2026 Admissions Cycle</span>
            </div>
          </div>

          <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out">
            <div className="flex border-b border-slate-200 mb-0">
              {['bachelor', 'master', 'language'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm uppercase tracking-widest font-bold transition-colors ${activeTab === tab ? 'border-b-2 border-blue-900 text-blue-900 bg-slate-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="border border-t-0 border-slate-200 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                    <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/3">Academic Major</th>
                    <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/3">Base Tuition (Per Year)</th>
                    <th className="p-6 border-b border-slate-200 font-semibold w-1/3">With Partial Scholarship</th>
                  </tr>
                </thead>
                <tbody>
                  {programs[activeTab].map((prog, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group cursor-default">
                      <td className="p-6 border-b border-r border-slate-200 text-slate-900 font-medium group-hover:text-blue-900 transition-colors">{prog.name}</td>
                      <td className="p-6 border-b border-r border-slate-200 text-slate-600 font-light">{prog.tuition}</td>
                      <td className="p-6 border-b border-slate-200 text-blue-700 font-medium">{prog.partial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200">
              <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Single Room</h4>
                <p className="text-2xl font-light text-slate-900">10,000¥ <span className="text-sm text-slate-500">/ $1,700 yr</span></p>
              </div>
              <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Twin Room</h4>
                <p className="text-2xl font-light text-slate-900">6,000¥ <span className="text-sm text-slate-500">/ $1,020 yr</span></p>
              </div>
              <div className="p-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Triple Room</h4>
                <p className="text-2xl font-light text-slate-900">3,000¥ <span className="text-sm text-slate-500">/ $510 yr</span></p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- GLOBAL SHOP SECTION --- */}
      <section id="shop" className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out mb-16 border-b border-slate-200 pb-12">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
              Commercial Equities & Assets
            </h2>
            <p className="text-lg text-slate-600 font-light max-w-2xl">
              Procure verified industrial and consumer goods. Our global marketplace ensures strict quality control and logistical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 delay-100 ease-out md:col-span-2 group relative h-96 bg-slate-900 overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Automotive" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Heavy Machinery</p>
                  <h3 className="text-3xl font-light text-white">Cars & Trucks</h3>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-none border border-white/20 group-hover:bg-white group-hover:text-slate-900 transition-colors">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200 ease-out group relative h-96 bg-slate-900 overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=1924&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Tech" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Consumer Electronics</p>
                  <h3 className="text-2xl font-light text-white">Tech & Phones</h3>
                </div>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 delay-300 ease-out group relative h-96 bg-slate-900 overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Appliances" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Domestic Infrastructure</p>
                  <h3 className="text-2xl font-light text-white">Home Appliances</h3>
                </div>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 delay-400 ease-out md:col-span-2 border border-slate-300 bg-white p-12 flex flex-col justify-center hover:border-blue-900 transition-colors group">
              <h3 className="text-2xl font-light text-slate-900 mb-4">Institutional Supply Chain Solutions</h3>
              <p className="text-slate-600 mb-8 max-w-lg font-light">Access our full catalog of vetted global suppliers. Strict compliance and international shipping standard applied to all orders.</p>
              <a href="#" className="inline-flex items-center text-blue-900 font-bold uppercase tracking-widest text-sm">
                View Full Catalog
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Globe2 className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold tracking-tight uppercase">Edu<span className="font-light text-slate-400">Commerce</span></span>
              </div>
              <p className="text-slate-400 font-light max-w-sm leading-relaxed">
                Empowering decisions with clarity. Providing global educational pathways and institutional-grade commercial solutions.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-6">Capabilities</h4>
              <ul className="space-y-4 text-sm font-light text-slate-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Scholarship Indices</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">University Analytics</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Global Supply Chain</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Market Insights</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-light text-slate-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Investor Relations</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light text-slate-500">
            <p>&copy; 2026 EduCommerce. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}