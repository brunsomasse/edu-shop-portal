import { useState } from 'react';
import SectionHead from '../ui/SectionHead';
import TextLink from '../ui/TextLink';
import { SOLUTIONS } from '../../data/content';

function Solutions() {
  const [i, setI] = useState(0);
  const s = SOLUTIONS[i];
  return (
    <section className="bg-white py-24" id="about">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHead eyebrow="Featured solutions" title="End-to-end support for every step" />
        <div role="tablist" aria-label="Solutions" className="flex gap-8 border-b border-slate-200">
          {SOLUTIONS.map((x, n) => (
            <button key={x.key} role="tab" aria-selected={n === i} onClick={() => setI(n)}
              className={`-mb-px border-b-2 pb-4 text-lg ${n === i ? 'border-[#2F6BFF] font-semibold text-[#081A33]' : 'border-transparent text-slate-500 hover:text-[#081A33]'}`}>{x.key}</button>
          ))}
        </div>
        <div role="tabpanel" className="grid gap-10 py-12 md:grid-cols-2">
          <h3 className="text-3xl font-light text-[#081A33]">{s.title}</h3>
          <div><p className="mb-6 text-lg text-slate-600">{s.text}</p><TextLink href={s.href}>Explore now</TextLink></div>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
