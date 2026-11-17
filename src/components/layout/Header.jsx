import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, Globe, GraduationCap, Menu, X } from 'lucide-react';
import logoImg from '../../assets/edushop-global-logo-transparent.png';

export default function Header({ isScrolled, mobileMenuOpen, setMobileMenuOpen, onOpenPortal, session }) {
  const [studyDropdownOpen, setStudyDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStudyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectStudyTrack = (track) => {
    setStudyDropdownOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('select-study-track', { detail: track }));
    const targetEl = document.getElementById('study');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 flex flex-col items-center transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-slate-200 py-4 shadow-sm text-slate-900'
          : 'bg-transparent border-transparent py-6 text-white'
      }`}
    >
      <div className="w-full max-w-7xl px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center cursor-pointer">
          <img
            src={logoImg}
            alt="EduShop Global"
            className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
              isScrolled ? '' : 'brightness-0 invert'
            }`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest font-semibold">
          {/* Study Pathways Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setStudyDropdownOpen(true)}
            onMouseLeave={() => setStudyDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setStudyDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 hover:text-blue-500 transition-colors uppercase tracking-widest cursor-pointer py-2"
            >
              Study Pathways
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  studyDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {studyDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-80 z-50">
                <div className="bg-white text-slate-900 border border-slate-200 shadow-xl py-2 normal-case tracking-normal">
                  <button
                    type="button"
                    onClick={() => handleSelectStudyTrack('china')}
                    className="w-full text-left px-5 py-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3.5 border-b border-slate-100 cursor-pointer"
                  >
                    <GraduationCap className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-900">
                        Study in China
                      </p>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        Hubei University of Technology
                      </p>
                      <p className="text-xs text-slate-500 font-light mt-0.5">
                        On-campus Bachelor, Master & Language scholarships
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectStudyTrack('iou')}
                    className="w-full text-left px-5 py-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3.5 cursor-pointer"
                  >
                    <Globe className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-800">
                          Study from Everywhere
                        </p>
                        <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-800 px-1.5 py-0.5">
                          100% Online
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        International Open University (IOU)
                      </p>
                      <p className="text-xs text-slate-500 font-light mt-0.5">
                        Accredited online degrees & certificates worldwide
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <a href="#shop" className="hover:text-blue-500 transition-colors">
            Global Shop
          </a>
          <a href="#contact" className="hover:text-blue-500 transition-colors">
            Insights
          </a>
        </nav>

        <button
          type="button"
          onClick={() => onOpenPortal()}
          className="hidden md:flex items-center gap-2 bg-blue-900 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-blue-800 transition-colors cursor-pointer"
        >
          {session ? 'Client Portal' : 'Client Login'} <ArrowUpRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white text-slate-900 border-t border-slate-200 mt-4 px-6 py-6 space-y-4 shadow-lg">
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Study Pathways
            </p>
            <button
              type="button"
              onClick={() => handleSelectStudyTrack('china')}
              className="w-full text-left py-2 flex items-center justify-between text-sm font-semibold text-slate-900 hover:text-blue-900 cursor-pointer"
            >
              <span>Study in China (HBUT)</span>
              <ArrowUpRight className="w-4 h-4 text-blue-900" />
            </button>
            <button
              type="button"
              onClick={() => handleSelectStudyTrack('iou')}
              className="w-full text-left py-2 flex items-center justify-between text-sm font-semibold text-blue-900 hover:text-blue-700 cursor-pointer"
            >
              <span>Study from Everywhere (IOU Online)</span>
              <ArrowUpRight className="w-4 h-4 text-blue-800" />
            </button>
          </div>

          <div className="flex flex-col space-y-3 text-sm uppercase tracking-widest font-semibold">
            <a
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-900"
            >
              Global Shop
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-900"
            >
              Insights
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPortal();
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-blue-800 cursor-pointer"
          >
            {session ? 'Client Portal' : 'Client Login'} <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
