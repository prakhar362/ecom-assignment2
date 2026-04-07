"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Clock, Building, DollarSign, Sparkles, BookOpen, ChevronRight, UploadCloud, Search, MessageSquare, Bell, User, FileText, X, Send, CheckCircle2, ChevronLeft, MoreVertical, ThumbsUp, FilterX, LogOut } from "lucide-react"

export default function JobsDashboard() {
  const [activeTab, setActiveTab] = React.useState('jobs') // 'jobs', 'messages', 'applications'
  const [selectedJob, setSelectedJob] = React.useState(null)
  
  // Jobs State
  const [activeFilters, setActiveFilters] = React.useState([])
  const [appliedJobs, setAppliedJobs] = React.useState([])
  const [successToast, setSuccessToast] = React.useState("")
  const [activeSearchQuery, setActiveSearchQuery] = React.useState("")
  const [activeLocationQuery, setActiveLocationQuery] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [locationQuery, setLocationQuery] = React.useState("")
  const [salaryRange, setSalaryRange] = React.useState(220)

  // Messaging State
  const [activeChatId, setActiveChatId] = React.useState(null)
  const [chatInput, setChatInput] = React.useState("")

  const [jobs, setJobs] = React.useState([
    { id: 1, title: "Senior Frontend Developer", company: "TechNova", location: "San Francisco, CA", type: "Full-Time", model: "Hybrid", salary: "$120k", rawSalary: 120000, posted: "2 hours ago", tags: ["React", "Next.js", "TypeScript"], about: "Join TechNova to lead our core architecture overhaul using modern Javascript frameworks.", requirements: ["5+ Years React", "Deep TS knowledge"], match: 85, missing: ["GraphQL"], isStartup: true },
    { id: 2, title: "Product Marketing Manager", company: "GrowthStream", location: "New York, NY", type: "Full-Time", model: "On-site", salary: "$110k", rawSalary: 110000, posted: "1 day ago", tags: ["Marketing", "B2B", "Strategy"], about: "Launch our flagship product suite and lead go-to-market strategies.", requirements: ["3+ Years PMM experience", "Excellent copywriting"], match: 92, missing: ["Salesforce CRM"], isStartup: false },
    { id: 3, title: "Backend Systems Engineer", company: "CloudScale", location: "Austin, TX", type: "Contract", model: "Remote Only", salary: "$160k", rawSalary: 160000, posted: "3 days ago", tags: ["Go", "Kubernetes", "AWS"], about: "Extreme performance-focused backend developer writing highly concurrent Goroutines.", requirements: ["Deep Go knowledge", "Kubernetes"], match: 60, missing: ["Rust", "Distributed DBs"], isStartup: true },
    { id: 4, title: "Data Scientist", company: "AuraHealth", location: "Boston, MA", type: "Full-Time", model: "Remote Only", salary: "$140k", rawSalary: 140000, posted: "4 hours ago", tags: ["Python", "TensorFlow", "SQL"], about: "Build predictive models for patient care and analyze massive datasets.", requirements: ["PhD or MS in Data Science", "3+ years Python"], match: 75, missing: ["Healthcare Compliance", "R"], isStartup: false },
    { id: 5, title: "Principal SRE", company: "FintechX", location: "London, UK", type: "Full-Time", model: "On-site", salary: "£110k", rawSalary: 135000, posted: "5 hours ago", tags: ["Linux", "Terraform", "CI/CD"], about: "Ensure our high-frequency trading platform stays up 99.999%.", requirements: ["10+ years infrastructure", "Fintech background"], match: 65, missing: ["Trading Algorithms"], isStartup: false },
    
    // India Roles
    { id: 6, title: "Staff Software Engineer", company: "FlipCommerce", location: "Bangalore, India", type: "Full-Time", model: "Hybrid", salary: "₹50LPA", rawSalary: 60000, posted: "1 hour ago", tags: ["Java", "Spring Boot", "Kafka"], about: "Scale arguably the largest e-commerce platform in Southeast Asia.", requirements: ["8+ Years Java", "Large scale system design"], match: 88, missing: [], isStartup: false },
    { id: 7, title: "UI/UX Product Designer", company: "CreativeStudio", location: "Pune, India", type: "Full-Time", model: "Remote Only", salary: "₹25LPA", rawSalary: 30000, posted: "10 hours ago", tags: ["Figma", "Prototyping", "User Research"], about: "Lead the aesthetic language for our new AI design tooling suite.", requirements: ["Strong portfolio", "SaaS design pattern knowledge"], match: 95, missing: ["Framer"], isStartup: true },
    { id: 8, title: "Android Developer", company: "PayApp", location: "Mumbai, India", type: "Full-Time", model: "On-site", salary: "₹35LPA", rawSalary: 42000, posted: "2 days ago", tags: ["Kotlin", "Android SDK", "Coroutines"], about: "Build mobile banking features serving 50 million DAU.", requirements: ["5+ Years Kotlin", "Dagger/Hilt"], match: 72, missing: ["RxJava"], isStartup: false },
    { id: 9, title: "Machine Learning Engineer", company: "DataMinds", location: "Hyderabad, India", type: "Contract", model: "Remote Only", salary: "₹40LPA", rawSalary: 48000, posted: "3 hours ago", tags: ["PyTorch", "NLP", "LLMs"], about: "Fine-tune massive language models for enterprise B2B support contexts.", requirements: ["Experience with huggingface", "Deep learning"], match: 80, missing: ["Langchain"], isStartup: true },
    { id: 10, title: "QA Automation Engineer", company: "GlobalTech", location: "Delhi NCR, India", type: "Full-Time", model: "Hybrid", salary: "₹18LPA", rawSalary: 22000, posted: "5 days ago", tags: ["Selenium", "Cypress", "Appium"], about: "Write end-to-end testing infrastructure for our main SAAS product.", requirements: ["3+ Years QA", "Javascript/Python script"], match: 91, missing: [], isStartup: false },
    { id: 11, title: "DevOps Engineer", company: "SaaSify", location: "Chennai, India", type: "Full-Time", model: "Hybrid", salary: "₹28LPA", rawSalary: 34000, posted: "8 hours ago", tags: ["AWS", "Docker", "Ansible"], about: "Manage automated deployments via robust pipelines.", requirements: ["AWS Architect cert", "Bash scripts"], match: 70, missing: ["GCP"], isStartup: false },
    
    // Global remote & roles
    { id: 12, title: "Senior Game Developer", company: "EpicStudios", location: "Berlin, Germany", type: "Full-Time", model: "Remote Only", salary: "€90k", rawSalary: 97000, posted: "6 days ago", tags: ["Unreal Engine", "C++", "3D Math"], about: "Work on our upcoming AAA open world title.", requirements: ["Shipped 2+ AAA titles", "Optimization patterns"], match: 45, missing: ["Unreal Engine", "C++"], isStartup: false },
    { id: 13, title: "Blockchain Developer", company: "Web3Labs", location: "Singapore", type: "Contract", model: "Remote Only", salary: "$120/hr", rawSalary: 240000, posted: "1 day ago", tags: ["Solidity", "Rust", "Web3.js"], about: "Write highly secure smart contracts handling millions in TVL.", requirements: ["Auditing experience", "DeFi knowledge"], match: 62, missing: ["Solidity"], isStartup: true },
    { id: 14, title: "Sales Engineer", company: "CyberShield", location: "Tel Aviv, Israel", type: "Full-Time", model: "Hybrid", salary: "$130k", rawSalary: 130000, posted: "4 hours ago", tags: ["Network Security", "B2B Sales", "Presentations"], about: "Be the technical bridge between our enterprise clients and our engineering team.", requirements: ["3+ years Sales Engineering", "Cybersecurity background"], match: 55, missing: ["B2B Sales"], isStartup: true },
    { id: 15, title: "Cloud Architect", company: "AzureCorp", location: "Seattle, WA", type: "Full-Time", model: "On-site", salary: "$180k", rawSalary: 180000, posted: "Just now", tags: ["Azure", "System Design", "Enterprise"], about: "Design large scale migrations for Fortune 500 partners.", requirements: ["10+ years IT", "Azure certifications"], match: 78, missing: ["Enterprise Migrations"], isStartup: false },
    { id: 16, title: "React Native Developer", company: "FitnessApp", location: "Toronto, Canada", type: "Full-Time", model: "Remote Only", salary: "CAD $120k", rawSalary: 88000, posted: "15 hours ago", tags: ["React Native", "Redux", "Expo"], about: "Port our native iOS app safely over to a unified React Native codebase.", requirements: ["Published RN apps", "Bridging native modules"], match: 96, missing: [], isStartup: true },
    
    // More India Roles
    { id: 17, title: "Technical Program Manager", company: "UnicornLogistics", location: "Bangalore, India", type: "Full-Time", model: "On-site", salary: "₹65LPA", rawSalary: 78000, posted: "2 weeks ago", tags: ["Agile", "Jira", "Stakeholder Management"], about: "Align massive cross-functional engineering teams.", requirements: ["Past engineering experience", "PMP"], match: 81, missing: ["PMP Certification"], isStartup: false },
    { id: 18, title: "Cybersecurity Analyst", company: "DefendBank", location: "Mumbai, India", type: "Full-Time", model: "Hybrid", salary: "₹45LPA", rawSalary: 54000, posted: "1 day ago", tags: ["SOC", "SIEM", "Penetration Testing"], about: "Monitor and defend core banking infra from zero-day threats.", requirements: ["CEH/CISSP", "24/7 rotational availability"], match: 51, missing: ["CEH", "Penetration Testing"], isStartup: false },
    { id: 19, title: "Go Developer", company: "StreamerDevs", location: "Pune, India", type: "Contract", model: "Remote Only", salary: "₹50LPA", rawSalary: 60000, posted: "11 hours ago", tags: ["Go", "Video Encoding", "FFmpeg"], about: "Work on HLS transcoding layers for our live streaming app.", requirements: ["Strong Go profiling", "Video codecs"], match: 68, missing: ["FFmpeg"], isStartup: true },
    { id: 20, title: "Full Stack Engineer", company: "EduTechGlobal", location: "Delhi NCR, India", type: "Full-Time", model: "Remote Only", salary: "₹22LPA", rawSalary: 26000, posted: "2 days ago", tags: ["MERN", "Tailwind", "Socket.io"], about: "Build interactive virtual classrooms.", requirements: ["MERN Stack", "Real-time websockets"], match: 94, missing: [], isStartup: true },
    { id: 21, title: "Data Analyst", company: "RetailAnalytics", location: "Bangalore, India", type: "Full-Time", model: "Hybrid", salary: "₹15LPA", rawSalary: 18000, posted: "3 hours ago", tags: ["Excel", "Tableau", "SQL"], about: "Build dashboards tracking user spending behaviors.", requirements: ["Strong SQL", "Data visualization"], match: 86, missing: ["Tableau"], isStartup: false },
  ])

  // Chat Data holding full histories
  const [chats, setChats] = React.useState([
    { id: 1, recruiter: "Sarah Winters", role: "VP of Engineering", company: "FintechX", latest: "Are you available for a quick screening next week?", unread: 2, time: "10:30 AM", activeStatus: "Online",
      history: [
        { sender: "recruiter", text: "Hi John! We loved your profile and resume drop.", time: "10:00 AM" },
        { sender: "user", text: "Hi Sarah, thank you! I've been following FintechX closely.", time: "10:15 AM" },
        { sender: "recruiter", text: "Are you available for a quick screening next week?", time: "10:30 AM" },
      ]
    },
    { id: 2, recruiter: "Michael Jordan", role: "Design Director", company: "CreativeStudio", latest: "We've advanced you to round 2.", unread: 0, time: "Yesterday", activeStatus: "Offline",
      history: [
        { sender: "user", text: "Here is the link to my completed assignment.", time: "Mon, 2:00 PM" },
        { sender: "recruiter", text: "Received, reviewing it with the team now.", time: "Mon, 3:30 PM" },
        { sender: "recruiter", text: "We loved your portfolio! We've advanced you to round 2.", time: "Tue, 9:00 AM" },
      ]
    },
  ])

  // Process filters
  const toggleFilter = (filterName) => {
     setActiveFilters(prev => 
        prev.includes(filterName) ? prev.filter(f => f !== filterName) : [...prev, filterName]
     )
     setSelectedJob(null)
  }

  const filteredJobs = jobs.filter(job => {
     let passes = true;
     if (activeFilters.includes('Remote Only') && job.model !== 'Remote Only') passes = false;
     if (activeFilters.includes('Full-Time') && job.type !== 'Full-Time') passes = false;
     if (activeFilters.includes('Startup (< 50)') && !job.isStartup) passes = false;
     
     // Salary Filter Logic
     if (job.rawSalary / 1000 > salaryRange) passes = false;

     if (activeSearchQuery && !job.title.toLowerCase().includes(activeSearchQuery.toLowerCase()) && !job.company.toLowerCase().includes(activeSearchQuery.toLowerCase())) {
        passes = false;
     }

     if (activeLocationQuery && !job.location.toLowerCase().includes(activeLocationQuery.toLowerCase())) {
        passes = false;
     }

     return passes;
  }).filter(job => !appliedJobs.some(a => a.id === job.id))

  // Easy Apply logic
  const handleApply = (job) => {
     setAppliedJobs([{ ...job, status: "Under Review", appliedDate: "Just now" }, ...appliedJobs])
     setSuccessToast(`Successfully applied to ${job.title} at ${job.company}!`)
     setSelectedJob(null)
     setTimeout(() => setSuccessToast(""), 3000)
  }

  // Messaging logic
  const handleSendMessage = (e, chatId) => {
     e.preventDefault()
     if (!chatInput.trim()) return

     setChats(prevChats => prevChats.map(chat => {
        if (chat.id === chatId) {
           return {
              ...chat,
              latest: chatInput,
              history: [...chat.history, { sender: "user", text: chatInput, time: "Just now" }]
           }
        }
        return chat
     }))
     setChatInput("")
  }

  const activeChat = chats.find(c => c.id === activeChatId)

  return (
    <div className="flex bg-slate-50 min-h-screen h-screen overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {successToast && (
         <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-10 fade-in flex items-center gap-3 font-semibold">
            <CheckCircle2 className="text-emerald-400 w-5 h-5" />
            {successToast}
         </div>
      )}

      {/* 1. LEFT SIDEBAR */}
      <aside className="w-[300px] sm:w-[320px] bg-white border-r border-slate-200 flex-shrink-0 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-full overflow-y-auto">
        
        {/* User Brief & Logo */}
        <div className="p-6 border-b border-slate-100">
           <Link href="/" className="inline-block text-2xl font-black text-indigo-600 tracking-tight mb-8">NextStep</Link>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner flex-shrink-0">JD</div>
              <div className="overflow-hidden w-full">
                 <h3 className="font-bold text-slate-900 border-b border-transparent truncate">John Doe</h3>
                 <p className="text-sm font-medium text-slate-500 truncate">Software Engineer</p>
              </div>
           </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-1.5 border-b border-slate-100">
          <button 
             onClick={() => {setActiveTab('jobs'); setSelectedJob(null);}} 
             className={`w-full flex items-center px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'jobs' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
          >
             <Briefcase className="w-5 h-5 mr-3" /> Job Feed
          </button>
          <button 
             onClick={() => {setActiveTab('messages'); setSelectedJob(null); activeChatId && setActiveChatId(null)}} 
             className={`w-full flex items-center px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'messages' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
          >
             <MessageSquare className="w-5 h-5 mr-3" /> Messages
             <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">2 New</span>
          </button>
          <button 
             onClick={() => {setActiveTab('applications'); setSelectedJob(null);}}
             className={`w-full flex items-center px-4 py-3.5 rounded-xl font-bold transition-all text-sm flex items-center justify-between ${activeTab === 'applications' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
          >
             <div className="flex items-center"><FileText className="w-5 h-5 mr-3" /> Applications</div>
             {appliedJobs.length > 0 && <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-black">{appliedJobs.length}</span>}
          </button>
          <button 
             onClick={() => {setActiveTab('upskill'); setSelectedJob(null);}}
             className={`w-full flex items-center px-4 py-3.5 rounded-xl font-bold transition-all text-sm flex items-center justify-between ${activeTab === 'upskill' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
          >
             <div className="flex items-center"><Sparkles className="w-5 h-5 mr-3 text-amber-500" /> Upskill Hub</div>
             <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-black italic">AI Path</span>
          </button>
          <button 
             onClick={() => {setActiveTab('refer'); setSelectedJob(null);}}
             className={`w-full flex items-center px-4 py-3.5 rounded-xl font-bold transition-all text-sm flex items-center justify-between ${activeTab === 'refer' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
          >
             <div className="flex items-center"><User className="w-5 h-5 mr-3" /> Refer and Earn</div>
          </button>
          <button 
             onClick={() => {setActiveTab('blogs'); setSelectedJob(null);}}
             className={`w-full flex items-center px-4 py-3.5 rounded-xl font-bold transition-all text-sm flex items-center justify-between ${activeTab === 'blogs' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
          >
             <div className="flex items-center"><BookOpen className="w-5 h-5 mr-3" /> Blogs</div>
          </button>
        </nav>

        {/* Dynamic Sidebar Content Based on Tab */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50">
           {activeTab === 'jobs' && (
              <div className="p-6 space-y-8">
                 {/* Resume Upload Module */}
                 <div>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Sparkles size={14} className="text-amber-500"/> AI Match Engine</h4>
                    <div className="bg-white border text-center border-slate-200 border-dashed rounded-2xl p-5 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group flex flex-col items-center shadow-sm">
                       <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                          <UploadCloud size={20} />
                       </div>
                       <p className="text-sm font-black text-slate-700 mb-1">Update Resume PDF</p>
                       <p className="text-[11px] font-semibold text-slate-500 leading-relaxed px-2">Upload your latest PDF to dynamically re-filter your job feed.</p>
                       <span className="mt-4 text-[10px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">System Synced ✓</span>
                    </div>
                 </div>
                 {/* Filters Removed from here per instructions */}
              </div>
           )}

           {activeTab === 'messages' && (
              <div className="divide-y divide-slate-100">
                 <div className="px-5 py-4 font-black text-[11px] uppercase tracking-widest text-slate-400 bg-slate-50 sticky top-0 shadow-sm z-10 flex justify-between items-center">
                    Recent Chats
                 </div>
                 {chats.map(msg => {
                    const isActiveChat = activeChatId === msg.id
                    return (
                    <div key={msg.id} onClick={() => setActiveChatId(msg.id)} className={`p-5 cursor-pointer border-l-4 transition-all relative group ${isActiveChat ? 'bg-indigo-50/50 border-indigo-600' : 'bg-white border-transparent hover:bg-slate-50'}`}>
                       <div className="flex justify-between items-start mb-1.5">
                          <h4 className={`font-black text-sm truncate pr-2 ${msg.unread && !isActiveChat ? 'text-slate-900' : 'text-slate-700 group-hover:text-indigo-600'}`}>{msg.recruiter}</h4>
                          <span className={`text-[10px] font-bold whitespace-nowrap ${msg.unread && !isActiveChat ? 'text-indigo-600' : 'text-slate-400'}`}>{msg.time}</span>
                       </div>
                       <p className="text-[11px] font-black text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider"><Building size={12}/> {msg.company}</p>
                       <p className={`text-xs w-full line-clamp-2 leading-relaxed ${msg.unread && !isActiveChat ? 'font-bold text-slate-700' : 'text-slate-500 font-medium'}`}>{msg.latest}</p>
                       {msg.unread > 0 && !isActiveChat && <div className="mt-3 inline-block bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">NEW MESSAGE</div>}
                    </div>
                 )})}
              </div>
           )}

           {activeTab === 'applications' && (
              <div className="p-6">
                 <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Pipeline Status</div>
                 <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                       <span className="text-sm font-bold text-slate-600">Total Applied</span>
                       <span className="text-xl font-black text-slate-900">{appliedJobs.length}</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                       <span className="text-sm font-bold text-slate-600">Interviewing</span>
                       <span className="text-xl font-black text-indigo-600">0</span>
                    </div>
                 </div>
              </div>
           )}
        </div>

        <div className="p-6 border-t border-slate-100">
           <button 
              onClick={() => window.location.href = '/login'} 
              className="w-full flex items-center px-4 py-3.5 rounded-xl font-black text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all text-[11px] uppercase tracking-widest gap-3"
           >
              <LogOut size={16} /> Terminate Session
           </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative w-full hide-scrollbar flex flex-col">
         
         {/* Top Header Row for Jobs/Applications/Upskill */}
         {(activeTab === 'jobs' || activeTab === 'applications' || activeTab === 'upskill') && (
         <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 sm:px-10 py-5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
            {activeTab === 'jobs' && !selectedJob && (
               <>
                  <div className="flex-1 flex gap-3 max-w-2xl w-full">
                     <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (setActiveSearchQuery(searchQuery), setActiveLocationQuery(locationQuery))} placeholder="Search roles, keywords..." className="w-full h-12 pl-12 pr-4 bg-slate-100 border border-transparent rounded-xl text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-inner" />
                     </div>
                     <div className="flex-1 relative hidden md:block">
                        <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (setActiveSearchQuery(searchQuery), setActiveLocationQuery(locationQuery))} placeholder="Location e.g. Bangalore, London" className="w-full h-12 pl-12 pr-4 bg-slate-100 border border-transparent rounded-xl text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-inner" />
                     </div>
                  </div>
                  <Button onClick={() => {setActiveSearchQuery(searchQuery); setActiveLocationQuery(locationQuery)}} className="h-12 rounded-xl px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-600/20 w-full md:w-auto transition-transform hover:-translate-y-0.5">Search Network</Button>
               </>
            )}
            
            {activeTab === 'jobs' && selectedJob && (
               <div className="flex items-center gap-4 w-full">
                  <button onClick={() => setSelectedJob(null)} className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors shadow-sm cursor-pointer">
                     <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Return to Job Feed</h2>
               </div>
            )}

            {activeTab === 'applications' && (
               <div className="w-full">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3"><FileText className="text-indigo-600"/> Application Pipeline</h2>
               </div>
            )}

            {activeTab === 'upskill' && (
               <div className="w-full">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3"><Sparkles className="text-amber-500"/> Upskill Strategy Hub</h2>
               </div>
            )}
         </div>
         )}

         {/* MAIN VIEWS */}
         <div className={`flex-1 ${activeTab === 'messages' ? 'flex flex-col' : 'p-6 md:p-10 max-w-5xl mx-auto w-full pb-24'}`}>
            
            {/* VIEW STATE: JOBS FEED */}
            {activeTab === 'jobs' && !selectedJob && (
               <div className="flex flex-col lg:flex-row gap-4 items-start animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-8 max-w-full px-4 overflow-x-hidden">
                  {/* Left Sidebar Filters */}
                  <div className="w-full lg:w-[240px] shrink-0 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm lg:sticky top-4">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                           <FilterX size={18} />
                           Filters
                        </div>
                        <button onClick={() => {setActiveFilters([]); setSalaryRange(220);}} className="text-xs font-bold text-slate-400 hover:text-indigo-600">Reset</button>
                     </div>
                     
                     <div className="space-y-6">
                        <div>
                           <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3 text-[10px]">Role Category</h4>
                           <div className="flex flex-wrap gap-1.5">
                              {['All', 'Engineering', 'Product', 'Design', 'Data', 'Marketing'].map(cat => (
                                <button 
                                  key={cat}
                                  className={`px-3 py-1.5 text-[11px] font-bold rounded-full border transition-all ${cat === 'All' ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                                >
                                  {cat}
                                </button>
                              ))}
                           </div>
                        </div>

                        <div>
                           <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3">Salary Range</h4>
                           <input 
                              type="range" 
                              min="0" 
                              max="250" 
                              value={salaryRange}
                              onChange={(e) => setSalaryRange(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                           />
                           <div className="text-xs font-black text-slate-800 mt-2">Up to ${salaryRange}k</div>
                        </div>

                        <div>
                           <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3">Experience Level</h4>
                           <div className="flex flex-wrap gap-1.5">
                              {['Internship', 'Entry'].map(lvl => (
                                <button key={lvl} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-[11px] font-bold rounded-full hover:border-slate-300 transition-all">
                                  {lvl}
                                </button>
                              ))}
                           </div>
                        </div>

                        <div>
                           <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Smart Filters</h4>
                           <div className="space-y-2.5">
                              {['Remote Only', 'Full-Time', 'Startup (< 50)'].map(f => {
                                 const isActive = activeFilters.includes(f)
                                 return (
                                 <label key={f} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => toggleFilter(f)}>
                                    <div className={`w-4 h-4 border rounded transition-colors flex items-center justify-center ${isActive ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                                       {isActive && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                                    </div>
                                    <span className={`text-[13px] font-semibold transition-colors ${isActive ? 'text-indigo-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{f}</span>
                                 </label>
                              )})}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Middle Job Feed */}
                  <div className="flex-1 space-y-4">
                     {filteredJobs.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                           <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4"><FilterX size={28} /></div>
                           <h3 className="text-xl font-bold text-slate-800 mb-1">No matches found</h3>
                           <p className="text-sm text-slate-500 font-medium">Try broadening your filters.</p>
                        </div>
                     ) : filteredJobs.map(job => (
                        <div 
                           key={job.id}
                           onClick={() => setSelectedJob(job)}
                           className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer relative"
                        >
                           <div className="flex justify-between items-start mb-3">
                              <div className="flex flex-wrap gap-1.5">
                                 <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-wider rounded border border-amber-200/50 flex items-center gap-1"><Sparkles size={8} /> Promoted Ad</span>
                                 <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-wider rounded border border-amber-200/50 flex items-center gap-1"><Sparkles size={8} /> Trending Job</span>
                                 <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider rounded border border-emerald-100/50">High Match</span>
                              </div>
                              <button className="w-7 h-7 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
                                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                              </button>
                           </div>

                           <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-0.5">{job.title}</h3>
                           <p className="text-[13px] font-bold text-slate-500 mb-3">{job.company}</p>

                           <div className="flex items-center gap-3 text-[12px] font-bold mb-3 flex-wrap">
                              <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">{job.match}% match</span>
                              <span className="text-slate-400 flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                           </div>

                           <div className="flex flex-wrap gap-1.5 mb-4">
                              {job.tags.slice(0, 3).map(tag => (
                                 <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold rounded">{tag}</span>
                              ))}
                           </div>

                           <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2">
                              {job.about}
                           </p>

                           <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                              <div className="text-lg font-black text-slate-900">{job.salary}</div>
                              <button onClick={(e) => { e.stopPropagation(); handleApply(job); }} className="px-4 py-2 bg-slate-900 text-white text-[12px] font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                                 Quick Apply <ChevronRight size={14} />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Right Preview */}
                  <div className="w-full lg:w-[320px] shrink-0 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:sticky top-4 hidden xl:block min-h-[500px]">
                     <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">Job Preview</h4>
                     {filteredJobs.length > 0 ? (
                        <div>
                           <h2 className="text-xl font-black text-slate-900 mb-1 leading-tight">{filteredJobs[0].title}</h2>
                           <p className="text-[13px] font-bold text-slate-500 mb-6">{filteredJobs[0].company}</p>
                           
                           <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4">
                              <h4 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2">Description</h4>
                              <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                                 You will lead core initiatives across global markets. Join our high-performance team building the future of {filteredJobs[0].company}'s ecosystem.
                                 <br/><br/>
                                 {filteredJobs[0].about}
                              </p>
                           </div>
                           <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                                <span className="text-[11px] font-bold text-slate-400 uppercase">Match Score</span>
                                <span className="text-sm font-black text-emerald-600">{filteredJobs[0].match}%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                                <span className="text-[11px] font-bold text-slate-400 uppercase">Employment</span>
                                <span className="text-sm font-bold text-slate-700">{filteredJobs[0].type}</span>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-300 py-12">
                           <FileText size={40} className="mb-3 opacity-20" />
                           <p className="text-sm font-bold">Select a job</p>
                        </div>
                     )}
                  </div>
               </div>
            )}

            {/* VIEW STATE: JOB DETAIL PAGE */}
            {activeTab === 'jobs' && selectedJob && (
               <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
                  <div className="flex flex-col lg:flex-row items-start justify-between mb-10 pb-10 border-b border-slate-100 gap-8">
                     <div className="flex gap-6 items-center">
                        <div className="w-24 h-24 rounded-[1.5rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shadow-inner shrink-0">
                           <Building size={48} />
                        </div>
                        <div>
                           <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2 pr-10">{selectedJob.title}</h1>
                           <div className="text-xl font-black text-indigo-700 flex flex-wrap items-center gap-2 mb-2">
                              {selectedJob.company}
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                              <span className="text-base font-bold text-slate-500 flex items-center gap-1.5"><MapPin size={18}/> {selectedJob.location}</span>
                           </div>
                           <p className="text-sm font-semibold text-slate-400">Posted {selectedJob.posted}</p>
                        </div>
                     </div>
                     <div className="flex gap-4 w-full lg:w-auto lg:shrink-0 justify-end">
                        <Button variant="outline" className="h-14 w-14 shrink-0 p-0 rounded-2xl border-2 border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </Button>
                        <Button onClick={() => handleApply(selectedJob)} className="h-14 px-8 rounded-2xl font-black text-base bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 w-full lg:w-auto transition-transform hover:-translate-y-1">Easy Apply via Sync</Button>
                     </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-12">
                     <div className="lg:col-span-2 space-y-10 text-slate-600 text-lg leading-relaxed font-medium">
                        <section>
                           <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">About The Role</h3>
                           <p className="whitespace-pre-line">{selectedJob.about}</p>
                        </section>
                        
                        <section>
                           <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">Base Requirements</h3>
                           <ul className="space-y-4">
                              {selectedJob.requirements.map(req => (
                                 <li key={req} className="flex items-start gap-4"><div className="mt-1 bg-emerald-100 rounded-full p-1"><CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /></div> <span className="font-bold text-slate-700">{req}</span></li>
                              ))}
                           </ul>
                        </section>

                        <section className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 shadow-inner">
                           <h4 className="text-xs font-black tracking-widest uppercase text-slate-400 mb-5">Required Stack Mapping</h4>
                           <div className="flex flex-wrap gap-3">
                              {selectedJob.tags.map(tag => (
                                 <span key={tag} className="px-4 py-2 bg-white border border-slate-200 text-slate-800 text-sm font-black rounded-xl shadow-sm">{tag}</span>
                              ))}
                              {selectedJob.missing.map(m => (
                                 <span key={m} className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm font-black rounded-xl shadow-sm decoration-red-400 line-through decoration-2 opacity-80" title="Missing from your resume PDF">{m}</span>
                              ))}
                           </div>
                        </section>
                     </div>

                     {/* Sidebar Job Detail Metrics */}
                     <div className="space-y-6">
                        <div className="bg-emerald-50/80 border border-emerald-100 rounded-[2rem] p-8 shadow-sm">
                           <h4 className="text-[11px] font-black uppercase text-emerald-600/70 tracking-widest mb-2">Expected Targeted Salary</h4>
                           <p className="text-4xl font-black text-emerald-950 tracking-tighter drop-shadow-sm">{selectedJob.salary}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                           <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-2">Work Lifecycle Model</h4>
                           <div className="flex flex-wrap gap-2 text-xl font-black text-slate-800">
                             <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg">{selectedJob.model}</span> 
                             <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg">{selectedJob.type}</span>
                           </div>
                        </div>
                        <div className="bg-indigo-600 border border-indigo-700 rounded-[2rem] p-8 shadow-2xl shadow-indigo-600/20 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                           <div className="w-20 h-20 bg-white rounded-[1.25rem] flex items-center justify-center text-indigo-600 font-black text-3xl shadow-xl shadow-black/10 mb-4 transform rotate-6 border-b-4 border-r-4 border-indigo-200 group-hover:rotate-12 transition-transform duration-500 relative z-10">
                              {selectedJob.match}
                           </div>
                           <h4 className="text-base font-black text-white mb-2 tracking-tight relative z-10 drop-shadow-sm">AI Matching Execution</h4>
                           <p className="text-xs font-semibold text-indigo-100/80 leading-relaxed relative z-10">You are securely ranking in the top 15% of applicants for this role strictly based on your synced document.</p>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* VIEW STATE: APPLICATIONS */}
            {activeTab === 'applications' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {appliedJobs.length === 0 ? (
                     <div className="bg-white border text-center border-slate-200 border-dashed rounded-[2rem] p-16 flex flex-col items-center justify-center">
                        <FileText size={48} className="text-slate-300 mb-6" />
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Inbox Empty</h3>
                        <p className="text-slate-500 font-medium max-w-sm mb-8">You haven't applied to any roles yet. View the Jobs Feed to deploy your pipeline.</p>
                        <Button onClick={() => setActiveTab('jobs')} className="h-12 px-8 font-bold bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700">Explore Jobs Feed</Button>
                     </div>
                  ) : appliedJobs.map(job => (
                     <div key={job.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center group">
                        <div className="flex gap-6 items-center w-full">
                           <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0 shadow-inner group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                              <Building size={28} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-slate-900 mb-1">{job.title}</h3>
                              <div className="text-sm font-bold text-slate-500 flex items-center gap-2 mb-2">
                                 {job.company}
                                 <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                 <span className="flex items-center gap-1.5"><MapPin size={14}/> {job.location}</span>
                              </div>
                              <p className="text-[11px] font-bold text-slate-400">Deployed: {job.appliedDate}</p>
                           </div>
                        </div>
                        <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0 flex md:flex-col items-center md:items-end justify-between gap-2">
                           <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl block shadow-sm flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> {job.status}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* VIEW STATE: MESSAGING OVERVIEW - Empty */}
            {activeTab === 'messages' && !activeChatId && (
               <div className="bg-white border border-slate-200 rounded-bl-[2rem] h-full flex flex-col items-center justify-center animate-in fade-in duration-500 shadow-inner p-10">
                  <div className="mt-20 flex flex-col items-center text-center">
                     <div className="w-32 h-32 bg-slate-50 border border-slate-200 rounded-full flex flex-col items-center justify-center text-slate-300 mb-8 border-dashed shadow-sm">
                        <MessageSquare size={48} className="mb-2" />
                     </div>
                     <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-3">Enterprise Inbox Loaded</h2>
                     <p className="text-slate-500 font-semibold max-w-sm text-lg">Click absolutely any recruiter connection flowing on your left side panel to jump directly into real-time pipeline networking.</p>
                  </div>
               </div>
            )}

            {/* VIEW STATE: ACTIVE CHAT */}
            {activeTab === 'messages' && activeChat && (
               <div className="bg-white flex flex-col h-full animate-in slide-in-from-right-10 duration-300 w-full rounded-tl-3xl shadow-[0_0_40px_rgba(0,0,0,0.03)] border-l border-slate-200 relative z-10 -ml-1">
                  
                  {/* Chat Header */}
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10 shrink-0">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center justify-center rounded-[1rem] shadow-sm text-xl relative">
                           {activeChat.recruiter.split(' ').map(n=>n[0]).join('')}
                           <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${activeChat.activeStatus === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        </div>
                        <div>
                           <h2 className="text-[19px] font-black text-slate-900 tracking-tight leading-tight">{activeChat.recruiter}</h2>
                           <p className="text-xs font-bold text-slate-500">{activeChat.role} <span className="text-indigo-400 font-black">@ {activeChat.company}</span></p>
                        </div>
                     </div>
                     <div className="flex gap-2 text-slate-400">
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full hover:bg-slate-50"><Search size={20} /></Button>
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full hover:bg-slate-50"><MoreVertical size={20} /></Button>
                     </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-slate-50/30 hide-scrollbar">
                     <div className="text-center font-bold text-[10px] text-slate-400 uppercase tracking-widest my-8">Start of heavily secured encryption log</div>
                     {activeChat.history.map((msg, i) => {
                        const isSelf = msg.sender === 'user'
                        return (
                           <div key={i} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[75%] lg:max-w-md w-fit flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                                 <div className={`px-6 py-4 rounded-[1.5rem] shadow-sm font-medium leading-relaxed ${isSelf ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'}`}>
                                    {msg.text}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 mt-2 mx-1">{msg.time}</span>
                              </div>
                           </div>
                        )
                     })}
                  </div>

                  {/* Chat Input */}
                  <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                     <form onSubmit={(e) => handleSendMessage(e, activeChat.id)} className="flex items-center gap-4 max-w-4xl mx-auto relative rounded-2xl bg-slate-50 border border-slate-200 p-2 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 transition-all shadow-inner">
                        <input 
                           type="text" 
                           value={chatInput}
                           onChange={(e) => setChatInput(e.target.value)}
                           className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-800 font-medium w-full placeholder:text-slate-400 placeholder:font-semibold text-sm" 
                           placeholder={`Reply to ${activeChat.recruiter.split(' ')[0]}...`}
                        />
                        <Button type="submit" disabled={!chatInput.trim()} className="h-12 w-12 p-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 shadow-md shadow-indigo-600/30 disabled:opacity-50 disabled:shadow-none transition-all">
                           <Send size={18} className="ml-1" />
                        </Button>
                     </form>
                  </div>
               </div>
            )}

            {/* VIEW STATE: UPSKILL HUB */}
            {activeTab === 'upskill' && (
               <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-6xl mx-auto">
                  
                  {/* Hero Summary */}
                  <div className="grid md:grid-cols-3 gap-6">
                     <div className="md:col-span-2 bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />
                        <div className="relative z-10 max-w-xl">
                           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
                              <Sparkles size={12} className="text-amber-400" /> AI Growth Path Active
                           </div>
                           <h2 className="text-4xl font-black mb-4 tracking-tighter leading-tight">Elevate your market value by bridging {['GraphQL', 'Rust'].join(' and ')}.</h2>
                           <p className="text-indigo-100 font-medium text-lg leading-relaxed opacity-90 mb-8">
                              Our engine analyzed 12 live roles matching your profile. Candidates with your target stack + GraphQL are currently seeing 1.4x higher interview rates.
                           </p>
                           <div className="flex flex-wrap gap-4">
                              <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-3 border border-white/5">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Target Roles</p>
                                 <p className="text-xl font-black">142 Available</p>
                              </div>
                              <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-3 border border-white/5">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Salary Delta</p>
                                 <p className="text-xl font-black text-emerald-400">+₹12 LPA Avg.</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm flex flex-col justify-between">
                        <div>
                           <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Market Pulse</h3>
                           <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6">Real-time demand metrics for your specific engineering cluster.</p>
                           <div className="space-y-4">
                              {[
                                 { skill: "Rust", change: "+14.2%", up: true },
                                 { skill: "Kubernetes", change: "+8.5%", up: true },
                                 { skill: "GraphQL", change: "+22.1%", up: true },
                                 { skill: "Go", change: "-1.2%", up: false }
                              ].map(item => (
                                 <div key={item.skill} className="flex items-center justify-between py-2 border-b border-slate-50">
                                    <span className="font-bold text-slate-700">{item.skill}</span>
                                    <span className={`text-xs font-black ${item.up ? 'text-emerald-600' : 'text-slate-400'}`}>
                                       {item.up ? '↑' : '↓'} {item.change}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <Button variant="outline" className="w-full h-12 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest">View Heatmap</Button>
                     </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-12 pt-4">
                     {/* Sidebar Controls/Stats */}
                     <div className="lg:col-span-1 space-y-8">
                        <div>
                           <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                              <span className="w-8 h-[1px] bg-slate-200" /> Mastery Profile
                           </h4>
                           <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                              {[
                                 { label: "Frontend Architecture", score: 92, color: "bg-indigo-600" },
                                 { label: "System Scalability", score: 45, color: "bg-amber-500" },
                                 { label: "Cloud Operations", score: 31, color: "bg-red-500" }
                              ].map(stat => (
                                 <div key={stat.label} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                       <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{stat.label}</span>
                                       <span className="text-lg font-black text-slate-900">{stat.score}%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                       <div className={`h-full ${stat.color} rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,0,0,0.1)]`} style={{ width: `${stat.score}%` }} />
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
                           <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Certified Partners</h4>
                           <div className="grid grid-cols-2 gap-4">
                              {['EduStream', 'CodeMasters', 'CloudScale', 'UI Academy'].map(p => (
                                 <div key={p} className="h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-tighter opacity-60 hover:opacity-100 transition-opacity cursor-pointer">{p}</div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Recommended Grid */}
                     <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                           <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                              <span className="w-8 h-[1px] bg-slate-200" /> Learning Roadmap
                           </h4>
                           <div className="flex gap-2">
                              <Button variant="ghost" className="h-8 text-[10px] font-bold text-indigo-600 px-3 uppercase tracking-widest">Filter by Gap</Button>
                           </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                           {[
                              { title: "Advanced GraphQL Engineering", meta: "Partner: EduStream Academy", level: "Expert", price: "₹4,999", gap: "GraphQL", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600", tag: "Hot Pick" },
                              { title: "System Design for Giant Reach", meta: "Partner: CloudScale HQ", level: "Senior", price: "₹8,499", gap: "System Design", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600", tag: "High ROI" },
                              { title: "Production Rust for Web3", meta: "Partner: RustMasters", level: "Advanced", price: "₹12,400", gap: "Rust", img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600", tag: "Trending" },
                              { title: "Serverless AWS at Scale", meta: "Partner: EduStream Academy", level: "Intermediate", price: "Free", gap: "Cloud Infra", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", tag: "Starter" }
                           ].map((course, i) => (
                              <div key={i} className="group flex flex-col bg-white border border-slate-200 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-500 cursor-pointer">
                                 <div className="h-52 relative overflow-hidden">
                                    <img src={course.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                       <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full mb-2 shadow-lg">{course.tag}</span>
                                       <h5 className="text-white font-black text-lg leading-tight">{course.title}</h5>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl text-[10px] font-black text-slate-800 shadow-sm">{course.price}</div>
                                 </div>
                                 <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-6">
                                       <div className="flex flex-col">
                                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Impact Layer</span>
                                          <span className="text-xs font-black text-indigo-600 uppercase">Addresses {course.gap} Gap</span>
                                       </div>
                                       <span className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                          <BookOpen size={18} />
                                       </span>
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-8">{course.meta} • {course.level}</p>
                                    <Button className="w-full h-14 bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all group-hover:-translate-y-1">Initialize Learning</Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  )
}
