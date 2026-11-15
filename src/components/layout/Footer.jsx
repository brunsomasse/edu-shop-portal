import logoImg from '../../assets/edushop-global-logo-transparent.png';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-20 w-full flex justify-center border-t border-slate-800">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
          <div>
            <img 
              src={logoImg} 
              alt="EduShop Global" 
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-4 text-sm text-slate-400 font-light">Powering global academic mobility and vetted institutional supply chains between China and international markets.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Academic Portal</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#study" className="hover:text-white transition-colors">Hubei University</a></li>
              <li><a href="#study" className="hover:text-white transition-colors">Scholarship Tiers</a></li>
              <li><a href="#study" className="hover:text-white transition-colors">Housing & Fees</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Global Shop</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#shop" className="hover:text-white transition-colors">BYD & Changan Vehicles</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Electronics & Tech</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Renewable Energy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Institutional Compliance</h4>
            <p className="text-sm text-slate-400 font-light mb-4">Strict quality checks and tracked international shipping standards.</p>
            <span className="text-xs text-blue-400 font-mono">SECURE SSL VERIFIED</span>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2026 Edu Shop Global. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}