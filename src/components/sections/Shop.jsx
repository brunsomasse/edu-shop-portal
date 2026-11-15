import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'AWS Solutions Architect Associate Masterclass',
    category: 'Cloud Certifications',
    price: 49.99,
    description: 'Comprehensive labs, practice exams, and architectural frameworks for AWS SAA-C03.',
    level: 'Intermediate',
  },
  {
    id: 2,
    title: 'Terraform & GitOps Production Blueprints',
    category: 'DevOps & IaC',
    price: 39.99,
    description: 'Multi-environment infrastructure codebases for private EKS, GKE, and automated CI/CD.',
    level: 'Advanced',
  },
  {
    id: 3,
    title: 'React & Tailwind Full-Stack Web App Package',
    category: 'Web Development',
    price: 750.00,
    description: 'Custom responsive web application build with modern React, Tailwind CSS, and API integration.',
    level: 'Starter ($500–$5,000 Tier)',
  },
  {
    id: 4,
    title: 'Enterprise SaaS & E-Commerce Web Platform',
    category: 'Web Development',
    price: 3500.00,
    description: 'End-to-end scalable portal with RBAC authentication, PostgreSQL database, payments, and CI/CD.',
    level: 'Enterprise ($500–$5,000 Tier)',
  },
  {
    id: 5,
    title: 'Kubernetes Native Associate (KCNA) Prep Guide',
    category: 'Cloud Certifications',
    price: 34.99,
    description: 'Container orchestration fundamentals, security policies, and cluster administration.',
    level: 'Beginner',
  },
];

export default function Shop({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cloud Certifications', 'DevOps & IaC', 'Web Development'];

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="shop" className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          EduShop Global Catalog
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          Professional cloud blueprints, certification guides, and full-stack web solutions.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search courses, guides, or web packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                  {product.category}
                </span>
                {product.category === 'Web Development' && (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    $500 – $5,000 Range
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{product.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{product.description}</p>
            </div>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <button
                onClick={() => onAddToCart && onAddToCart(product)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your search criteria.
        </div>
      )}
    </section>
  );
}