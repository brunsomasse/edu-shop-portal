import { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import bydImg from '../../assets/BYD.webp';
import changanImg from '../../assets/Changan.jpeg';
import jetourImg from '../../assets/Jetour.jpeg';
import truck1Img from '../../assets/Truck 1.jpg';
import truckImg from '../../assets/Truck.webp';

export default function Shop({ onOpenPortal }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const categories = {
    cars: {
      title: "Cars and trucks",
      tagline: "Featured Brand",
      portalCategory: "Global Shop — Vehicles & Trucks",
      labels: ["BYD Tang", "Changan SUV", "Jetour", "Sinotruk HOWO", "HOWO Dump Truck"],
      images: [bydImg, changanImg, jetourImg, truck1Img, truckImg]
    },
    tech: {
      title: "Tech and phones",
      tagline: "Electronics",
      portalCategory: "Global Shop — Tech & Industrial",
      labels: ["Laptops & PCs", "Smartphones", "Audio Gear", "Smart Wearables"],
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=2000&auto=format&fit=crop"
      ]
    },
    appliances: {
      title: "Home Appliances",
      tagline: "Domestic",
      portalCategory: "Global Shop — Tech & Industrial",
      labels: ["Kitchen", "Laundry Systems", "Climate Control", "Smart Home"],
      images: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1626806787426-5910811b6325?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574845585097-4091a1df2778?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop"
      ]
    },
    energy: {
      title: "Renewable Energy",
      tagline: "Infrastructure",
      portalCategory: "Global Shop — Tech & Industrial",
      labels: ["Solar Panels", "Battery Storage", "Inverters", "EV Charging"],
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=2000&auto=format&fit=crop"
      ]
    },
    industrial: {
      title: "Industrial & Manufacturing",
      tagline: "Heavy Equipment",
      portalCategory: "Global Shop — Tech & Industrial",
      labels: ["Precision Tools", "Factory Robotics", "Construction", "Logistics"],
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2000&auto=format&fit=crop"
      ]
    }
  };

  const handleRequestQuote = (portalCategory, subject) => {
    onOpenPortal?.({
      authMode: 'signup',
      accountType: 'Commercial / Trade Buyer',
      tab: 'inquiries',
      category: portalCategory,
      subject
    });
  };

  const AnimatedCard = ({ data, colSpan = "col-span-1" }) => {
    const currentIndex = tick % data.images.length;
    const activeItem = data.labels[currentIndex];

    return (
      <div
        onClick={() => handleRequestQuote(data.portalCategory, `CIF Quote Request: ${data.title} (${activeItem})`)}
        className={`group relative h-96 bg-slate-900 overflow-hidden cursor-pointer ${colSpan}`}
      >
        {data.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={data.labels[idx]}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              currentIndex === idx ? 'opacity-70 group-hover:scale-105' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
          <div>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">
              {data.tagline}: <span className="text-white">{activeItem}</span>
            </p>
            <h3 className="text-2xl md:text-3xl font-light text-white">{data.title}</h3>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-none border border-white/20 group-hover:bg-white group-hover:text-slate-900 transition-colors">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="shop" className="py-32 bg-slate-50 border-t border-slate-200 w-full flex justify-center">
      <div className="w-full max-w-7xl px-6 md:px-12">
        <div className="mb-16 border-b border-slate-200 pb-12">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
            Quality goods from vetted suppliers
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl">
            Vehicles, electronics, appliances, and industrial assets with stringent quality checks and tracked international shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedCard data={categories.cars} colSpan="md:col-span-2" />
          <AnimatedCard data={categories.tech} colSpan="md:col-span-1" />
          <AnimatedCard data={categories.appliances} colSpan="md:col-span-1" />
          <AnimatedCard data={categories.energy} colSpan="md:col-span-1" />
          <AnimatedCard data={categories.industrial} colSpan="md:col-span-1" />

          <div className="md:col-span-3 border border-slate-300 bg-white p-12 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-blue-900 transition-colors group mt-6">
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-2">Institutional Supply Chain Solutions</h3>
              <p className="text-slate-600 max-w-2xl font-light">Access our full catalog of vetted global suppliers. Strict compliance and international shipping standard applied to all institutional orders.</p>
            </div>
            <button
              type="button"
              onClick={() => handleRequestQuote('Global Shop — Vehicles & Trucks', 'Institutional Supply Chain Catalog & Procurement Inquiry')}
              className="mt-6 md:mt-0 inline-flex items-center bg-blue-900 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Request Full Catalog
              <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
