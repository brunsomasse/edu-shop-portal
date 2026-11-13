import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Global Network" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <p className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-6 border-l-2 border-blue-400 pl-4">Strategic Global Positioning</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight mb-8">
            Clarity for a <br/><span className="font-bold">Complex World.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-12 max-w-2xl leading-relaxed">
            Powering global mobility through elite educational pathways in China, alongside a rigorous, institutional-grade commercial marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#study" className="group flex items-center justify-between bg-blue-600 text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-blue-500 transition-colors w-full sm:w-auto">
              Explore Scholarships
              <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#shop" className="group flex items-center justify-between bg-transparent border border-white text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-slate-900 transition-all w-full sm:w-auto">
              Enter Global Shop
              <ChevronRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}