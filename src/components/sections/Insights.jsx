import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import TextLink from '../ui/TextLink';
import { ARTICLES } from '../../data/content';

const Insights = () => (
  <section id="insights" className="bg-white py-28">
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <SectionHead eyebrow="Insights" title="Stay ahead of deadlines and costs" />
      <div className="grid gap-8 md:grid-cols-3">
        {ARTICLES.map(([tag, title, text], n) => (
          <Reveal key={title} delay={n * 100}>
            <article className="h-full border-t-4 border-[#19C3C7] bg-slate-50 p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{tag}</p>
              <h3 className="mb-3 text-2xl font-light leading-snug text-[#081A33]">{title}</h3>
              <p className="mb-6 text-slate-600">{text}</p><TextLink>Read more</TextLink>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Insights;
