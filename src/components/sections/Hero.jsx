import { ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import Eyebrow from '../ui/Eyebrow';
import { unsplash } from '../../utils/format';

const Hero = () => (
  <section id="top" className="relative flex min-h-[88vh] items-end overflow-hidden bg-[#081A33] pb-20 pt-40">
    <img src={unsplash('photo-1451187580459-43490279c0fa', 2000)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#081A33] via-[#081A33]/60 to-transparent" />
    <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
      <Reveal className="max-w-3xl">
        <Eyebrow light>Education and commerce</Eyebrow>
        <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-white md:text-7xl">What does it really cost to study in China?</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">Tuition, scholarships and housing, compared by major, so you can plan with real numbers.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#study" className="inline-flex items-center gap-3 bg-[#2F6BFF] px-8 py-4 font-semibold text-white hover:bg-[#4a7dff]">See tuition data <ArrowRight className="h-5 w-5" aria-hidden /></a>
          <a href="#shop" className="inline-flex items-center gap-3 border border-white/70 px-8 py-4 font-semibold text-white hover:bg-white hover:text-[#081A33]">Browse the shop</a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Hero;
