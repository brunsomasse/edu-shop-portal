import { Globe2, ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-500 border-b ${isScrolled ? 'bg-white border-slate-200 py-4 shadow-sm' : 'bg-transparent border-transparent py-6 text-white'}`}>
      <div className="w-full max-w-7xl px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <Globe2 className={`w-8 h-8 ${isScrolled ? 'text-blue-900' : 'text-white'}`} />
          <span className="text-xl font-bold tracking-tight uppercase">EduShop<span className="font-light">Global</span></span>
        </div>
        
        <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest font-semibold">
          <a href="#study" className="hover:text-blue-500 transition-colors">Study in China</a>
          <a href="#shop" className="hover:text-blue-500 transition-colors">Global Shop</a>
          <a href="#contact" className="hover:text-blue-500 transition-colors">Insights</a>
        </nav>

        <button className="hidden md:flex items-center gap-2 bg-blue-900 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-blue-800 transition-colors">
          Client Login <ArrowUpRight className="w-4 h-4" />
        </button>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}