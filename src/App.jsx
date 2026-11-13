import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ArrowRight,
  Globe,
  Briefcase,
  GraduationCap
} from 'lucide-react';

// --- VERBATIM DATA ---

const HUBEI_DATA = {
  bachelor: [
    { major: 'Computer science', origYuan: 20000, origDollar: 3400, scholYuan: 7000, scholDollar: 1190 },
    { major: 'Mechanical engineering', origYuan: 20000, origDollar: 3400, scholYuan: 7000, scholDollar: 1190 },
    { major: 'International Economics and Trade', origYuan: 18000, origDollar: 3060, scholYuan: 7000, scholDollar: 1190 },
    { major: 'Architecture', origYuan: 20000, origDollar: 3400, scholYuan: 7000, scholDollar: 1190 },
  ],
  master: [
    { major: 'Mechanical Engineering', origYuan: 23000, origDollar: 3910, scholYuan: 10000, scholDollar: 1700 },
    { major: 'Electrical Engineering', origYuan: 23000, origDollar: 3910, scholYuan: 10000, scholDollar: 1700 },
    { major: 'Biology and Medicine', origYuan: 23000, origDollar: 3910, scholYuan: 10000, scholDollar: 1700 },
    { major: 'Civil Engineering', origYuan: 23000, origDollar: 3910, scholYuan: 10000, scholDollar: 1700 },
    { major: 'Architecture', origYuan: 23000, origDollar: 3910, scholYuan: 10000, scholDollar: 1700 },
    { major: 'Computer Science and Technology', origYuan: 23000, origDollar: 3910, scholYuan: 10000, scholDollar: 1700 },
    { major: 'Business Administration', origYuan: 21000, origDollar: 3570, scholYuan: 10000, scholDollar: 1700 },
  ],
  language: [
    { major: 'Chinese Language (One Year)', origYuan: 12000, origDollar: 2040, scholYuan: 7000, scholDollar: 'N/A' }
  ],
  accom_bachelor: [
    { type: 'Single Room', yuan: 10000, dollar: 1700 },
    { type: 'Twin room', yuan: 6000, dollar: 1020 },
    { type: 'Triple room', yuan: 3000, dollar: 510 },
  ],
  accom_master: [
    { type: 'Single Room', origYuan: 10000, origDollar: 1700, scholYuan: 7200, scholDollar: 1224 },
    { type: 'Twin room', origYuan: 6000, origDollar: 1020, scholYuan: 5200, scholDollar: 884 },
    { type: 'Triple room', origYuan: 4000, origDollar: 680, scholYuan: 4000, scholDollar: 680 },
  ]
};

const ELIGIBILITY = {
  bachelor: [
    "Healthy body, non-Chinese citizens holding a valid foreign passport.",
    "High school graduation or equivalent education, good academic performance, and must obtain a formal graduation certificate before enrollment.",
    "Must be at least 18 years old (born before September 1, 2007), minors must provide a power of attorney issued by a guardian.",
    "The determination of nationality identity should follow the relevant regulations of the Ministry of Education of the People's Republic of China.",
    "To apply for a Chinese language instruction program, it is necessary to provide a Level 4 certificate of the International Chinese Language Proficiency Standards or a HSK Level 4 certificate.",
    "To apply for a program taught in English, if you are from a country where English is not the native or official language, you must provide a score report from an English language proficiency test (such as TOEFL, IELTS, or other international English examinations)."
  ],
  master: [
    "Healthy body, non-Chinese citizens holding a valid foreign passport.",
    "Bachelor's degree or an equivalent qualification with good academic performance, a formal graduation certificate must be obtained prior to enrollment;",
    "Two recommendation letters from associate professors or professors;",
    "For applications to programs taught in Chinese, a Level 4 certificate of the International Chinese Language Proficiency Standards or HSK Level 4 certificate must be provided;",
    "For applications to programs taught in English, if the applicant is from a non-English (native/official language) country, an English language test score report (such as TOEFL, IELTS, or other international English examinations) must be provided."
  ],
  language: [
    "Non-Chinese citizen in good health with valid passport.",
    "High school graduate (prior to the admission date).",
    "Provide Financial Support Guarantee Statement.",
    "Aged above 18 (Born before September 1st, 2005; applicants under 18 shall submit Guarantee Statement)"
  ]
};

const SHOP_PRODUCTS = [
  { id: 1, name: 'Tesla Model S Plaid', category: 'Cars', price: 89990, img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000' },
  { id: 2, name: 'Ford F-150 Lightning', category: 'Trucks', price: 59990, img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&q=80&w=1000' },
  { id: 3, name: 'iPhone 15 Pro Max', category: 'Phones', price: 1199, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000' },
  { id: 4, name: 'Samsung Galaxy S24 Ultra', category: 'Phones', price: 1299, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000' },
  { id: 5, name: 'MacBook Pro M3 Max', category: 'Tech', price: 3499, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000' },
  { id: 6, name: 'Sony A7RV Camera', category: 'Tech', price: 3899, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000' },
  { id: 7, name: 'Smart Home Hub', category: 'Home Appliances', price: 299, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=1000' },
  { id: 8, name: 'LG OLED G3 77"', category: 'Home Appliances', price: 4299, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000' },
];


export default function App() {
  const [view, setView] = useState('study'); // 'study' or 'shop'
  const [activeTab, setActiveTab] = useState('bachelor');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Reveal and Navbar Observer
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Optional: observer.unobserve(entry.target) if you only want it to animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll('.reveal-element');
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [view, activeTab]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Global CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .reveal-element {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-img {
          animation: scale-up 20s linear infinite alternate;
        }
        @keyframes scale-up {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .hero-text-slide {
          animation: slide-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateX(-40px);
        }
        @keyframes slide-right {
          to { opacity: 1; transform: translateX(0); }
        }
        table { border-collapse: collapse; }
      `}} />

      {/* Sticky Premium Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
            <Globe className={isScrolled || view !== 'study' ? 'text-blue-900' : 'text-white'} size={28} />
            <span className={isScrolled || view !== 'study' ? 'text-slate-900' : 'text-white'}>EDUSHOP</span>
          </div>
          <div className="flex gap-1 md:gap-4">
            <button
              onClick={() => setView('study')}
              className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
                view === 'study'
                  ? (isScrolled ? 'text-blue-900 border-b-2 border-blue-900' : 'text-white border-b-2 border-white')
                  : (isScrolled ? 'text-slate-500 hover:text-blue-900' : 'text-white/70 hover:text-white')
              }`}
            >
              Study in China
            </button>
            <button
              onClick={() => setView('shop')}
              className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
                view === 'shop'
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : (isScrolled ? 'text-slate-500 hover:text-blue-900' : 'text-white/70 hover:text-white')
              }`}
            >
              Global Shop
            </button>
          </div>
        </div>
      </nav>

      {/* Dynamic Main Content */}
      <main>
        {view === 'study' ? (
          <StudyPortal activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <ShopPortal />
        )}
      </main>

      {/* Corporate Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-slate-700 pb-12">
          <div>
            <h4 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Globe size={20} /> EDUSHOP GLOBAL
            </h4>
            <p className="max-w-md text-sm leading-relaxed">
              Empowering global minds with premium educational placements in China, and delivering high-quality commercial goods worldwide.
            </p>
          </div>
          <div className="flex md:justify-end gap-12">
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Services</h5>
              <ul className="space-y-2 text-sm">
                <li><button onClick={()=>setView('study')} className="hover:text-white transition-colors">Scholarships</button></li>
                <li><button onClick={()=>setView('study')} className="hover:text-white transition-colors">University Enrollment</button></li>
                <li><button onClick={()=>setView('shop')} className="hover:text-white transition-colors">Global Logistics</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 text-xs flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} EduShop Global. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Use</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StudyPortal({ activeTab, setActiveTab }) {
  return (
    <div className="w-full bg-slate-50 pb-24">
      {/* Edge-to-Edge Hero */}
      <div className="relative h-[80vh] min-h-[600px] bg-slate-900 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern University Campus" 
            className="w-full h-full object-cover opacity-40 hero-img"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="hero-text-slide" style={{ animationDelay: '0.2s' }}>
            <h5 className="text-blue-400 font-bold tracking-[0.2em] text-sm uppercase mb-4">Admissions & Scholarships</h5>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Empowering Your <br/><span className="font-bold">Future in China</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl font-light border-l-2 border-blue-500 pl-4">
              Access world-class educational opportunities and exclusive scholarship programs at premier institutions.
            </p>
          </div>
        </div>
      </div>

      {/* University Data Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 relative z-20">
        
        {/* Header Title */}
        <div className="reveal-element mb-16 border-b border-slate-300 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Hubei University of Technology</h2>
            <p className="text-slate-500 text-lg flex items-center gap-2">
              <GraduationCap size={20} /> Wuhan, Hubei, China
            </p>
          </div>
          <a href="#apply" className="px-6 py-3 bg-blue-900 text-white font-semibold text-sm tracking-wide hover:bg-blue-800 transition-colors flex items-center gap-2">
            BEGIN APPLICATION <ArrowRight size={16} />
          </a>
        </div>

        {/* Corporate Tabs */}
        <div className="reveal-element mb-12 flex flex-wrap gap-2 md:gap-8 border-b border-slate-200">
          {['bachelor', 'master', 'language'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab === 'language' ? 'Chinese Language' : `${tab}'s Programs`}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Table: Tuition */}
          <div className="lg:col-span-2 reveal-element">
            <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wide">Tuition Fees & Scholarships</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-slate-900 font-bold uppercase tracking-wider text-xs">
                    <th className="py-4 pr-4">Major</th>
                    <th className="py-4 px-4">Standard Tuition</th>
                    <th className="py-4 px-4 bg-slate-100">With Partial Scholarship</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {HUBEI_DATA[activeTab].map((prog, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="py-5 pr-4 font-medium text-slate-900">{prog.major}</td>
                      <td className="py-5 px-4">
                        {prog.origYuan}¥ <span className="text-slate-400 ml-1">/ ${prog.origDollar}</span>
                      </td>
                      <td className="py-5 px-4 bg-slate-50 font-bold text-blue-900">
                        {prog.scholYuan}¥ 
                        {prog.scholDollar !== 'N/A' && <span className="text-blue-600/70 ml-1">/ ${prog.scholDollar}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Accommodation Table */}
            <h3 className="text-xl font-bold text-slate-900 mt-16 mb-6 uppercase tracking-wide">Accommodation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-slate-900 font-bold uppercase tracking-wider text-xs">
                    <th className="py-4 pr-4">Room Type</th>
                    <th className="py-4 px-4">Standard Price (Per Year)</th>
                    {activeTab === 'master' && <th className="py-4 px-4 bg-slate-100">Scholarship Price</th>}
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {(activeTab === 'master' ? HUBEI_DATA.accom_master : HUBEI_DATA.accom_bachelor).map((room, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="py-5 pr-4 font-medium text-slate-900">{room.type}</td>
                      <td className="py-5 px-4">
                        {room.origYuan || room.yuan}¥ 
                        <span className="text-slate-400 ml-1">/ ${room.origDollar || room.dollar}</span>
                      </td>
                      {activeTab === 'master' && (
                        <td className="py-5 px-4 bg-slate-50 font-bold text-blue-900">
                          {room.scholYuan}¥ <span className="text-blue-600/70 ml-1">/ ${room.scholDollar}</span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar: Eligibility */}
          <div className="lg:col-span-1 reveal-element">
            <div className="bg-white border border-slate-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={20} className="text-blue-900" /> Application Eligibility
              </h3>
              <ul className="space-y-4 text-sm text-slate-600">
                {ELIGIBILITY[activeTab].map((rule, idx) => (
                  <li key={idx} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <ChevronRight className="flex-shrink-0 text-blue-900 mt-0.5" size={16} />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ShopPortal() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Cars', 'Trucks', 'Phones', 'Tech', 'Home Appliances'];
  
  const filteredProducts = filter === 'All' ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="w-full bg-white pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-slate-900 overflow-hidden flex items-center mt-20 md:mt-0">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8ed7c15243?auto=format&fit=crop&q=80&w=2000" 
            alt="Global Logistics Port" 
            className="w-full h-full object-cover opacity-40 hero-img"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="hero-text-slide" style={{ animationDelay: '0.2s' }}>
            <h5 className="text-emerald-400 font-bold tracking-[0.2em] text-sm uppercase mb-4">Global Trade & Logistics</h5>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Sourcing the World's <br/><span className="font-bold">Finest Products</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl font-light border-l-2 border-emerald-500 pl-4">
              From premium electric vehicles to cutting-edge consumer electronics, shipped seamlessly to your destination.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16">
        
        {/* Category Filters */}
        <div className="reveal-element flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <div key={product.id} className="reveal-element group" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="bg-white border border-slate-200 overflow-hidden relative cursor-pointer h-full flex flex-col">
                
                {/* Image Container with Hover Zoom */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
                    {product.category}
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{product.name}</h3>
                  <div className="flex-grow"></div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xl font-light text-slate-900">
                      ${product.price.toLocaleString()}
                    </span>
                    <button className="text-emerald-700 font-bold text-sm tracking-wider uppercase flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                      Inquire <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}