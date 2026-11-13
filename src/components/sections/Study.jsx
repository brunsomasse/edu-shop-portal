import { useState } from 'react';

export default function Study() {
  const [activeTab, setActiveTab] = useState('bachelor');

  const programs = {
    bachelor: [
      { name: "Computer Science", tuition: "20,000¥ ($3,400)", partial: "7,000¥ ($1,190)" },
      { name: "Mechanical Engineering", tuition: "20,000¥ ($3,400)", partial: "7,000¥ ($1,190)" },
      { name: "Architecture", tuition: "20,000¥ ($3,400)", partial: "7,000¥ ($1,190)" },
      { name: "International Economics & Trade", tuition: "18,000¥ ($3,060)", partial: "7,000¥ ($1,190)" },
    ],
    master: [
      { name: "Mechanical / Electrical / Civil Eng.", tuition: "23,000¥ ($3,910)", partial: "10,000¥ ($1,700)" },
      { name: "Biology & Medicine", tuition: "23,000¥ ($3,910)", partial: "10,000¥ ($1,700)" },
      { name: "Architecture & Computer Science", tuition: "23,000¥ ($3,910)", partial: "10,000¥ ($1,700)" },
      { name: "Business Administration", tuition: "21,000¥ ($3,570)", partial: "10,000¥ ($1,700)" },
    ],
    language: [
      { name: "One Year Chinese Language", tuition: "12,000¥ ($2,040)", partial: "7,000¥" },
    ]
  };

  return (
    // Forces full width and centers the inner container
    <section id="study" className="py-32 bg-white w-full flex justify-center border-b border-slate-100">
      <div className="w-full max-w-7xl px-6 md:px-12">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
              Hubei University of Technology
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Institutional data and tuition structuring for international candidates.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-900">2026 Admissions Cycle</span>
          </div>
        </div>

        <div>
          {/* Added gap-4 to create white space between the tabs */}
          <div className="flex flex-wrap gap-4 border-b border-slate-200 mb-0">
            {['bachelor', 'master', 'language'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm uppercase tracking-widest font-bold transition-colors ${activeTab === tab ? 'border-b-2 border-blue-900 text-blue-900 bg-slate-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="border border-t-0 border-slate-200 overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                  <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/3">Academic Major</th>
                  <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/3">Base Tuition (Per Year)</th>
                  <th className="p-6 border-b border-slate-200 font-semibold w-1/3">With Partial Scholarship</th>
                </tr>
              </thead>
              <tbody>
                {programs[activeTab].map((prog, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group cursor-default">
                    <td className="p-6 border-b border-r border-slate-200 text-slate-900 font-medium group-hover:text-blue-900 transition-colors">{prog.name}</td>
                    <td className="p-6 border-b border-r border-slate-200 text-slate-600 font-light">{prog.tuition}</td>
                    <td className="p-6 border-b border-slate-200 text-blue-700 font-medium">{prog.partial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 w-full">
            <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Single Room</h4>
              <p className="text-2xl font-light text-slate-900">10,000¥ <span className="text-sm text-slate-500">/ $1,700 yr</span></p>
            </div>
            <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Twin Room</h4>
              <p className="text-2xl font-light text-slate-900">6,000¥ <span className="text-sm text-slate-500">/ $1,020 yr</span></p>
            </div>
            <div className="p-8">
              <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Triple Room</h4>
              <p className="text-2xl font-light text-slate-900">3,000¥ <span className="text-sm text-slate-500">/ $510 yr</span></p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}