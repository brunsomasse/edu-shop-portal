import { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, ShoppingCart } from 'lucide-react';

import bydImg from '../../assets/BYD.webp';
import changanImg from '../../assets/Changan.jpeg';
import jetourImg from '../../assets/Jetour.jpeg';
import truck1Img from '../../assets/Truck 1.jpg';
import truckImg from '../../assets/Truck.webp';

const DIGITAL_PRODUCTS = [
  {
    id: 'web-starter',
    title: 'React & Tailwind Full-Stack Web App Package',
    category: 'Web Development',
    price: 750.0,
    description:
      'Custom responsive web application build with modern React, Tailwind CSS, and API integration.',
  },
  {
    id: 'web-enterprise',
    title: 'Enterprise SaaS & E-Commerce Web Platform',
    category: 'Web Development',
    price: 3500.0,
    description:
      'End-to-end scalable portal with RBAC authentication, PostgreSQL database, payments, and CI/CD.',
  },
  {
    id: 'aws-saa',
    title: 'AWS Solutions Architect Associate Masterclass',
    category: 'Cloud Certifications',
    price: 49.99,
    description:
      'Comprehensive labs, practice exams, and architectural frameworks for AWS SAA-C03.',
  },
  {
    id: 'terraform-gitops',
    title: 'Terraform & GitOps Production Blueprints',
    category: 'DevOps & IaC',
    price: 39.99,
    description:
      'Multi-environment infrastructure codebases for private EKS, GKE, and automated CI/CD.',
  },
  {
    id: 'kcna-prep',
    title: 'Kubernetes Native Associate (KCNA) Prep Guide',
    category: 'Cloud Certifications',
    price: 34.99,
    description:
      'Container orchestration fundamentals, security policies, and cluster administration.',
  },
];

export default function Shop({ onOpenPortal, onAddToCart }) {
  const [tick, setTick] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const categories = {
    cars: {
      key: 'cars',
      title: 'Cars and trucks',
      tagline: 'Featured Brand',
      portalCategory: 'Global Shop — Vehicles & Trucks',
      labels: ['BYD Tang', 'Changan SUV', 'Jetour', 'Sinotruk HOWO', 'HOWO Dump Truck'],
      prices: [28500, 22000, 24500, 48000, 52000],
      images: [bydImg, changanImg, jetourImg, truck1Img, truckImg],
    },
    tech: {
      key: 'tech',
      title: 'Tech and phones',
      tagline: 'Electronics',
      portalCategory: 'Global Shop — Tech & Industrial',
      labels: ['Laptops & PCs', 'Smartphones', 'Audio Gear', 'Smart Wearables'],
      prices: [1250, 890, 290, 240],
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=2000&auto=format&fit=crop',
      ],
    },
    appliances: {
      key: 'appliances',
      title: 'Home Appliances',
      tagline: 'Domestic',
      portalCategory: 'Global Shop — Tech & Industrial',
      labels: ['Kitchen', 'Laundry Systems', 'Climate Control', 'Smart Home'],
      prices: [1450, 980, 760, 620],
      images: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1626806787426-5910811b6325?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1574845585097-4091a1df2778?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
      ],
    },
    energy: {
      key: 'energy',
      title: 'Renewable Energy',
      tagline: 'Infrastructure',
      portalCategory: 'Global Shop — Tech & Industrial',
      labels: ['Solar Panels', 'Battery Storage', 'Inverters', 'EV Charging'],
      prices: [3200, 4800, 1650, 1150],
      images: [
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=2000&auto=format&fit=crop',
      ],
    },
    industrial: {
      key: 'industrial',
      title: 'Industrial & Manufacturing',
      tagline: 'Heavy Equipment',
      portalCategory: 'Global Shop — Tech & Industrial',
      labels: ['Precision Tools', 'Factory Robotics', 'Construction', 'Logistics'],
      prices: [4500, 18500, 12000, 6800],
      images: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2000&auto=format&fit=crop',
      ],
    },
  };

  const handleRequestQuote = (portalCategory, subject) => {
    onOpenPortal?.({
      authMode: 'signup',
      accountType: 'Commercial / Trade Buyer',
      tab: 'inquiries',
      category: portalCategory,
      subject,
    });
  };

  const AnimatedCard = ({ data, colSpan = 'col-span-1' }) => {
    const currentIndex = tick % data.images.length;
    const activeItem = data.labels[currentIndex];
    const activePrice = data.prices[currentIndex];

    const handleCardAddToCart = (e) => {
      e.stopPropagation();
      onAddToCart?.({
        id: `${data.key}-${currentIndex}`,
        title: `${data.title} — ${activeItem}`,
        price: activePrice,
      });
    };

    return (
      <div
        onClick={() =>
          handleRequestQuote(data.portalCategory, `CIF Quote Request: ${data.title} (${activeItem})`)
        }
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="bg-slate-900/80 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 border border-white/15">
            Est. ${activePrice.toLocaleString('en-US')}
          </span>
          <button
            type="button"
            onClick={handleCardAddToCart}
            className="bg-blue-900/90 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>

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

  const digitalCategories = ['All', 'Web Development', 'Cloud Certifications', 'DevOps & IaC'];
  const filteredDigital = DIGITAL_PRODUCTS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section id="shop" className="py-32 bg-slate-50 border-t border-slate-200 w-full flex justify-center">
      <div className="w-full max-w-7xl px-6 md:px-12">
        <div className="mb-16 border-b border-slate-200 pb-12">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
            Quality goods from vetted suppliers
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl">
            Vehicles, electronics, appliances, and industrial assets with stringent quality checks
            and tracked international shipping. Click any card for a custom CIF quote or add
            directly to your cart.
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
              <h3 className="text-2xl font-light text-slate-900 mb-2">
                Institutional Supply Chain Solutions
              </h3>
              <p className="text-slate-600 max-w-2xl font-light">
                Access our full catalog of vetted global suppliers. Strict compliance and
                international shipping standard applied to all institutional orders.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleRequestQuote(
                  'Global Shop — Vehicles & Trucks',
                  'Institutional Supply Chain Catalog & Procurement Inquiry'
                )
              }
              className="mt-6 md:mt-0 inline-flex items-center bg-blue-900 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Request Full Catalog
              <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-2">
                Digital & Cloud Solutions
              </p>
              <h3 className="text-3xl font-light text-slate-900">
                Web Development & Architecture Packages
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {digitalCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-900 text-white'
                      : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDigital.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 p-8 flex flex-col justify-between hover:border-blue-900 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1">
                      {product.category}
                    </span>
                    {product.category === 'Web Development' && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1">
                        $500 – $5,000 Tier
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-normal text-slate-900 mb-3">{product.title}</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-2xl font-light text-slate-900">
                    ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddToCart?.(product)}
                    className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
