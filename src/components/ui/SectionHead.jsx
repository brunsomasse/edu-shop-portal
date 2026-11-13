import Reveal from './Reveal';
import Eyebrow from './Eyebrow';

const SectionHead = ({ eyebrow, title, text }) => (
  <Reveal className="mb-14 max-w-3xl">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="text-4xl font-light leading-tight tracking-tight text-[#081A33] md:text-5xl">{title}</h2>
    {text && <p className="mt-5 text-lg leading-relaxed text-slate-600">{text}</p>}
  </Reveal>
);

export default SectionHead;
