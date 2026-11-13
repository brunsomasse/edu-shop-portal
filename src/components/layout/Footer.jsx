import { Globe2 } from 'lucide-react';
import { FOOTER } from '../../data/content';

const Footer = () => (
  <footer className="bg-[#081A33] pb-10 pt-20 text-white">
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-5 flex items-center gap-2"><Globe2 className="h-7 w-7 text-[#19C3C7]" aria-hidden /><span className="text-xl font-semibold">Edu<span className="font-light">Commerce</span></span></div>
          <p className="text-sm leading-relaxed text-slate-400">Education pathways in China and a trusted global marketplace.</p>
        </div>
        {Object.entries(FOOTER).map(([h, links]) => (
          <div key={h}><h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">{h}</h4>
            <ul className="space-y-3 text-sm">{links.map((l) => <li key={l}><a href="#" className="text-slate-200 hover:text-[#19C3C7]">{l}</a></li>)}</ul></div>
        ))}
      </div>
      <div className="flex flex-col justify-between gap-4 pt-8 text-xs text-slate-400 md:flex-row">
        <p>© 2026 EduCommerce. All rights reserved.</p>
        <div className="flex gap-6">{['Terms of use', 'Privacy notice', 'Cookie policy'].map((l) => <a key={l} href="#" className="hover:text-white">{l}</a>)}</div>
      </div>
    </div>
  </footer>
);

export default Footer;
