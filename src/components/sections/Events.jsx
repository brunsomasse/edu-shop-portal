import { ArrowRight } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import { EVENTS } from '../../data/content';

const Events = () => (
  <section className="border-t border-slate-200 bg-slate-50 py-24">
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <SectionHead eyebrow="Upcoming events" title="Meet our admissions team" />
      <ul className="divide-y divide-slate-200 border-y border-slate-200">
        {EVENTS.map(([d, kind, name]) => (
          <li key={name}><a href="#" className="group grid items-center gap-2 py-6 md:grid-cols-[200px_120px_1fr_auto] md:gap-8">
            <span className="font-semibold text-[#081A33]">{d}</span><span className="text-sm text-slate-500">{kind}</span>
            <span className="text-xl font-light text-[#081A33] group-hover:text-[#2F6BFF]">{name}</span>
            <ArrowRight className="hidden h-5 w-5 text-[#2F6BFF] md:block" aria-hidden />
          </a></li>
        ))}
      </ul>
    </div>
  </section>
);

export default Events;
