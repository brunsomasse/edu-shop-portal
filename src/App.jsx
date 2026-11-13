import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Solutions from './components/sections/Solutions';
import Study from './components/sections/Study';
import Shop from './components/sections/Shop';
import Events from './components/sections/Events';
import Insights from './components/sections/Insights';
import Newsletter from './components/sections/Newsletter';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#2F6BFF] selection:text-white">
      <a href="#study" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <Header /><main><Hero /><Solutions /><Study /><Shop /><Events /><Insights /><Newsletter /></main><Footer />
    </div>
  );
}
