"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, CheckCircle2, Building, PenTool, GraduationCap, Timer, Zap, DollarSign, ArrowRight, Star, Shield, BarChart3, X, Briefcase, Clock, LockKeyhole, Video, Fingerprint, Activity, TrendingUp } from "lucide-react"

export default function Home() {
   const [pricingMode, setPricingMode] = React.useState("subscription")
   const [showJobModal, setShowJobModal] = React.useState(false)

   // Dummy jobs for the popup modal
   const sampleJobs = [
      { title: "Senior Frontend Developer", company: "TechNova", location: "San Francisco, CA", salary: "$120k-$150k" },
      { title: "Product Marketing Manager", company: "GrowthStream", location: "New York, NY", salary: "$90k-$110k" },
      { title: "UI/UX Design Intern", company: "PixelPerfect", location: "Remote", salary: "$30/hr" }
   ]

   const handleSearchClick = (e) => {
      e.preventDefault()
      setShowJobModal(true)
   }

   return (
      <div className="flex flex-col relative w-full overflow-x-hidden">
         {/* 1. HERO SECTION */}
         <section className="relative pt-6 pb-40 overflow-hidden">
            {/* Live Talent Drop Promo Banner */}
            <div className="absolute top-0 left-0 w-full bg-slate-950 border-b border-indigo-500/20 py-3 z-30">
               <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-2 text-indigo-300 font-extrabold tracking-wide text-xs uppercase bg-indigo-500/10 px-3 py-1 rounded border border-indigo-500/20">
                     <Zap size={14} className="text-yellow-400 fill-yellow-400" /> Exclusive Talent Drop
                  </div>
                  <span className="text-slate-300 text-sm font-semibold tracking-wide">Next Top 100 Vetted Engineers Drop In:</span>
                  <div className="flex items-center gap-1.5 text-white font-mono text-sm font-bold bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 shadow-inner">
                     <Timer size={14} className="text-emerald-400" />
                     2h 45m 22s
                  </div>
               </div>
            </div>

            {/* Abstract background graphics */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-300/40 rounded-full mix-blend-multiply blur-[80px] opacity-70 animate-blob pointer-events-none"></div>
            <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full mix-blend-multiply blur-[80px] opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>

            <div className="container mx-auto max-w-5xl px-6 relative z-20 text-center mt-36">
               <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm text-sm font-bold text-slate-700 mb-10 mx-auto hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                  <span className="bg-emerald-500 text-white text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">New</span>
                  Introducing the Pay-Per-Performance Bounty system <ArrowRight size={14} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
               </Link>

               <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1]">
                  Where Top Talent Meets <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-emerald-600 to-indigo-600 bg-300% animate-gradient pb-2 block">World-Class Teams.</span>
               </h1>
               <p className="text-xl md:text-2xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
                  The intelligent recruiting platform utilizing AI-driven matching to organically connect ambitious candidates with scaling organizations completely friction-free.
               </p>

               {/* Floating Hero Search */}
               <form onSubmit={handleSearchClick} className="max-w-4xl mx-auto bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.06)] p-3 flex flex-col md:flex-row gap-3 border border-white/50 ring-1 ring-slate-200 relative z-30">
                  <div className="flex-1 flex items-center px-6 bg-slate-50/50 rounded-2xl border border-transparent focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:bg-white transition-all h-16">
                     <Search className="text-indigo-400 w-6 h-6 mr-3 flex-shrink-0" />
                     <input type="text" placeholder="Job title, keywords, or company" className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 font-semibold text-lg" />
                  </div>
                  <div className="flex-1 flex items-center px-6 bg-slate-50/50 rounded-2xl border border-transparent focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:bg-white transition-all h-16 hidden md:flex">
                     <MapPin className="text-indigo-400 w-6 h-6 mr-3 flex-shrink-0" />
                     <input type="text" placeholder="City, state, or remote" className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 font-semibold text-lg" />
                  </div>
                  <Button type="submit" size="lg" className="h-16 rounded-2xl px-10 w-full md:w-auto text-lg font-bold shadow-indigo-600/30 shadow-xl bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
                     Find Jobs
                  </Button>
               </form>
            </div>
         </section>

         {/* MODAL / POPUP FOR SEARCH */}
         {showJobModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowJobModal(false)}></div>
               <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="bg-indigo-600 p-6 flex items-center justify-between">
                     <div>
                        <h3 className="text-2xl font-black text-white">Top matches found!</h3>
                        <p className="text-indigo-100 font-medium mt-1">Here is a sneak peek at jobs matching your criteria.</p>
                     </div>
                     <button onClick={() => setShowJobModal(false)} className="text-indigo-200 hover:text-white bg-indigo-700/50 p-2 rounded-full transition-colors">
                        <X size={24} />
                     </button>
                  </div>

                  <div className="flex flex-col">
                     {sampleJobs.map((job, idx) => (
                        <div key={idx} className="p-6 border-b border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                           <div>
                              <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">{job.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                 <span className="flex items-center gap-1"><Building size={14} className="text-slate-400" /> {job.company}</span>
                                 <span className="flex items-center gap-1"><MapPin size={14} className="text-slate-400" /> {job.location}</span>
                                 <span className="flex items-center gap-1"><DollarSign size={14} className="text-emerald-500" /> <span className="text-emerald-600">{job.salary}</span></span>
                              </div>
                           </div>
                           <LockKeyhole className="text-slate-300 w-5 h-5 flex-shrink-0" />
                        </div>
                     ))}

                     <div className="p-8 bg-slate-50 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                           <Briefcase size={28} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">Want to see 2,431 more matches?</h4>
                        <p className="text-slate-500 max-w-sm mb-6">Create your profile to unlock full salaries, easy-apply dynamically, and get AI matchmaking.</p>

                        <Link href="/login" className="inline-flex h-14 items-center justify-center rounded-xl bg-indigo-600 px-10 text-lg font-bold text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all w-full md:w-auto">
                           Login or Sign Up to View full Details
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 2. FEATURES SECTION */}
         <section id="features" className="py-32 bg-white relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            <div className="container mx-auto max-w-6xl px-6">
               <div className="text-center mb-20 max-w-3xl mx-auto">
                  <h2 className="text-indigo-600 font-black tracking-widest text-sm uppercase mb-4 text-center">Platform capabilities</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Designed to capture the modern job market completely.</h3>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">How NextStep consistently pipelines ambitious students leveraging massive high-intent organic strategies autonomously.</p>
               </div>

               <div className="grid md:grid-cols-3 gap-10">
                  <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-600/10 hover:-translate-y-2 transition-all duration-300 bg-white rounded-[2rem] group overflow-hidden">
                     <CardHeader className="pt-10 px-8">
                        <div className="w-16 h-16 bg-slate-50 shadow-sm border border-slate-100 text-indigo-600 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                           <GraduationCap size={32} />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Campus Ambassador</CardTitle>
                     </CardHeader>
                     <CardContent className="px-8 pb-10">
                        <p className="text-slate-500 leading-relaxed font-medium text-lg">Partnering directly with top universities and empowering student leaders to onboard fresh talent organically through peer-to-peer campus networks.</p>
                     </CardContent>
                  </Card>

                  <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-600/10 hover:-translate-y-2 transition-all duration-300 bg-white rounded-[2rem] group overflow-hidden">
                     <CardHeader className="pt-10 px-8">
                        <div className="w-16 h-16 bg-slate-50 shadow-sm border border-slate-100 text-emerald-600 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                           <TrendingUp size={32} />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Hyper-Tailored SEO</CardTitle>
                     </CardHeader>
                     <CardContent className="px-8 pb-10">
                        <p className="text-slate-500 leading-relaxed font-medium text-lg">Optimized micro-job boards and comprehensive career advice hubs designed to rank highly on search engines and funnel high-intent organic traffic.</p>
                     </CardContent>
                  </Card>

                  <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-600/10 hover:-translate-y-2 transition-all duration-300 bg-white rounded-[2rem] group overflow-hidden">
                     <CardHeader className="pt-10 px-8">
                        <div className="w-16 h-16 bg-slate-50 shadow-sm border border-slate-100 text-purple-600 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                           <Shield size={32} />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Freemium Enterprise</CardTitle>
                     </CardHeader>
                     <CardContent className="px-8 pb-10">
                        <p className="text-slate-500 leading-relaxed font-medium text-lg">Removing friction completely by allowing startups and large enterprises alike to post their first job entirely for free, skyrocketing employer liquidity naturally.</p>
                     </CardContent>
                  </Card>

                  {/* New Feature 1 */}
                  <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-2 transition-all duration-300 bg-white rounded-[2rem] group overflow-hidden">
                     <CardHeader className="pt-10 px-8">
                        <div className="w-16 h-16 bg-slate-50 shadow-sm border border-slate-100 text-blue-600 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                           <Fingerprint size={32} />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Passkey Security</CardTitle>
                     </CardHeader>
                     <CardContent className="px-8 pb-10">
                        <p className="text-slate-500 leading-relaxed font-medium text-lg">Implementing cutting edge biometric stealth modes giving candidates native privacy from current employers while protecting sensitive credential application data.</p>
                     </CardContent>
                  </Card>

                  {/* New Feature 2 */}
                  <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-pink-600/10 hover:-translate-y-2 transition-all duration-300 bg-white rounded-[2rem] group overflow-hidden">
                     <CardHeader className="pt-10 px-8">
                        <div className="w-16 h-16 bg-slate-50 shadow-sm border border-slate-100 text-pink-600 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                           <Video size={32} />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">TikTok-Style Reels</CardTitle>
                     </CardHeader>
                     <CardContent className="px-8 pb-10">
                        <p className="text-slate-500 leading-relaxed font-medium text-lg">Replacing boring job descriptions with dynamic horizontal "Day In The Life" video components radically boosting candidate trust and overall apply funnels.</p>
                     </CardContent>
                  </Card>

                  {/* New Feature 3 */}
                  <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-600/10 hover:-translate-y-2 transition-all duration-300 bg-white rounded-[2rem] group overflow-hidden">
                     <CardHeader className="pt-10 px-8">
                        <div className="w-16 h-16 bg-slate-50 shadow-sm border border-slate-100 text-orange-500 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                           <Activity size={32} />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Anti-Ghosting CRM</CardTitle>
                     </CardHeader>
                     <CardContent className="px-8 pb-10">
                        <p className="text-slate-500 leading-relaxed font-medium text-lg">Intelligent kanban boards proactively pulsing aggressively red when candidates have sat in the exact stage for 5+ days, empowering one-click notifications.</p>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </section>

         {/* 3. TESTIMONIALS SECTION */}
         <section id="testimonials" className="py-32 bg-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3')] bg-cover bg-center opacity-[0.04] mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl px-6 relative z-10">
               <h2 className="text-4xl md:text-6xl font-black mb-20 text-center text-white tracking-tight">Trusted by hyper-growth teams.</h2>

               <div className="grid md:grid-cols-2 gap-10">
                  {/* Testimonial 1 */}
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                     <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="flex gap-1 text-yellow-400 mb-8">
                        <Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} />
                     </div>
                     <p className="text-2xl text-slate-300 mb-10 italic leading-relaxed font-medium">"NextStep's bounty model completely revolutionized our Q3 hiring sprint. We brought on 4 Senior Engineers in 20 days with zero upfront risk. The AI culture fit tags alone saved us 40 hours in screening calls."</p>
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1rem] flex items-center justify-center font-bold text-xl shadow-lg border border-white/10">SW</div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Sarah Winters</h4>
                           <p className="text-sm text-indigo-400 font-bold uppercase tracking-wider mt-1">VP of Engineering @ FintechX</p>
                        </div>
                     </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                     <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="flex gap-1 text-yellow-400 mb-8">
                        <Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} />
                     </div>
                     <p className="text-2xl text-slate-300 mb-10 italic leading-relaxed font-medium">"The Stealth Mode feature allowed me to passively look for senior roles without triggering alerts at my current agency. I landed my dream job entirely seamlessly. The UI is leaps beyond conventional platforms."</p>
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[1rem] flex items-center justify-center font-bold text-xl shadow-lg border border-white/10">MJ</div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Michael Jordan</h4>
                           <p className="text-sm text-emerald-400 font-bold uppercase tracking-wider mt-1">Lead Designer @ CreativeStudio</p>
                        </div>
                     </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-pink-500/30 transition-colors">
                     <div className="absolute top-0 left-0 w-2 h-full bg-pink-500 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="flex gap-1 text-yellow-400 mb-8">
                        <Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} />
                     </div>
                     <p className="text-2xl text-slate-300 mb-10 italic leading-relaxed font-medium">"Seeing the 'Day in the Life' Culture Reels completely changed how I evaluate companies. I wasn't going to apply until I saw the engineering team dynamically showcasing their setup. NextStep genuinely creates trust."</p>
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-[1rem] flex items-center justify-center font-bold text-xl shadow-lg border border-white/10">AD</div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Anita Davis</h4>
                           <p className="text-sm text-pink-400 font-bold uppercase tracking-wider mt-1">Senior Frontend Engineer</p>
                        </div>
                     </div>
                  </div>

                  {/* Testimonial 4 */}
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-orange-500/30 transition-colors">
                     <div className="absolute top-0 left-0 w-2 h-full bg-orange-500 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="flex gap-1 text-yellow-400 mb-8">
                        <Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} />
                     </div>
                     <p className="text-2xl text-slate-300 mb-10 italic leading-relaxed font-medium">"The Anti-Ghosting nudges natively wired into the Kanban board have completely saved my recruiter reputation. I'm now organically keeping top talent warm while waiting for hiring managers."</p>
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-[1rem] flex items-center justify-center font-bold text-xl shadow-lg border border-white/10">RJ</div>
                        <div>
                           <h4 className="font-bold text-white text-lg">Robert Jenkins</h4>
                           <p className="text-sm text-orange-400 font-bold uppercase tracking-wider mt-1">Head of Talent @ CloudScale</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 4. PRICING / PAYMENTS SECTION */}
         <section id="pricing" className="py-32 bg-[#F8FAFC]">
            <div className="container mx-auto max-w-6xl px-6">
               <div className="text-center mb-20">
                  <h2 className="text-indigo-600 font-black tracking-widest text-sm uppercase mb-4 text-center">Business Models</h2>
                  <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Deeply aligned pricing.</h3>
                  <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 font-medium">
                     Choose traditional unified SaaS or opt into our revolutionary performance-only marketplace scaling.
                  </p>

                  {/* Pricing UI Toggle */}
                  <div className="inline-flex items-center bg-white p-2.5 rounded-full border border-slate-200 shadow-md mx-auto">
                     <button
                        onClick={() => setPricingMode("subscription")}
                        className={`px-10 py-3.5 rounded-full text-base font-black transition-all ${pricingMode === "subscription" ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-800"}`}
                     >
                        Monthly Subscription
                     </button>
                     <button
                        onClick={() => setPricingMode("performance")}
                        className={`px-10 py-3.5 rounded-full text-base font-black transition-all flex items-center gap-2 ${pricingMode === "performance" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30" : "text-slate-500 hover:text-slate-800"}`}
                     >
                        <DollarSign size={20} className={pricingMode === "performance" ? "text-indigo-200" : ""} />
                        Pay-Per-Performance
                     </button>
                  </div>
               </div>

               <div className="grid md:grid-cols-3 gap-8 items-center mt-8 transition-all duration-500 max-w-6xl mx-auto">
                  {pricingMode === "subscription" ? (
                     <>
                        <Card className="shadow-lg border-slate-200 rounded-[2.5rem] bg-white hover:border-slate-300 transition-colors">
                           <CardHeader className="pt-10 px-10">
                              <CardTitle className="text-2xl font-black text-slate-900 mb-2">Basic Starter</CardTitle>
                              <CardDescription className="font-medium text-base text-slate-500">Perfect for ambitious startups making their very first hire.</CardDescription>
                           </CardHeader>
                           <CardContent className="px-10 pb-10">
                              <div className="mb-10 mt-2"><span className="text-6xl font-black text-slate-900 tracking-tighter">Free</span></div>
                              <ul className="space-y-5 mb-10">
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-emerald-500 w-6 h-6 flex-shrink-0" /> 1 Active Job Post</li>
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-emerald-500 w-6 h-6 flex-shrink-0" /> Standard visibility level</li>
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-emerald-500 w-6 h-6 flex-shrink-0" /> Linear applicant list</li>
                              </ul>
                              <Link href="/login" className="flex items-center justify-center w-full h-14 rounded-2xl font-extrabold border-2 text-slate-700 hover:bg-slate-50 border-slate-200 transition-colors text-lg">Deploy Free Post</Link>
                           </CardContent>
                        </Card>

                        <Card className="shadow-2xl shadow-indigo-600/20 border-indigo-600 rounded-[2.5rem] relative transform md:-translate-y-6 bg-white overflow-hidden ring-4 ring-indigo-600/20">
                           <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                           <div className="absolute top-6 right-6 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase border border-indigo-200 shadow-sm">
                              Most Popular
                           </div>
                           <CardHeader className="pt-10 px-10">
                              <CardTitle className="text-3xl font-black text-slate-900 mb-2">Pro Access</CardTitle>
                              <CardDescription className="font-medium text-base text-slate-500">For growing companies rapidly scaling their core team.</CardDescription>
                           </CardHeader>
                           <CardContent className="px-10 pb-10">
                              <div className="mb-4 mt-2">
                                 <span className="text-6xl font-black text-slate-900 tracking-tighter">$49</span><span className="text-slate-500 font-bold ml-1 text-xl">/mo</span>
                              </div>
                              <p className="text-xs font-black text-indigo-600 mb-10 uppercase tracking-widest">Billed Annually</p>
                              <ul className="space-y-5 mb-10">
                                 <li className="flex items-center gap-3 text-indigo-950 font-black"><CheckCircle2 className="text-indigo-600 w-6 h-6 flex-shrink-0" /> 5 Promoted Job Posts</li>
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-indigo-600 w-6 h-6 flex-shrink-0" /> AI applicant filtering CRM</li>
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-indigo-600 w-6 h-6 flex-shrink-0" /> Targeted email marketing</li>
                              </ul>
                              <Link href="/login" className="flex items-center justify-center w-full h-14 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 text-white text-lg transition-all hover:-translate-y-1">Select Pro Plan</Link>
                           </CardContent>
                        </Card>

                        <Card className="shadow-lg border-slate-200 rounded-[2.5rem] bg-white hover:border-slate-300 transition-colors">
                           <CardHeader className="pt-10 px-10">
                              <CardTitle className="text-2xl font-black text-slate-900 mb-2">Enterprise Plus</CardTitle>
                              <CardDescription className="font-medium text-base text-slate-500">For massive volume hiring and API-driven automation.</CardDescription>
                           </CardHeader>
                           <CardContent className="px-10 pb-10">
                              <div className="mb-10 mt-2"><span className="text-6xl font-black text-slate-900 tracking-tighter">$199</span><span className="text-slate-500 font-bold ml-1 text-xl">/mo</span></div>
                              <ul className="space-y-5 mb-10">
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-slate-400 w-6 h-6 flex-shrink-0" /> Unlimited Global Posts</li>
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-slate-400 w-6 h-6 flex-shrink-0" /> Custom SAML/SSO</li>
                                 <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-slate-400 w-6 h-6 flex-shrink-0" /> Dedicated Account Exec</li>
                              </ul>
                              <Link href="/login" className="flex items-center justify-center w-full h-14 rounded-2xl font-extrabold border-2 text-slate-700 hover:bg-slate-50 border-slate-200 transition-colors text-lg">Contact Sales</Link>
                           </CardContent>
                        </Card>
                     </>
                  ) : (
                     /* Performance Bounty Model */
                     <>
                        <Card className="shadow-md border-slate-200 rounded-[2.5rem] opacity-40 pointer-events-none grayscale hidden md:block select-none bg-white">
                           <CardHeader className="pt-10 px-10"><CardTitle className="text-3xl font-black text-slate-400 mb-2">Standard Plan</CardTitle></CardHeader>
                           <CardContent className="px-10 pb-10"><div className="mb-10 mt-2"><span className="text-6xl font-black text-slate-300 tracking-tighter">N/A</span></div><Button variant="outline" className="w-full h-14 rounded-2xl font-extrabold border-2 text-lg">Disabled</Button></CardContent>
                        </Card>

                        <Card className="md:col-span-2 shadow-[0_30px_60px_rgba(16,185,129,0.2)] border-emerald-500 rounded-[2.5rem] bg-emerald-50/80 backdrop-blur-md relative overflow-hidden ring-4 ring-emerald-500/20">
                           <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-emerald-400/20 rounded-full filter blur-[80px]"></div>

                           <CardHeader className="pt-12 px-12 relative z-10">
                              <div className="flex items-center gap-3 mb-6">
                                 <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-[11px] font-black tracking-widest flex items-center border border-emerald-200 uppercase shadow-sm">
                                    <DollarSign size={16} className="mr-1 -ml-0.5" strokeWidth={3} /> PAY PER INTERVIEW ONLY
                                 </span>
                              </div>
                              <CardTitle className="text-5xl font-black text-emerald-950 tracking-tight leading-tight mb-4">The Revolutionary Bounty Model</CardTitle>
                              <CardDescription className="text-emerald-800/80 text-xl font-medium pr-10 leading-relaxed">Distribute massive amounts of open roles absolutely risk-free. You strictly pay out only when our AI successfully secures your screening execution.</CardDescription>
                           </CardHeader>

                           <CardContent className="px-12 pb-12 relative z-10 pt-4">
                              <div className="mb-12 border-y border-emerald-200/60 py-10 flex flex-col md:flex-row gap-10 md:items-end bg-emerald-100/40 rounded-[2rem] px-8 shadow-inner">
                                 <div>
                                    <span className="text-[5rem] leading-none font-black text-emerald-600 drop-shadow-sm tracking-tighter"><span className="text-5xl text-emerald-500/80 -mt-2 tracking-normal">$</span>0</span>
                                    <span className="text-emerald-800 font-extrabold block mt-3 tracking-widest uppercase text-[11px]">To initiate campaigns</span>
                                 </div>
                                 <div className="hidden md:block w-px h-24 bg-emerald-300/60"></div>
                                 <div>
                                    <span className="text-[5rem] leading-none font-black text-slate-900 drop-shadow-sm tracking-tighter"><span className="text-5xl text-slate-700/80 -mt-2 tracking-normal">$</span>50</span>
                                    <span className="text-slate-700 font-extrabold block mt-3 tracking-widest uppercase text-[11px]">Bounty via secured interview</span>
                                 </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 mb-4">
                                 <li className="flex items-start gap-4 text-slate-800 font-bold text-lg"><CheckCircle2 className="text-emerald-600 w-7 h-7 flex-shrink-0 mt-0.5" /> <span>Post unlimited pipelines instantly</span></li>
                                 <li className="flex items-start gap-4 text-slate-800 font-bold text-lg"><CheckCircle2 className="text-emerald-600 w-7 h-7 flex-shrink-0 mt-0.5" /> <span>Zero risk factor for high-growth</span></li>
                                 <li className="flex items-start gap-4 text-slate-800 font-bold text-lg"><CheckCircle2 className="text-emerald-600 w-7 h-7 flex-shrink-0 mt-0.5" /> <span>AI pre-screens via strict metrics</span></li>
                                 <li className="flex items-start gap-4 text-slate-800 font-bold text-lg"><CheckCircle2 className="text-emerald-600 w-7 h-7 flex-shrink-0 mt-0.5" /> <span>Automated calendar scheduling</span></li>
                              </div>
                              <Link href="/login" className="flex items-center justify-center w-full mt-12 h-16 rounded-2xl text-xl font-black bg-emerald-600 hover:bg-emerald-700 shadow-2xl shadow-emerald-600/40 text-white border border-emerald-500 transition-all hover:-translate-y-1">Deploy Roles Risk-Free Now</Link>
                           </CardContent>
                        </Card>
                     </>
                  )}
               </div>
            </div>
         </section>

         {/* 5. CALL TO ACTION SECTION */}
         <section className="py-32 bg-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3')] bg-cover bg-center opacity-[0.08] mix-blend-overlay"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-400 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-400 blur-[120px] rounded-full pointer-events-none opacity-20"></div>

            <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
               <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-[1.1]">Ready to scale your <br /> career or development team?</h2>
               <p className="text-2xl text-indigo-100 font-medium mb-16 max-w-3xl mx-auto leading-relaxed opacity-90">
                  Join over <strong className="text-white">5,000+ top-tier companies</strong> and <strong className="text-white">100k+ vetted students</strong> actively collaborating on NextStep today. Setup takes exactly 3 minutes.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link href="/login" className="inline-flex h-16 items-center justify-center px-10 rounded-2xl bg-white text-indigo-700 hover:bg-slate-50 hover:scale-105 active:scale-95 font-black text-xl shadow-2xl transition-all shrink-0">
                     Join as Job Seeker
                  </Link>
                  <Link href="/login" className="inline-flex h-16 items-center justify-center px-10 rounded-2xl bg-transparent border-2 border-white/60 hover:bg-white/10 text-white font-black text-xl shrink-0 transition-all">
                     Start Hiring for Free
                  </Link>
               </div>
            </div>
         </section>

         <style dangerouslySetInnerHTML={{
            __html: `
         @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
         }
         .animate-blob {
            animation: blob 8s infinite ease-in-out;
         }
         .animation-delay-2000 {
            animation-delay: 2s;
         }
         .bg-300\\% {
            background-size: 300% 300%;
         }
         @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
         }
         .animate-gradient {
            animation: gradient 8s infinite ease-in-out;
         }
      `}} />
      </div>
   )
}
