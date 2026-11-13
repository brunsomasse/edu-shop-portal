import { ArrowUpRight } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import { TILES } from '../../data/content';
import { unsplash } from '../../utils/format';

const Shop = () => (
  <section id="shop" className="bg-white py-28">
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <SectionHead eyebrow="Global shop" title="Quality goods from vetted suppliers" text="Vehicles, electronics and appliances with quality checks and tracked shipping." />
      <div className="grid gap-6 md:grid-cols-3">
        {TILES.map((t, n) => (
          <Reveal key={t.title} delay={n * 100} className={t.wide ? 'md:col-span-2' : ''}>
            <a href="#" className="group relative block h-96 overflow-hidden bg-[#081A33]">
              <img src={unsplash(t.img)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081A33] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8 text-white">
                <div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#19C3C7]">{t.tag}</p><h3 className="text-3xl font-light">{t.title}</h3></div>
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Shop;
