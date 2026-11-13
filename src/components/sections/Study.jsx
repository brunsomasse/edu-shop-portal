import { useState } from 'react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import { PROGRAMS, ROOMS } from '../../data/content';
import { fmt } from '../../utils/format';

function Study() {
  const [tab, setTab] = useState('Bachelor');
  return (
    <section id="study" className="border-t border-slate-200 bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHead eyebrow="2026 admissions cycle" title="Hubei University of Technology" text="Tuition and housing for international candidates, with and without a partial scholarship." />
        <Reveal>
          <div role="tablist" className="flex border-b border-slate-300">
            {Object.keys(PROGRAMS).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                className={`px-8 py-4 text-sm font-semibold ${tab === t ? 'border-b-2 border-[#2F6BFF] bg-white text-[#2F6BFF]' : 'text-slate-500 hover:bg-white'}`}>{t}</button>
            ))}
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">Yearly tuition by major, {tab}</caption>
              <thead><tr className="text-xs uppercase tracking-widest text-slate-500">
                <th scope="col" className="p-6 font-semibold">Major</th><th scope="col" className="p-6 font-semibold">Base tuition per year</th><th scope="col" className="p-6 font-semibold">With partial scholarship</th>
              </tr></thead>
              <tbody>
                {PROGRAMS[tab].map(([name, base, part]) => (
                  <tr key={name} className="border-t border-slate-200 hover:bg-slate-50">
                    <th scope="row" className="p-6 font-medium text-[#081A33]">{name}</th>
                    <td className="p-6 text-slate-600">{fmt(base)}</td>
                    <td className="p-6 font-semibold text-[#2F6BFF]">{fmt(part)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="mt-10 grid divide-y divide-slate-200 border border-slate-200 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
            {ROOMS.map(([n, p]) => (
              <div key={n} className="p-8"><dt className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">{n}</dt><dd className="text-2xl font-light text-[#081A33]">{fmt(p)} <span className="text-sm text-slate-500">per year</span></dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export default Study;
