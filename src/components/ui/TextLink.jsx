import { ArrowRight } from 'lucide-react';

const TextLink = ({ href = '#', children, light }) => (
  <a href={href} className={`group inline-flex items-center gap-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${light ? 'text-white' : 'text-[#2F6BFF]'}`}>
    {children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
  </a>
);

export default TextLink;
