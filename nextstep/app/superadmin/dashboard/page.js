"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
   Shield,
   TrendingUp,
   Users,
   Lock,
   Zap,
   BarChart3,
   Globe,
   MessageSquare,
   ShieldAlert,
   FileText,
   ExternalLink,
   CheckCircle2,
   DollarSign,
   Target,
   Search,
   Mail,
   Bug,
   Database,
   UserCheck,
   Sparkles,
   LogOut,
   Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuperAdminDashboard() {
   const [activeTab, setActiveTab] = React.useState('revenue')
   const [isEditingPolicies, setIsEditingPolicies] = React.useState(false)

   const renderSidebarItem = (id, label, icon) => (
      <button
         onClick={() => setActiveTab(id)}
         className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold text-sm transition-all relative group ${activeTab === id ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
      >
         {icon}
         <span className="hidden lg:block">{label}</span>
         {activeTab === id && (
            <motion.div
               layoutId="active-pill-super"
               className="absolute right-3 w-1.5 h-6 bg-indigo-500 rounded-full"
            />
         )}
      </button>
   )

   return (
      <div className="flex h-screen overflow-hidden bg-[#f0f2f5] text-slate-900 font-sans">
         {/* SIDEBAR */}
         <aside className="w-20 lg:w-80 bg-white border-r border-slate-200 flex flex-col z-30 shrink-0 shadow-[10px_0_40px_rgba(0,0,0,0.03)]">
            <div className="p-8 pb-10">
               <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-slate-950 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl rotate-3">
                     <Shield size={24} />
                  </div>
                  <div className="hidden lg:block">
                     <h1 className="text-xl font-black tracking-tighter">SuperAdmin</h1>
                     <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none mt-1">NextStep Control</p>
                  </div>
               </div>

               <nav className="space-y-3">
                  {renderSidebarItem('revenue', 'Revenue Models', <DollarSign size={20} />)}
                  {renderSidebarItem('marketing', 'Marketing Strategy', <Target size={20} />)}
                  {renderSidebarItem('crm', 'CRM & Feedback Intel', <MessageSquare size={20} />)}
                  {renderSidebarItem('security', 'Security & Policies', <Shield size={20} />)}
               </nav>
            </div>

            <div className="mt-auto p-8 pt-0">
               <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-white font-black">SA</div>
                     <div className="hidden lg:block">
                        <p className="text-xs font-black">Master Admin</p>
                        <p className="text-[9px] font-bold text-slate-400">Authority Level 10</p>
                     </div>
                  </div>
               </div>
               <button onClick={() => window.location.href = '/login'} className="w-full mt-6 py-4 px-6 flex items-center gap-4 text-slate-400 hover:text-red-600 font-black text-xs uppercase tracking-widest transition-all">
                  <LogOut size={18} /> <span className="hidden lg:block">Terminate Session</span>
               </button>
            </div>
         </aside>

         {/* MAIN CONTENT */}
         <main className="flex-1 overflow-y-auto custom-scroll relative">
            <header className="h-28 bg-white/60 backdrop-blur-2xl border-b border-slate-200 px-12 flex items-center justify-between sticky top-0 z-40">
               <div>
                  <h2 className="text-4xl font-black tracking-tight text-slate-900 capitalize italic">
                     {activeTab.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">System Governance Domain</p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="hidden xl:flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm">
                     <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Core Engine: Optimal</p>
                  </div>
                  <button className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-xl transition-all relative">
                     <Bell size={24} />
                     <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-4 border-white" />
                  </button>
               </div>
            </header>

            <div className="p-12">
               <AnimatePresence mode="wait">
                  {activeTab === 'revenue' && (
                     <motion.div
                        key="revenue"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           {[
                              {
                                 title: "Subscription Model",
                                 desc: "Employer Pro Plans",
                                 val: "$42k",
                                 metric: "MRR",
                                 icon: <Sparkles className="text-indigo-600" />,
                                 bg: "bg-indigo-50",
                                 border: "border-indigo-100",
                                 trend: "+12%"
                              },
                              {
                                 title: "Advertising Model",
                                 desc: "Sponsored Job Placements",
                                 val: "$18k",
                                 metric: "MRR",
                                 icon: <Zap className="text-amber-600" />,
                                 bg: "bg-amber-50",
                                 border: "border-amber-100",
                                 trend: "+8%"
                              },
                              {
                                 title: "Affiliate Model",
                                 desc: "Skill Course Referrals",
                                 val: "$5k",
                                 metric: "MRR",
                                 icon: <ExternalLink className="text-emerald-600" />,
                                 bg: "bg-emerald-50",
                                 border: "border-emerald-100",
                                 trend: "+35%"
                              },
                           ].map((item, i) => (
                              <div key={i} className={`p-10 rounded-[3rem] border ${item.border} ${item.bg} relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all`}>
                                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
                                 <div className="flex justify-between items-start mb-10">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                                       {item.icon}
                                    </div>
                                    <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">{item.trend}</span>
                                 </div>
                                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.title}</h3>
                                 <div className="flex items-baseline gap-2">
                                    <h4 className="text-5xl font-black text-slate-900 tracking-tighter italic">{item.val}</h4>
                                    <span className="text-sm font-black text-slate-400 italic">{item.metric}</span>
                                 </div>
                                 <p className="mt-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">{item.desc}</p>
                              </div>
                           ))}
                        </div>

                        <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl">
                           <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
                           <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                              <div className="flex-1 space-y-8">
                                 <h3 className="text-4xl font-black italic tracking-tighter">Theoretical Revenue <span className="text-indigo-400 underline decoration-indigo-400/30">Optimization</span></h3>
                                 <p className="text-slate-400 text-lg leading-relaxed font-medium">Our triple-tier monetization architecture ensures fiscal sustainability across different market segments, from enterprise employers to individual career pivots.</p>
                                 <div className="flex gap-4">
                                    <Button className="h-14 px-10 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all">Download Fiscal Audit</Button>
                                    <Button variant="outline" className="h-14 px-10 border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all">Simulation Sandbox</Button>
                                 </div>
                              </div>
                              <div className="w-full md:w-80 h-80 bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center gap-8 backdrop-blur-xl">
                                 {[
                                    { label: "Active Pro Subs", val: "842" },
                                    { label: "Avg Placement Fee", val: "$450" },
                                    { label: "Course Referral %", val: "12.5%" }
                                 ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                       <span className="text-lg font-black italic">{stat.val}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  )}

                  {activeTab === 'marketing' && (
                     <motion.div
                        key="marketing"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="space-y-8"
                     >
                        <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden">
                           <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                              <div>
                                 <h3 className="text-2xl font-black italic tracking-tight">Active Channels</h3>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Multi-Channel Growth Strategy</p>
                              </div>
                              <div className="flex gap-3">
                                 <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest">Live Engine</div>
                                 <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-xl transition-all">
                                    <Search size={16} className="text-slate-400" />
                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Filter Strategy</span>
                                 </button>
                              </div>
                           </div>
                           <table className="w-full text-left">
                              <thead>
                                 <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Marketing Channel</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategy Type</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Impressions</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Conversions</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                 {[
                                    { channel: "Google Search Ads", type: "Paid", impressions: "1.2M", conv: "14,200", status: "Active", dot: "bg-emerald-500" },
                                    { channel: "Campus Ambassadors", type: "Referral", impressions: "450k", conv: "3,100", status: "Active", dot: "bg-emerald-500" },
                                    { channel: "LinkedIn Content", type: "Social Media", impressions: "850k", conv: "2,840", status: "Paused", dot: "bg-amber-500" },
                                    { channel: "Career Blog", type: "SEO", impressions: "210k", conv: "4,500", status: "Active", dot: "bg-emerald-500" },
                                 ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                       <td className="px-10 py-8">
                                          <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-black group-hover:rotate-6 transition-transform">
                                                {row.channel[0]}
                                             </div>
                                             <span className="font-black text-slate-900">{row.channel}</span>
                                          </div>
                                       </td>
                                       <td className="px-10 py-8">
                                          <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 inline-block">{row.type}</span>
                                       </td>
                                       <td className="px-10 py-8 font-black text-slate-600 italic tracking-tight">{row.impressions}</td>
                                       <td className="px-10 py-8 font-black text-emerald-600 italic tracking-tight">{row.conv}</td>
                                       <td className="px-10 py-8">
                                          <div className="flex items-center gap-2">
                                             <div className={`w-2 h-2 rounded-full ${row.dot} group-hover:animate-pulse`} />
                                             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{row.status}</span>
                                          </div>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </motion.div>
                  )}

                  {activeTab === 'crm' && (
                     <motion.div
                        key="crm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                     >
                        {/* ALERT BOX */}
                        <div className="bg-red-50 border-2 border-red-200 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-10 shadow-[0_20px_60px_rgba(239,68,68,0.1)] relative overflow-hidden group">
                           <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50" />
                           <div className="w-24 h-24 bg-red-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl relative z-10 group-hover:rotate-12 transition-transform">
                              <ShieldAlert size={48} strokeWidth={2.5} />
                           </div>
                           <div className="flex-1 text-center md:text-left relative z-10">
                              <h3 className="text-3xl font-black text-red-900 italic tracking-tighter mb-2">SYSTEM ALERT: Major Issue Clustered.</h3>
                              <p className="text-red-700/80 font-bold max-w-2xl leading-relaxed">Cluster analysis detected a systemic failure in the tier-1 transaction pipeline. Autonomous resolution protocols have been finalized.</p>
                           </div>
                           <Button className="h-16 px-10 bg-red-900 hover:bg-black text-white font-black rounded-2xl relative z-10 shadow-2xl transition-all">Clear Cluster</Button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                           <div className="bg-white rounded-[4rem] border border-slate-200 p-12 shadow-sm space-y-10">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <h3 className="text-3xl font-black italic tracking-tighter">Automated Feedback Analyzer</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 leading-relaxed">Neural Linguistics Engine Active • Real-time Pulse Assessment</p>
                                 </div>
                                 <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-400 shadow-xl">
                                    <Bug size={32} />
                                 </div>
                              </div>

                              <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] space-y-6">
                                 <div className="flex items-center gap-4 py-4 border-b border-slate-200">
                                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black">1.4k</div>
                                    <p className="text-sm font-bold text-slate-600">Reports Ingested & Sorted</p>
                                 </div>
                                 <div className="flex items-center gap-4 py-4 border-b border-slate-200">
                                    <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center font-black">814</div>
                                    <p className="text-sm font-bold text-slate-600">Flagged: <span className="text-red-700">"Payment Gateway Timeout"</span></p>
                                 </div>
                                 <div className="flex items-center gap-4 py-4">
                                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black"><CheckCircle2 /></div>
                                    <p className="text-sm font-bold text-slate-600">Recovery Procedures Finalized</p>
                                 </div>
                              </div>

                              <div className="bg-indigo-600 text-white p-10 rounded-[3rem] shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[4rem]" />
                                 <p className="text-sm font-black italic leading-relaxed relative z-10">
                                    "The system autonomously analyzed 1,402 user reports within 240ms, identifying the core hardware bottleneck. Corrective apologies and compensatory discounts (₹499 credit) have been dispatched via encrypted mail streams."
                                 </p>
                                 <div className="mt-8 flex gap-4">
                                    <div className="flex -space-x-3">
                                       {[1, 2, 3, 4].map(i => (
                                          <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center text-indigo-600 text-[10px] font-black">U{i}</div>
                                       ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <Mail size={16} className="text-indigo-200" />
                                       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">814 Emails Dispatched</span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-slate-950 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between">
                              <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/30 rounded-full blur-[60px]" />
                              <div>
                                 <h3 className="text-3xl font-black italic tracking-tighter mb-8">CRM Intel Visualization</h3>
                                 <div className="space-y-8">
                                    {[
                                       { label: "User Sentiment Score", val: "B+", color: "bg-emerald-500" },
                                       { label: "Feedback Resolution Speed", val: "1.2s", color: "bg-indigo-500" },
                                       { label: "Churn Prevention Rate", val: "94%", color: "bg-emerald-400" },
                                    ].map((stat, i) => (
                                       <div key={i} className="space-y-3">
                                          <div className="flex justify-between items-end">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</span>
                                             <span className="text-xl font-black italic">{stat.val}</span>
                                          </div>
                                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                             <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: i === 0 ? "82%" : i === 1 ? "95%" : "94%" }}
                                                transition={{ duration: 1.5 }}
                                                className={`h-full ${stat.color} rounded-full`}
                                             />
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                              <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center gap-6">
                                 <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0"><Users size={28} /></div>
                                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">Intel streams sourced from over <span className="text-white">12.5k organic monthly interactions</span>.</p>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  )}

                  {activeTab === 'security' && (
                     <motion.div
                        key="security"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-12"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           {[
                              {
                                 title: "Data Encryption",
                                 policy: "Rest Policy v2.1",
                                 val: "AES-256",
                                 icon: <Lock size={24} />,
                                 color: "text-indigo-600",
                                 bg: "bg-indigo-50",
                                 border: "border-indigo-100",
                                 desc: "Military-grade encryption for all database rest states."
                              },
                              {
                                 title: "Input Validation",
                                 policy: "SQLi Mitigation",
                                 val: "Strict-Mode",
                                 icon: <Database size={24} />,
                                 color: "text-rose-600",
                                 bg: "bg-rose-50",
                                 border: "border-rose-100",
                                 desc: "Parameterized queries with mandatory sanitized input loops."
                              },
                              {
                                 title: "Access Control",
                                 policy: "RBAC Matrix",
                                 val: "Identity-L1",
                                 icon: <UserCheck size={24} />,
                                 color: "text-emerald-600",
                                 bg: "bg-emerald-50",
                                 border: "border-emerald-100",
                                 desc: "Granular role assignment preventing vertical escalation."
                              },
                           ].map((sec, i) => (
                              <div key={i} className={`p-12 rounded-[4rem] border-2 shadow-sm ${sec.bg} ${sec.border} group hover:shadow-2xl hover:bg-white transition-all`}>
                                 <div className={`w-16 h-16 rounded-2xl bg-white mb-10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${sec.color}`}>
                                    {sec.icon}
                                 </div>
                                 <p className="text-[10px] font-black italic text-slate-400 uppercase tracking-widest mb-2 leading-none">{sec.policy}</p>
                                 <h3 className="text-3xl font-black italic tracking-tighter mb-6">{sec.val}</h3>
                                 <p className="text-xs font-bold text-slate-500 leading-relaxed mb-8">{sec.desc}</p>
                                 <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest border-t border-slate-100 pt-8">
                                    <CheckCircle2 size={12} /> Compliance Active
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="bg-white rounded-[4rem] border border-slate-200 p-16 shadow-sm flex flex-col xl:flex-row items-center gap-16">
                           <div className="flex-1">
                              <h3 className="text-4xl font-black italic tracking-tighter mb-6">Legal Artifacts & Compliance</h3>
                              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mb-10">Access the full cryptographic and legal disclosure framework. As a Super Admin, you have the authority to initiate a **Policy Revision Protocol** to update these documents globally.</p>
                              
                              {!isEditingPolicies ? (
                                 <div className="flex flex-wrap gap-6">
                                    <Button onClick={() => window.open('/terms', '_blank')} className="h-16 px-12 bg-slate-900 hover:bg-black text-white font-black rounded-2xl flex items-center gap-4 transition-all shadow-xl active:scale-95">
                                       <FileText size={20} /> View Terms
                                    </Button>
                                    <Button onClick={() => window.open('/privacy', '_blank')} className="h-16 px-12 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-50 font-black rounded-2xl flex items-center gap-4 transition-all shadow-sm active:scale-95">
                                       <Shield size={20} /> View Privacy
                                    </Button>
                                    <Button onClick={() => setIsEditingPolicies(true)} variant="ghost" className="h-16 px-8 text-indigo-600 font-black hover:bg-indigo-50 rounded-2xl flex items-center gap-2">
                                       <Zap size={18} /> Initiate Edit Mode
                                    </Button>
                                 </div>
                              ) : (
                                 <div className="space-y-10 w-full animate-in fade-in zoom-in-95 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                       <div className="space-y-4">
                                          <div className="flex items-center justify-between px-4">
                                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Terms of Service (Markdown)</label>
                                             <Sparkles size={14} className="text-indigo-400" />
                                          </div>
                                          <textarea 
                                             className="w-full h-80 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-[11px] leading-relaxed focus:bg-white focus:ring-8 focus:ring-indigo-600/5 transition-all outline-none"
                                             defaultValue="# Section 01: Acceptance of Agreement..."
                                          />
                                       </div>
                                       <div className="space-y-4">
                                          <div className="flex items-center justify-between px-4">
                                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Privacy Governance (Markdown)</label>
                                             <Lock size={14} className="text-indigo-400" />
                                          </div>
                                          <textarea 
                                             className="w-full h-80 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-[11px] leading-relaxed focus:bg-white focus:ring-8 focus:ring-indigo-600/5 transition-all outline-none"
                                             defaultValue="# Neural Ingestion Integrity..."
                                          />
                                       </div>
                                    </div>
                                    <div className="flex gap-4">
                                       <Button onClick={() => { setIsEditingPolicies(false); }} className="h-16 px-12 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 italic">Commit Policy Revision</Button>
                                       <Button onClick={() => setIsEditingPolicies(false)} variant="ghost" className="h-16 px-10 text-slate-400 font-bold hover:text-slate-900">Abadon Draft</Button>
                                    </div>
                                 </div>
                              )}
                           </div>
                           
                           <div className="w-full md:w-96 bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex flex-col gap-8 relative overflow-hidden shrink-0 h-fit">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-[4rem]" />
                              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">Revision History</h4>
                              {[
                                 { label: "IP Whitelisting", status: "Active" },
                                 { label: "DDoS Mitigation", status: "Shield-Up" },
                                 { label: "Rev v2.1.4", status: "Immutable" },
                                 { label: "Last Patch", status: "Success" },
                              ].map((item, i) => (
                                 <div key={i} className="flex justify-between items-center group cursor-default">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{item.label}</span>
                                    <span className="text-[10px] font-black text-indigo-600 bg-white px-3 py-1 rounded-full border border-indigo-50 shadow-sm">{item.status}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </main>
      </div>
   )
}
