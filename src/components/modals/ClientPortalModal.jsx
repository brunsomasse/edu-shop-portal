import { useState, useEffect } from 'react';
import {
  X, Upload, Send, FileText, MessageSquare, LogOut,
  CheckCircle2, AlertCircle, Loader2, Mail, Lock, User,
  Building2, ShieldCheck, Eye, EyeOff, ArrowRight, FileCheck2,
  Phone, Globe, Check, ShieldAlert, ExternalLink, Save
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import logoImg from '../../assets/edushop-global-logo-transparent.png';

const ADMIN_EMAIL = 'brunsomasse@gmail.com';

const COUNTRIES = [
  'Ghana', 'Benin', 'Nigeria', 'Côte d\'Ivoire', 'Togo', 'Senegal',
  'Cameroon', 'Kenya', 'South Africa', 'China', 'United Kingdom',
  'United States', 'Canada', 'France', 'Germany', 'United Arab Emirates'
];

export default function ClientPortalModal({ isOpen, onClose, session, initialContext }) {
  const [authMode, setAuthMode] = useState('login');
  const [activeTab, setActiveTab] = useState('documents');
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  // Auth & Profile fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState('Student Candidate (HBUT)');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  // Document upload fields
  const [docType, setDocType] = useState('Passport Copy');
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Inquiry fields
  const [category, setCategory] = useState('Study in China (HBUT)');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [inquiries, setInquiries] = useState([]);

  // Admin draft edits
  const [docEdits, setDocEdits] = useState({});
  const [inqEdits, setInqEdits] = useState({});

  const isAdmin = session?.user?.email?.toLowerCase() === ADMIN_EMAIL;

  const passwordRules = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter (A–Z)', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a–z)', valid: /[a-z]/.test(password) },
    { label: 'One number (0–9)', valid: /[0-9]/.test(password) },
    { label: 'One special character (!@#$...)', valid: /[^A-Za-z0-9]/.test(password) },
  ];
  const isPasswordStrong = passwordRules.every((rule) => rule.valid);

  useEffect(() => {
    if (!isOpen || !initialContext) return;
    if (initialContext.authMode) setAuthMode(initialContext.authMode);
    if (initialContext.tab) setActiveTab(initialContext.tab);
    if (initialContext.category) setCategory(initialContext.category);
    if (initialContext.subject) setSubject(initialContext.subject);
    if (initialContext.accountType) setAccountType(initialContext.accountType);
  }, [isOpen, initialContext]);

  useEffect(() => {
    if (session?.user) {
      if (isAdmin && !initialContext?.tab) {
        setActiveTab('admin');
      }
      fetchUserData();
    }
  }, [session, isAdmin]);

  const fetchUserData = async () => {
    const { data: docs } = await supabase
      .from('document_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (docs) {
      setDocuments(docs);
      const nextDocEdits = {};
      docs.forEach((d) => {
        nextDocEdits[d.id] = { status: d.status || 'Under Review', admin_notes: d.admin_notes || '' };
      });
      setDocEdits(nextDocEdits);
    }

    const { data: inqs } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (inqs) {
      setInquiries(inqs);
      const nextInqEdits = {};
      inqs.forEach((i) => {
        nextInqEdits[i.id] = { status: i.status || 'Received', admin_notes: i.admin_notes || '' };
      });
      setInqEdits(nextInqEdits);
    }
  };

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    if (authMode === 'signup' && !isPasswordStrong) {
      setFeedback({
        type: 'error',
        text: 'Please meet all password security requirements before creating your account.'
      });
      return;
    }

    setLoading(true);

    if (authMode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            account_type: accountType,
            phone: phone.trim(),
            country: country.trim()
          }
        }
      });
      if (error) {
        setFeedback({ type: 'error', text: error.message });
      } else {
        setFeedback({
          type: 'success',
          text: 'Account created. Check your inbox to confirm your email address before signing in.'
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setFeedback({ type: 'error', text: error.message });
      }
    }
    setLoading(false);
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !session?.user) return;
    setLoading(true);
    setFeedback({ type: '', text: '' });

    const fileExt = selectedFile.name.split('.').pop();
    const filePath = `${session.user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('client-documents')
      .upload(filePath, selectedFile);

    if (uploadError) {
      setFeedback({ type: 'error', text: uploadError.message });
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase.from('document_submissions').insert({
      user_id: session.user.id,
      document_type: docType,
      file_name: selectedFile.name,
      file_path: filePath
    });

    if (dbError) {
      setFeedback({ type: 'error', text: dbError.message });
    } else {
      setFeedback({ type: 'success', text: 'Document encrypted and uploaded to your dossier.' });
      setSelectedFile(null);
      fetchUserData();
    }
    setLoading(false);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!session?.user) return;
    setLoading(true);
    setFeedback({ type: '', text: '' });

    const meta = session.user.user_metadata || {};
    const senderInfo = [meta.full_name || session.user.email, meta.country, meta.phone]
      .filter(Boolean)
      .join(' • ');

    const { error } = await supabase.from('inquiries').insert({
      user_id: session.user.id,
      full_name: senderInfo,
      category,
      subject,
      message
    });

    if (error) {
      setFeedback({ type: 'error', text: error.message });
    } else {
      setFeedback({ type: 'success', text: 'Inquiry dispatched. An advisor will respond shortly.' });
      setSubject('');
      setMessage('');
      fetchUserData();
    }
    setLoading(false);
  };

  const handleOpenSignedFile = async (filePath) => {
    const { data, error } = await supabase.storage
      .from('client-documents')
      .createSignedUrl(filePath, 3600);

    if (error) {
      setFeedback({ type: 'error', text: `Unable to open file: ${error.message}` });
      return;
    }
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveDocReview = async (docId) => {
    const edit = docEdits[docId];
    if (!edit) return;
    setSavingId(docId);
    setFeedback({ type: '', text: '' });

    const { error } = await supabase
      .from('document_submissions')
      .update({ status: edit.status, admin_notes: edit.admin_notes })
      .eq('id', docId);

    if (error) {
      setFeedback({ type: 'error', text: error.message });
    } else {
      setFeedback({ type: 'success', text: 'Document review status and advisor note saved.' });
      fetchUserData();
    }
    setSavingId(null);
  };

  const handleSaveInqReview = async (inqId) => {
    const edit = inqEdits[inqId];
    if (!edit) return;
    setSavingId(inqId);
    setFeedback({ type: '', text: '' });

    const { error } = await supabase
      .from('inquiries')
      .update({ status: edit.status, admin_notes: edit.admin_notes })
      .eq('id', inqId);

    if (error) {
      setFeedback({ type: 'error', text: error.message });
    } else {
      setFeedback({ type: 'success', text: 'Inquiry status and advisor response saved.' });
      fetchUserData();
    }
    setSavingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDocuments([]);
    setInquiries([]);
    setFeedback({ type: '', text: '' });
  };

  const myDocuments = isAdmin
    ? documents.filter((d) => d.user_id === session?.user?.id)
    : documents;
  const myInquiries = isAdmin
    ? inquiries.filter((i) => i.user_id === session?.user?.id)
    : inquiries;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!session ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <img
                  src={logoImg}
                  alt="EduShop Global"
                  className="h-10 w-auto object-contain brightness-0 invert mb-10"
                />
                <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-blue-300 font-semibold bg-blue-900/50 border border-blue-700/50 px-3 py-1 rounded-full mb-4">
                  Client & Candidate Gateway
                </span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight leading-snug">
                  Cross-Border Admissions & Commercial Trade
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed mt-4">
                  Submit verified academic dossiers for Hubei University of Technology (HBUT) or manage global vehicle and industrial procurement inquiries.
                </p>
              </div>

              <div className="relative z-10 space-y-3 pt-8 border-t border-white/10 mt-8">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>End-to-end encrypted document vault</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <FileCheck2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Real-time application & quotation tracking</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                aria-label="Close portal"
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h4 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  {authMode === 'login' ? 'Welcome back' : 'Create your portal account'}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  {authMode === 'login'
                    ? 'Sign in to access your submitted documents and active inquiries.'
                    : 'Register as a student candidate or institutional trade partner.'}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setFeedback({ type: '', text: '' }); }}
                  className={`py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setFeedback({ type: '', text: '' }); }}
                  className={`py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {feedback.text && (
                <div className={`mb-5 p-3.5 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
                  feedback.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {feedback.type === 'error'
                    ? <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    : <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>{feedback.text}</span>
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name / Entity</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe / Acme Ltd"
                            className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Account Profile</label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <select
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 pl-10 pr-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                          >
                            <option>Student Candidate (HBUT)</option>
                            <option>Commercial / Trade Buyer</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone / WhatsApp Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+233 24 000 0000"
                            className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Country / Region</label>
                        <div className="relative">
                          <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            list="country-options"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Select or type country"
                            className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                          />
                          <datalist id="country-options">
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={authMode === 'signup' ? 8 : 6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={authMode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                      className="w-full rounded-xl border border-slate-300 pl-10 pr-11 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {authMode === 'signup' && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {passwordRules.map((rule) => (
                        <div
                          key={rule.label}
                          className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${
                            rule.valid ? 'text-emerald-700' : 'text-slate-500'
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                              rule.valid ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-transparent'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          <span>{rule.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || (authMode === 'signup' && !isPasswordStrong)}
                  className="w-full mt-2 bg-blue-950 text-white py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-950/20 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{authMode === 'login' ? 'Access Client Portal' : 'Create Secure Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white px-8 py-6 flex flex-wrap justify-between items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300 font-semibold">
                    {isAdmin ? 'Director & Admin Command' : (session.user.user_metadata?.account_type || 'Verified Client Workspace')}
                  </p>
                  {isAdmin && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      Admin
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-light mt-1">
                  {session.user.user_metadata?.full_name || session.user.email}
                </h3>
                {(session.user.user_metadata?.country || session.user.user_metadata?.phone) && (
                  <p className="text-xs text-slate-300 mt-1">
                    {[session.user.user_metadata?.country, session.user.user_metadata?.phone]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {feedback.text && (
              <div className={`px-8 py-3.5 text-xs font-medium flex items-center gap-2 border-b ${
                feedback.type === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{feedback.text}</span>
              </div>
            )}

            <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
              <div className="inline-flex flex-wrap bg-slate-100 p-1 rounded-xl mb-8 gap-1">
                {isAdmin && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'admin'
                        ? 'bg-blue-950 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4" /> Admin Review ({documents.length + inquiries.length})
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'documents'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" /> My Documents ({myDocuments.length})
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'inquiries'
                      ? 'bg-white text-blue-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" /> My Inquiries ({myInquiries.length})
                </button>
              </div>

              {activeTab === 'admin' && isAdmin ? (
                <div className="space-y-10">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs uppercase tracking-widest font-bold text-slate-600">
                        All Client Document Submissions ({documents.length})
                      </h4>
                      <button
                        onClick={fetchUserData}
                        className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
                      >
                        Refresh Records
                      </button>
                    </div>

                    {documents.length === 0 ? (
                      <div className="text-center py-8 rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500">
                        No client documents submitted yet.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {documents.map((doc) => {
                          const edit = docEdits[doc.id] || { status: doc.status, admin_notes: doc.admin_notes || '' };
                          return (
                            <div key={doc.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                              <div className="flex flex-wrap justify-between items-start gap-3">
                                <div>
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                                    {doc.document_type}
                                  </span>
                                  <p className="font-semibold text-slate-900 text-sm mt-0.5">{doc.file_name}</p>
                                  <p className="text-[11px] text-slate-400 mt-0.5">
                                    Client ID: {doc.user_id.slice(0, 8)}… • {new Date(doc.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleOpenSignedFile(doc.file_path)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 text-slate-800 hover:border-blue-900 hover:text-blue-900 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" /> Inspect File
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-3 border-t border-slate-200/80">
                                <div className="md:col-span-3">
                                  <select
                                    value={edit.status}
                                    onChange={(e) => setDocEdits({
                                      ...docEdits,
                                      [doc.id]: { ...edit, status: e.target.value }
                                    })}
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold bg-white"
                                  >
                                    <option>Under Review</option>
                                    <option>Approved</option>
                                    <option>Missing Document</option>
                                    <option>Action Required</option>
                                  </select>
                                </div>
                                <div className="md:col-span-6">
                                  <input
                                    type="text"
                                    value={edit.admin_notes}
                                    onChange={(e) => setDocEdits({
                                      ...docEdits,
                                      [doc.id]: { ...edit, admin_notes: e.target.value }
                                    })}
                                    placeholder="Add advisor note visible to client..."
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white"
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <button
                                    type="button"
                                    disabled={savingId === doc.id}
                                    onClick={() => handleSaveDocReview(doc.id)}
                                    className="w-full bg-blue-950 text-white py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-900 flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                    {savingId === doc.id ? 'Saving...' : 'Update'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-600 mb-4">
                      All Client Inquiries & Quote Requests ({inquiries.length})
                    </h4>

                    {inquiries.length === 0 ? (
                      <div className="text-center py-8 rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500">
                        No client inqu yet.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {inquiries.map((inq) => {
                          const edit = inqEdits[inq.id] || { status: inq.status, admin_notes: inq.admin_notes || '' };
                          return (
                            <div key={inq.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                              <div>
                                <div className="flex flex-wrap justify-between items-center gap-2">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                                    {inq.category}
                                  </span>
                                  <span className="text-[11px] text-slate-400">
                                    {new Date(inq.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="font-semibold text-slate-900 text-sm mt-1">{inq.subject}</p>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">From: {inq.full_name}</p>
                                <p className="text-xs text-slate-700 mt-2 bg-white p-3 rounded-xl border border-slate-200/80">
                                  {inq.message}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-3 border-t border-slate-200/80">
                                <div className="md:col-span-3">
                                  <select
                                    value={edit.status}
                                    onChange={(e) => setInqEdits({
                                      ...inqEdits,
                                      [inq.id]: { ...edit, status: e.target.value }
                                    })}
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold bg-white"
                                  >
                                    <option>Received</option>
                                    <option>In Progress</option>
                                    <option>Quote Sent</option>
                                    <option>Admission Offer Issued</option>
                                    <option>Resolved</option>
                                  </select>
                                </div>
                                <div className="md:col-span-6">
                                  <input
                                    type="text"
                                    value={edit.admin_notes}
                                    onChange={(e) => setInqEdits({
                                      ...inqEdits,
                                      [inq.id]: { ...edit, admin_notes: e.target.value }
                                    })}
                                    placeholder="Write advisor response / CIF quote reference..."
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white"
                                  />
                                </div>
                                <div className="md:col-span-3">
                                  <button
                                    type="button"
                                    disabled={savingId === inq.id}
                                    onClick={() => handleSaveInqReview(inq.id)}
                                    className="w-full bg-blue-950 text-white py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-900 flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                    {savingId === inq.id ? 'Saving...' : 'Update'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : activeTab === 'documents' ? (
                <div className="space-y-8">
                  <form onSubmit={handleDocumentUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Document Category</label>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-900"
                      >
                        <option>Passport Copy</option>
                        <option>Academic Transcript / Diploma</option>
                        <option>Physical Examination Form</option>
                        <option>Company Registration / PO</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">File (PDF, JPG, PNG)</label>
                      <input
                        type="file"
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:bg-blue-950 file:text-white file:font-semibold hover:file:bg-blue-900 cursor-pointer"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !selectedFile}
                      className="bg-blue-950 text-white py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-blue-900 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer transition-all"
                    >
                      <Upload className="w-4 h-4" /> Upload Document
                    </button>
                  </form>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">Submitted Dossier</h4>
                    {myDocuments.length === 0 ? (
                      <div className="text-center py-10 rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500">
                        No documents uploaded yet. Upload your passport, transcripts, or purchase order above.
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                        {myDocuments.map((doc) => (
                          <div key={doc.id} className="p-4 bg-white hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-center text-sm">
                              <div>
                                <p className="font-semibold text-slate-900">{doc.document_type}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{doc.file_name}</p>
                              </div>
                              <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                                {doc.status}
                              </span>
                            </div>
                            {doc.admin_notes && (
                              <p className="mt-2.5 text-xs text-slate-700 bg-blue-50/60 border border-blue-100 rounded-xl px-3.5 py-2">
                                <span className="font-semibold text-blue-950">Advisor Note:</span> {doc.admin_notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <form onSubmit={handleInquirySubmit} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Department</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-900"
                        >
                          <option>Study in China (HBUT)</option>
                          <option>Global Shop — Vehicles & Trucks</option>
                          <option>Global Shop — Tech & Industrial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject</label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="e.g., CS Scholarship / BYD Tang CIF Quote"
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Inquiry Details</label>
                      <textarea
                        rows="3"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Provide your academic background or target specifications and destination port..."
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-950 text-white py-3 px-6 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-blue-900 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4" /> Submit Inquiry
                    </button>
                  </form>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">Inquiry History</h4>
                    {myInquiries.length === 0 ? (
                      <div className="text-center py-10 rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500">
                        No inquiries submitted yet.
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                        {myInquiries.map((inq) => (
                          <div key={inq.id} className="p-4 bg-white hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start gap-4 text-sm">
                              <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">{inq.category}</span>
                                <p className="font-semibold text-slate-900 mt-0.5">{inq.subject}</p>
                                <p className="text-xs text-slate-600 mt-1">{inq.message}</p>
                              </div>
                              <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 shrink-0">
                                {inq.status}
                              </span>
                            </div>
                            {inq.admin_notes && (
                              <p className="mt-2.5 text-xs text-slate-700 bg-blue-50/60 border border-blue-100 rounded-xl px-3.5 py-2">
                                <span className="font-semibold text-blue-950">Advisor Reply:</span> {inq.admin_notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
