import { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Copy, ExternalLink, Globe, GraduationCap } from 'lucide-react';

// Replace with your direct IOU recruiter referral URL once issued by IOU
const IOU_PORTAL_URL = 'https://iou.edu.gm/';
const RECRUITER_NAME = 'Ayetobi Brun SOMASSE';
const RECRUITER_EMAIL = 'brunsomasse@gmail.com';

export default function Study({ onOpenPortal }) {
  const [studyTrack, setStudyTrack] = useState('china');
  const [activeTab, setActiveTab] = useState('bachelor');
  const [iouLevel, setIouLevel] = useState('bachelor');
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    const handleTrackChange = (e) => {
      if (e.detail === 'china' || e.detail === 'iou') {
        setStudyTrack(e.detail);
      }
    };
    window.addEventListener('select-study-track', handleTrackChange);
    return () => window.removeEventListener('select-study-track', handleTrackChange);
  }, []);

  const programs = {
    bachelor: [
      { name: 'Computer Science', tuition: '20,000¥ ($3,400)', partial: '7,000¥ ($1,190)' },
      { name: 'Mechanical Engineering', tuition: '20,000¥ ($3,400)', partial: '7,000¥ ($1,190)' },
      { name: 'Architecture', tuition: '20,000¥ ($3,400)', partial: '7,000¥ ($1,190)' },
      { name: 'International Economics & Trade', tuition: '18,000¥ ($3,060)', partial: '7,000¥ ($1,190)' },
    ],
    master: [
      { name: 'Mechanical / Electrical / Civil Eng.', tuition: '23,000¥ ($3,910)', partial: '10,000¥ ($1,700)' },
      { name: 'Biology & Medicine', tuition: '23,000¥ ($3,910)', partial: '10,000¥ ($1,700)' },
      { name: 'Architecture & Computer Science', tuition: '23,000¥ ($3,910)', partial: '10,000¥ ($1,700)' },
      { name: 'Business Administration', tuition: '21,000¥ ($3,570)', partial: '10,000¥ ($1,700)' },
    ],
    language: [
      { name: 'One Year Chinese Language', tuition: '12,000¥ ($2,040)', partial: '7,000¥' },
    ],
  };

  const iouPrograms = {
    bachelor: [
      {
        name: 'BSc in Information Technology',
        duration: '4 Years (8 Semesters)',
        format: '100% Online • Self-Paced Exams',
        highlights: 'Software engineering, databases, networking & systems architecture',
      },
      {
        name: 'BBA in Business Administration',
        duration: '4 Years (8 Semesters)',
        format: '100% Online • Global Accreditation',
        highlights: 'Management, entrepreneurship, finance & organizational leadership',
      },
      {
        name: 'BSc in Islamic Economics, Banking & Finance',
        duration: '4 Years (8 Semesters)',
        format: '100% Online • Flexible Schedule',
        highlights: 'Ethical finance, financial modeling, economics & banking operations',
      },
      {
        name: 'BA in Islamic Studies / Education / Psychology',
        duration: '4 Years (8 Semesters)',
        format: '100% Online • Multi-Language Tracks',
        highlights: 'Structured academic curriculum accessible from any country',
      },
    ],
    master: [
      {
        name: 'MSc in Information Technology',
        duration: '2 Years (4 Semesters)',
        format: '100% Online • Research & Applied Track',
        highlights: 'Advanced computing, enterprise systems & applied thesis',
      },
      {
        name: 'MBA / Master in Business Administration',
        duration: '2 Years (4 Semesters)',
        format: '100% Online • Executive Friendly',
        highlights: 'Strategic management, global trade & corporate governance',
      },
      {
        name: 'MA in Islamic Studies / Education',
        duration: '2 Years (4 Semesters)',
        format: '100% Online • Live & Recorded Seminars',
        highlights: 'Postgraduate research and academic specialization',
      },
    ],
    certificate: [
      {
        name: 'Associate Degrees & Intensive Diplomas',
        duration: '1 – 2 Years',
        format: '100% Online • Open Enrollment',
        highlights: 'Fast-track foundational credentials in IT, Business, Arabic & Education',
      },
      {
        name: 'Global Quran & Arabic Language Programs',
        duration: 'Flexible Semester Modules',
        format: '100% Online • Live Instructor Sessions',
        highlights: 'Structured reading, fluency, and classical language mastery',
      },
    ],
  };

  const handleApplyChina = (programName = 'General Admission & Scholarship') => {
    const levelLabel = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    onOpenPortal?.({
      authMode: 'signup',
      accountType: 'Student Candidate (HBUT)',
      tab: 'inquiries',
      category: 'Study in China (HBUT)',
      subject: `HBUT ${levelLabel} Application — ${programName}`,
    });
  };

  const handleRequestIouGuidance = (programName = 'General IOU Online Admission') => {
    const levelLabel = iouLevel.charAt(0).toUpperCase() + iouLevel.slice(1);
    onOpenPortal?.({
      authMode: 'signup',
      accountType: 'Student Candidate (IOU Online)',
      tab: 'inquiries',
      category: 'Study from Everywhere (IOU)',
      subject: `IOU Online ${levelLabel} Guidance — ${programName}`,
    });
  };

  const copyRecruiterDetail = (value, label) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <section id="study" className="py-32 bg-white w-full flex justify-center border-b border-slate-100">
      <div className="w-full max-w-7xl px-6 md:px-12">
        {/* Pathway Switcher Banner */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setStudyTrack('china')}
            className={`inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-widest font-bold border transition-colors cursor-pointer ${
              studyTrack === 'china'
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Study in China (On-Campus)
          </button>

          <button
            type="button"
            onClick={() => setStudyTrack('iou')}
            className={`inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-widest font-bold border transition-colors cursor-pointer ${
              studyTrack === 'iou'
                ? 'bg-emerald-800 text-white border-emerald-800'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            Study from Everywhere (IOU Online)
          </button>
        </div>

        {studyTrack === 'china' ? (
          <>
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-12 gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-3">
                  Study in China • Campus Placement
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
                  Hubei University of Technology
                </h2>
                <p className="text-lg text-slate-600 font-light">
                  Institutional data and tuition structuring for international candidates.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-blue-900">
                  2026 Admissions Cycle
                </span>
                <button
                  type="button"
                  onClick={() => handleApplyChina()}
                  className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Start Application <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-4 border-b border-slate-200 mb-0">
                {['bachelor', 'master', 'language'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 text-sm uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-900 text-blue-900 bg-slate-50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="border border-t-0 border-slate-200 overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                      <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/3">
                        Academic Major
                      </th>
                      <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/3">
                        Base Tuition (Per Year)
                      </th>
                      <th className="p-6 border-b border-slate-200 font-semibold w-1/3">
                        With Partial Scholarship
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs[activeTab].map((prog, idx) => (
                      <tr
                        key={idx}
                        onClick={() => handleApplyChina(prog.name)}
                        title="Click to apply for this program"
                        className="hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <td className="p-6 border-b border-r border-slate-200 text-slate-900 font-medium group-hover:text-blue-900 transition-colors">
                          {prog.name}
                        </td>
                        <td className="p-6 border-b border-r border-slate-200 text-slate-600 font-light">
                          {prog.tuition}
                        </td>
                        <td className="p-6 border-b border-slate-200 text-blue-700 font-medium">
                          <div className="flex items-center justify-between gap-2">
                            <span>{prog.partial}</span>
                            <span className="text-[11px] uppercase tracking-wider font-bold text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                              Apply <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 w-full">
                <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                    Single Room
                  </h4>
                  <p className="text-2xl font-light text-slate-900">
                    10,000¥ <span className="text-sm text-slate-500">/ $1,700 yr</span>
                  </p>
                </div>
                <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                    Twin Room
                  </h4>
                  <p className="text-2xl font-light text-slate-900">
                    6,000¥ <span className="text-sm text-slate-500">/ $1,020 yr</span>
                  </p>
                </div>
                <div className="p-8">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                    Triple Room
                  </h4>
                  <p className="text-2xl font-light text-slate-900">
                    3,000¥ <span className="text-sm text-slate-500">/ $510 yr</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Study from Everywhere — International Open University (IOU) */}
            <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-12 gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">
                  Study from Everywhere • 100% Accredited Online Campus
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
                  International Open University
                </h2>
                <p className="text-lg text-slate-600 font-light">
                  Earn internationally recognized Certificates, Associate, Bachelor’s, and Master’s
                  degrees from anywhere in the world without visa or relocation barriers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRequestIouGuidance()}
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white text-slate-900 px-5 py-3 text-xs uppercase tracking-widest font-bold hover:border-emerald-800 transition-colors cursor-pointer"
                >
                  Admission Guidance <ArrowUpRight className="w-4 h-4" />
                </button>
                <a
                  href={IOU_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-800 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-emerald-700 transition-colors"
                >
                  Apply on IOU Portal <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Official Recruiter Attribution Box */}
            <div className="mb-12 bg-emerald-50/70 border border-emerald-200 p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-1">
                  Official IOU Student Recruiter Support
                </span>
                <h3 className="text-lg font-medium text-slate-900 mt-3">
                  Dedicated Admission Walkthrough & Enrollment Verification
                </h3>
                <p className="text-sm text-slate-600 font-light mt-1">
                  When completing your registration on{' '}
                  <a
                    href={IOU_PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-emerald-800 underline"
                  >
                    iou.edu.gm
                  </a>
                  , enter the official recruiter details below on the sign-up form so we can track
                  your admission and assist you with course selection and exam center setup:
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => copyRecruiterDetail(RECRUITER_NAME, 'name')}
                  className="bg-white border border-emerald-200 px-4 py-3 text-left hover:border-emerald-600 transition-colors cursor-pointer"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Recruiter Name
                  </span>
                  <span className="text-xs font-semibold text-slate-900 inline-flex items-center gap-2 mt-0.5">
                    {RECRUITER_NAME}
                    {copiedField === 'name' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => copyRecruiterDetail(RECRUITER_EMAIL, 'email')}
                  className="bg-white border border-emerald-200 px-4 py-3 text-left hover:border-emerald-600 transition-colors cursor-pointer"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Recruiter Email ID
                  </span>
                  <span className="text-xs font-semibold text-slate-900 inline-flex items-center gap-2 mt-0.5">
                    {RECRUITER_EMAIL}
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* IOU Degree Level Tabs */}
            <div>
              <div className="flex flex-wrap gap-4 border-b border-slate-200 mb-0">
                {[
                  { key: 'bachelor', label: "Bachelor's Degrees" },
                  { key: 'master', label: "Master's Degrees" },
                  { key: 'certificate', label: 'Certificates & Diplomas' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setIouLevel(tab.key)}
                    className={`px-8 py-4 text-sm uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                      iouLevel === tab.key
                        ? 'border-b-2 border-emerald-800 text-emerald-800 bg-slate-50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="border border-t-0 border-slate-200 overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                      <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/3">
                        Online Discipline
                      </th>
                      <th className="p-6 border-b border-r border-slate-200 font-semibold w-1/4">
                        Duration & Mode
                      </th>
                      <th className="p-6 border-b border-slate-200 font-semibold">
                        Curriculum Focus & Enrollment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {iouPrograms[iouLevel].map((prog, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-6 border-b border-r border-slate-200 text-slate-900 font-medium">
                          {prog.name}
                        </td>
                        <td className="p-6 border-b border-r border-slate-200 text-slate-600 font-light text-sm">
                          <div className="font-medium text-slate-800">{prog.duration}</div>
                          <div className="text-xs text-emerald-700 mt-1">{prog.format}</div>
                        </td>
                        <td className="p-6 border-b border-slate-200 text-sm text-slate-600">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="font-light">{prog.highlights}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleRequestIouGuidance(prog.name)}
                                className="px-3 py-1.5 border border-slate-300 text-slate-800 hover:border-emerald-800 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Free Guidance
                              </button>
                              <a
                                href={IOU_PORTAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                              >
                                Enroll <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 w-full">
                <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                    Study Mode
                  </h4>
                  <p className="text-2xl font-light text-slate-900">
                    100% Online <span className="text-sm text-slate-500">/ Global Access</span>
                  </p>
                </div>
                <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                    Tuition Model
                  </h4>
                  <p className="text-2xl font-light text-slate-900">
                    Semester-Based <span className="text-sm text-slate-500">/ Country-Tiered</span>
                  </p>
                </div>
                <div className="p-8">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                    Exam Centers
                  </h4>
                  <p className="text-2xl font-light text-slate-900">
                    120+ Countries <span className="text-sm text-slate-500">/ Approved Proctoring</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
