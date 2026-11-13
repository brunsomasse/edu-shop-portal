import { useState } from 'react';
import { Globe2, ChevronDown, Search, Menu, X } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';
import { NAV } from '../../data/content';

function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const solid = scrolled || open || menu !== null;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'bg-[#081A33] shadow-lg' : 'bg-transparent'} text-white`} onMouseLeave={() => setMenu(null)}>
      <div className="hidden border-b border-white/10 text-xs md:block">
        <div className="mx-auto flex max-w-7xl justify-end gap-6 px-6 py-2 md:px-12">
          <a href="#" className="hover:text-[#19C3C7]">Global</a>
          <a href="#" className="hover:text-[#19C3C7]">Client support</a>
          <a href="#" className="font-semibold hover:text-[#19C3C7]">Client log in</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="flex items-center gap-2"><Globe2 className="h-7 w-7 text-[#19C3C7]" aria-hidden /><span className="text-xl font-semibold tracking-tight">Edu<span className="font-light">Commerce</span></span></a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <div key={n.label} className="relative" onMouseEnter={() => setMenu(n.label)}>
              <a href={n.href} aria-expanded={menu === n.label} className="flex items-center gap-1 py-2 text-sm font-medium hover:text-[#19C3C7]">
                {n.label}<ChevronDown className="h-4 w-4" aria-hidden />
              </a>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden hover:text-[#19C3C7] md:block"><Search className="h-5 w-5" /></button>
          <a href="#contact" className="hidden bg-[#2F6BFF] px-5 py-2.5 text-sm font-semibold hover:bg-[#4a7dff] md:inline-flex">Get in touch</a>
          <button className="md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {menu && (
        <div className="hidden border-t border-white/10 bg-[#081A33] md:block">
          <ul className="mx-auto grid max-w-7xl grid-cols-4 gap-6 px-12 py-8">
            {NAV.find((n) => n.label === menu).items.map((i) => (
              <li key={i}><a href="#" className="text-lg font-light hover:text-[#19C3C7]">{i}</a></li>
            ))}
          </ul>
        </div>
      )}
      {open && (
        <nav className="border-t border-white/10 bg-[#081A33] px-6 pb-6 md:hidden" aria-label="Mobile">
          {NAV.map((n) => <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-lg">{n.label}</a>)}
        </nav>
      )}
    </header>
  );
}

export default Header;
