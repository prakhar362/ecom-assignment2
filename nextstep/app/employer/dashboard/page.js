"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
   Search, Home, Columns, MessageSquare, BarChart, Bell, ChevronRight,
   CheckCircle2, User, Send, X, FileText, AlertTriangle, Flame, Video, Cpu,
   Plus, Filter, MoreHorizontal, ArrowRight, Play, Briefcase, Calendar,
   Zap, ChevronDown, Check, Globe, Layout, Settings, LogOut, Info, Trash2,
   TrendingUp, Users, Clock, Target, Eye, ExternalLink, Mail, Phone, MapPin,
   Share2, Download, Layers, ShieldCheck, Sparkles, Activity, Link as LinkIcon,
   Code, Star, GripVertical
} from "lucide-react"
import { Button } from "@/components/ui/button"

import {
   DndContext,
   closestCorners,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
   DragOverlay,
   defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
   arrayMove,
   SortableContext,
   sortableKeyboardCoordinates,
   verticalListSortingStrategy,
   useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CandidateCard = ({ candidate, status, onClick, isDragging }) => (
   <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
      className={`bg-white p-6 rounded-[2rem] border border-transparent shadow-sm transition-all cursor-pointer group relative overflow-hidden ${isDragging ? 'shadow-2xl ring-2 ring-indigo-500 z-50' : 'hover:border-indigo-200 scale-100 hover:scale-[1.02]'}`}
   >
      {candidate.match >= 95 && <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-600/5 rounded-bl-full pointer-events-none" />}

      <div className="flex justify-between items-start mb-4">
         <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            {candidate.name.split(' ').map(n => n[0]).join('')}
         </div>
         {candidate.result && (
            <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg px-2 py-0.5 text-[10px] font-black flex items-center gap-1">
               <Star size={10} fill="currentColor" /> {candidate.result}
            </div>
         )}
      </div>

      <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{candidate.name}</h4>
      <p className="text-[10px] font-bold text-slate-400 mb-4">{candidate.role}</p>

      <div className="flex items-center justify-between border-t border-slate-50 pt-4">
         <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${candidate.status.includes('Completed') ? 'text-emerald-500 bg-emerald-50' : 'text-slate-300'}`}>
            {candidate.status}
         </span>
         <div className="flex items-center gap-1 text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
            <Zap size={10} fill="currentColor" /> {candidate.match}%
         </div>
      </div>
   </motion.div>
);

const SortableCandidateCard = (props) => {
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
   } = useSortable({
      id: props.candidate.id,
   });

   const style = {
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
   };

   return (
      <div ref={setNodeRef} style={style} {...attributes}>
         <div className="relative group">
            <div {...listeners} className="absolute -left-2 top-11 p-2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-400 transition-all z-10 bg-white rounded-full shadow-lg border border-slate-100">
               <GripVertical size={14} />
            </div>
            <CandidateCard
               candidate={props.candidate}
               status={props.status}
               onClick={props.onClick}
               isDragging={isDragging}
            />
         </div>
      </div>
   );
};

const KanbanColumn = ({ id, status, list, onCandidateClick }) => {
   const { setNodeRef } = useSortable({
      id: id,
   });

   const statusConfig = {
      new: {
         bg: "bg-amber-50/50",
         border: "border-amber-200/50",
         dot: "bg-amber-500",
         text: "text-amber-700",
         label: "New Applications"
      },
      screening: {
         bg: "bg-blue-50/40",
         border: "border-blue-200/50",
         dot: "bg-blue-500",
         text: "text-blue-700",
         label: "Initial Screening"
      },
      interviewing: {
         bg: "bg-rose-50/40",
         border: "border-rose-200/50",
         dot: "bg-rose-500",
         text: "text-rose-700",
         label: "Interviewing"
      },
      hired: {
         bg: "bg-emerald-50/40",
         border: "border-emerald-200/50",
         dot: "bg-emerald-500",
         text: "text-emerald-700",
         label: "Final Selection"
      }
   }[status] || {
      bg: "bg-slate-50/40",
      border: "border-slate-200/50",
      dot: "bg-slate-400",
      text: "text-slate-500",
      label: status
   };

   return (
      <div
         ref={setNodeRef}
         className={`w-80 group/col flex flex-col ${statusConfig.bg} backdrop-blur-sm border-2 ${statusConfig.border} rounded-[3.5rem] p-2 min-h-[600px] shadow-sm transition-all hover:shadow-md`}
      >
         <div className="px-5 py-5 flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
               <div className={`w-2.5 h-2.5 rounded-full ${statusConfig.dot} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
               <h4 className={`font-black text-[11px] uppercase tracking-[0.15em] ${statusConfig.text}`}>
                  {statusConfig.label}
               </h4>
            </div>
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 text-[10px] font-black text-slate-600 shadow-sm">
               {list.length}
            </span>
         </div>

         <div className="flex-1 overflow-y-auto space-y-2 px-1 custom-scroll pb-6">
            <SortableContext id={id} items={list.map(c => c.id)} strategy={verticalListSortingStrategy}>
               {list.map(c => (
                  <SortableCandidateCard
                     key={c.id}
                     candidate={c}
                     status={status}
                     onClick={() => onCandidateClick(c)}
                  />
               ))}
               {list.length === 0 && (
                  <div className="h-40 border-2 border-dashed border-slate-200/50 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-[9px] font-black text-slate-300 uppercase tracking-widest bg-white/20">
                     <Plus size={16} strokeWidth={3} className="opacity-30" />
                     Waiting for Talent
                  </div>
               )}
            </SortableContext>
         </div>
      </div>
   );
};

const PieChart = ({ data }) => {
   const total = data.reduce((acc, curr) => acc + curr.value, 0);
   let cumulativePercent = 0;

   function getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
   }

   return (
      <div className="flex items-center gap-10">
         <div className="relative w-48 h-48">
            <svg viewBox="-1 -1 2 2" className="transform -rotate-90 drop-shadow-2xl overflow-visible">
               {data.map((slice, i) => {
                  const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                  cumulativePercent += slice.value / total;
                  const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                  const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;
                  const pathData = [
                     `M ${startX} ${startY}`,
                     `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                     `L 0 0`,
                  ].join(' ');

                  return (
                     <motion.path
                        key={i}
                        d={pathData}
                        fill={slice.color}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                        className="cursor-pointer transition-all stroke-white stroke-[0.02]"
                     />
                  );
               })}
               <circle cx="0" cy="0" r="0.6" fill="white" className="shadow-inner" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">India</span>
               <span className="text-xl font-black text-slate-900 tracking-tighter">Impact</span>
            </div>
         </div>
         <div className="flex-1 space-y-4">
            {data.map((d, i) => (
               <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                     <div className={`w-3 h-3 rounded-full ${d.bgClass} shadow-lg`} />
                     <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{d.label}</span>
                  </div>
                  <span className="text-[11px] font-black text-slate-400 group-hover:text-slate-900 transition-colors italic">{Math.round((d.value / total) * 100)}%</span>
               </div>
            ))}
         </div>
      </div>
   );
};

export default function EmployerDashboard() {
   const [activeTab, setActiveTab] = React.useState('pipeline')
   const [selectedCandidate, setSelectedCandidate] = React.useState(null)
   const [warmedUpCandidate, setWarmedUpCandidate] = React.useState(null)
   const [showCreateJob, setShowCreateJob] = React.useState(false)
   const [searchQuery, setSearchQuery] = React.useState("")
   const [isAiInterviewerActive, setIsAiInterviewerActive] = React.useState(false)
   const [aiStep, setAiStep] = React.useState(0)
   const [showAssignmentModal, setShowAssignmentModal] = React.useState(false)
   const [successToast, setSuccessToast] = React.useState("")
   const [filterType, setFilterType] = React.useState("all")
   const [activeChatId, setActiveChatId] = React.useState(1)
   const [currentMessage, setCurrentMessage] = React.useState("")
   const [kanbanSearch, setKanbanSearch] = React.useState("")

   // --- DND SENSORS ---
   const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
   );

   const findContainer = (id) => {
      if (id in pipeline) return id;
      return Object.keys(pipeline).find((key) => pipeline[key].find((item) => item.id === id));
   };

   const [activeDragId, setActiveDragId] = React.useState(null);

   const handleDragStart = (event) => {
      setActiveDragId(event.active.id);
   };

   const handleDragOver = (event) => {
      const { active, over } = event;
      const overId = over?.id;

      if (!overId || active.id === overId) return;

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(overId);

      if (!activeContainer || !overContainer || activeContainer === overContainer) return;

      setPipeline((prev) => {
         const activeItems = prev[activeContainer];
         const overItems = prev[overContainer];

         const activeIndex = activeItems.findIndex((item) => item.id === active.id);
         const overIndex = overItems.findIndex((item) => item.id === overId);

         let newIndex;
         if (overId in prev) {
            newIndex = overItems.length + 1;
         } else {
            const isBelowLastItem = over && activeIndex > overIndex;
            const modifier = isBelowLastItem ? 1 : 0;
            newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
         }

         return {
            ...prev,
            [activeContainer]: prev[activeContainer].filter((item) => item.id !== active.id),
            [overContainer]: [
               ...prev[overContainer].slice(0, newIndex),
               prev[activeContainer][activeIndex],
               ...prev[overContainer].slice(newIndex)
            ],
         };
      });
   };

   const handleDragEnd = (event) => {
      const { active, over } = event;
      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over?.id);

      if (!activeContainer || !overContainer || activeContainer !== overContainer) {
         setActiveDragId(null);
         return;
      }

      const activeIndex = pipeline[activeContainer].findIndex((item) => item.id === active.id);
      const overIndex = pipeline[overContainer].findIndex((item) => item.id === over.id);

      if (activeIndex !== overIndex) {
         setPipeline((prev) => ({
            ...prev,
            [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
         }));
      }

      setActiveDragId(null);
   };

   // --- JOB FORM STATE ---
   const [newJobData, setNewJobData] = React.useState({
      title: "",
      salary: "",
      location: "",
      yoe: ""
   })

   // --- DATA STATES ---
   const [jobs, setJobs] = React.useState([
      { id: 101, title: "Senior Frontend Lead", status: "Active", applicants: 45, date: "Oct 20, 2024", views: 1240, matchRate: 92, salary: "₹24L - ₹38L", location: "Bengaluru (HSR Layout)", yoe: "5+ Years" },
      { id: 102, title: "Principal Product Designer", status: "Active", applicants: 28, date: "Oct 18, 2024", views: 850, matchRate: 78, salary: "₹30L - ₹45L", location: "Mumbai (BKC)", yoe: "8+ Years" },
      { id: 103, title: "Cloud DevOps Architect", status: "Draft", applicants: 0, date: "Oct 25, 2024", views: 0, matchRate: 0, salary: "₹28L - ₹40L", location: "Pune (Hinjewadi)", yoe: "6+ Years" },
   ])

   // Enhanced Pipeline with Results
   const [pipeline, setPipeline] = React.useState({
      new: [
         { id: 1, name: "Alice Johnson", role: "Frontend Developer", match: 95, daysInStage: 1, tags: ["Highly Collaborative"], summary: "Expert React developer.", status: "Pending" },
         { id: 2, name: "Bob Smith", role: "UX Designer", match: 88, daysInStage: 2, tags: ["Creative"], summary: "High-end product focus.", status: "Pending" },
      ],
      screening: [
         { id: 3, name: "Charlie Davis", role: "Product Manager", match: 92, daysInStage: 3, tags: ["Data-driven"], summary: "Outcome-focused product lead.", status: "Task Sent" },
         { id: 7, name: "Elena Volkov", role: "System Lead", match: 94, daysInStage: 1, tags: ["C++ Expert"], summary: "Previous HFT lead.", status: "Task Completed", result: "92/100" },
      ],
      interviewing: [
         { id: 4, name: "Diana Prince", role: "Frontend Developer", match: 98, daysInStage: 7, tags: ["Deep Technical"], summary: "Expert in Next.js/Tailwind.", status: "AI Interview Completed", result: "A+" },
      ],
      hired: [
         { id: 5, name: "Evan Wright", role: "Backend Engineer", match: 100, daysInStage: 0, tags: ["Scale-focused"], summary: "Expert in Elixir.", status: "Hired" },
      ]
   })

   const [chatHistories, setChatHistories] = React.useState({
      1: [{ text: "Excited about your experience with AI pipelines!", type: "sent", time: "10:42 AM" }],
      2: [{ text: "Your UX portfolio is very impressive.", type: "sent", time: "11:20 AM" }],
      3: [{ text: "Hi Charlie, we just sent over the System Design Task. Please check your dashboard.", type: "sent", time: "2:15 PM" }],
      4: [{ text: "Great performance on the AI Interview, Diana! Your score was A+.", type: "sent", time: "4:00 PM" }]
   })

   // --- HANDLERS ---
   const triggerToast = (msg) => {
      setSuccessToast(msg)
      setTimeout(() => setSuccessToast(""), 3500)
   }

   const handleSendMessage = (targetId = null, systemMsg = null) => {
      const id = targetId || (selectedCandidate ? selectedCandidate.id : activeChatId)
      if (!id || (!currentMessage.trim() && !systemMsg)) return

      const textToSend = systemMsg || currentMessage
      const newMsg = { text: textToSend, type: "sent", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }

      setChatHistories(prev => ({ ...prev, [id]: [...(prev[id] || []), newMsg] }))
      if (!systemMsg) setCurrentMessage("")

      if (!systemMsg) {
         setTimeout(() => {
            const reply = { text: "Received, I'll take a look at it now!", type: "received", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            setChatHistories(prev => ({ ...prev, [id]: [...(prev[id] || []), reply] }))
         }, 1500)
      }
   }

   const moveCandidate = (candidate, fromStage, toStage) => {
      setPipeline(prev => {
         const newPipeline = { ...prev }
         newPipeline[fromStage] = newPipeline[fromStage].filter(c => c.id !== candidate.id)
         newPipeline[toStage] = [...newPipeline[toStage], { ...candidate, daysInStage: 0 }]
         return newPipeline
      })
      triggerToast(`Moved ${candidate.name} to ${toStage}`)
   }

   const handleCreateJob = () => {
      if (!newJobData.title) return
      const newJob = {
         id: Date.now(),
         ...newJobData,
         status: "Active",
         applicants: 0,
         date: "Today",
         views: 0,
         matchRate: 100
      }
      setJobs([newJob, ...jobs])
      triggerToast("Job published! Live-matching candidates now...")
      setNewJobData({ title: "", salary: "", location: "", yoe: "" })
      setShowCreateJob(false)
   }

   const handleDeployTask = (type) => {
      const candidateId = selectedCandidate?.id
      if (!candidateId) return

      const msg = type === 'AI'
         ? `🔐 AI TECHNICAL INTERVIEW ASSIGNED: Please complete the audit via this secure link: nextstep.ai/interview/${candidateId}`
         : `⚡ PROJECT TASK ISSUED: The System Audit (4h) has been assigned to your workspace.`;

      handleSendMessage(candidateId, msg)

      // Update Pipeline State to show "Task Sent"
      setPipeline(prev => {
         const next = { ...prev }
         Object.keys(next).forEach(stage => {
            next[stage] = next[stage].map(c => c.id === candidateId ? { ...c, status: type === 'AI' ? 'AI Sent' : 'Task Sent' } : c)
         })
         return next
      })

      triggerToast(`${type} Assignment deployed to ${selectedCandidate?.name}.`)
      setShowAssignmentModal(false)
   }

   const renderSidebarItem = (id, label, icon) => (
      <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all group relative ${activeTab === id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-50'}`}>
         {icon} <span className="hidden lg:block">{label}</span>
         {activeTab === id && <motion.div layoutId="active-pill" className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full" />}
      </button>
   )

   return (
      <div className="flex h-screen overflow-hidden bg-[#FBFBFF] text-slate-900 font-sans">
         <AnimatePresence>
            {successToast && (
               <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 40, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-0 left-1/2 -translate-x-1/2 z-[500] bg-slate-900/95 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 min-w-[320px]">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white"><Check size={16} strokeWidth={3} /></div>
                  <p className="text-white font-bold text-sm tracking-tight">{successToast}</p>
               </motion.div>
            )}
         </AnimatePresence>

         {/* 1. SIDEBAR */}
         <aside className="w-20 lg:w-72 bg-white border-r border-slate-100 hidden md:flex flex-col z-30 shrink-0 shadow-[20px_0_60px_rgba(0,0,0,0.02)]">
            <div className="p-8 pb-12">
               <div className="flex items-center gap-3 text-2xl font-black text-indigo-600 mb-12 cursor-pointer" onClick={() => window.location.href = '/'}>
                  <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 font-black">N</div>
                  <span className="hidden lg:block tracking-tighter">NextStep</span>
               </div>
               <nav className="space-y-2">
                  {renderSidebarItem('pipeline', 'Application Pipeline', <Columns size={20} />)}
                  {renderSidebarItem('jobs', 'Active Roles', <Briefcase size={20} />)}
                  {renderSidebarItem('messages', 'Secure Inbox', <MessageSquare size={20} />)}
                  {renderSidebarItem('analytics', 'Performance Hub', <BarChart size={20} />)}
               </nav>
            </div>
            <div className="mt-auto p-8 border-t border-slate-50">
               <div className="flex items-center gap-4 lg:bg-slate-50 lg:p-3 rounded-2xl">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center font-black text-indigo-600">JD</div>
                  <div className="hidden lg:block">
                     <p className="text-xs font-black">Jane Doe</p>
                     <p className="text-[10px] font-bold text-slate-400">Principal Recruiter</p>
                  </div>
               </div>
               <button 
                  onClick={() => window.location.href = '/login'} 
                  className="w-full mt-6 py-4 px-6 flex items-center gap-4 text-slate-400 hover:text-red-600 font-black text-xs uppercase tracking-widest transition-all rounded-xl hover:bg-red-50"
               >
                  <LogOut size={18} /> <span className="hidden lg:block">Terminate Session</span>
               </button>
            </div>
         </aside>

         {/* 2. MAIN WORKSPACE */}
         <div className="flex-1 flex flex-col h-full relative overflow-hidden min-w-0">
            <header className="h-24 bg-white/40 backdrop-blur-3xl border-b border-slate-100/60 px-10 flex items-center justify-between sticky top-0 z-40 shrink-0">
               <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight capitalize">{activeTab}</h1>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Tech Corp Talent HQ</p>
               </div>
               <div className="flex items-center gap-4">
                  {activeTab === 'pipeline' && (
                     <div className="relative w-64 group mr-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input
                           type="text"
                           placeholder="Filter pipeline..."
                           value={kanbanSearch}
                           onChange={(e) => setKanbanSearch(e.target.value)}
                           className="h-14 w-full bg-slate-50 border border-transparent rounded-2xl pl-12 pr-6 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm"
                        />
                     </div>
                  )}
                  <Button onClick={() => setShowCreateJob(true)} className="h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                     <Plus className="mr-2 h-5 w-5" /> Post New Role
                  </Button>
               </div>
            </header>
            <main className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#FBFBFF]">
               <AnimatePresence mode="wait">
                  {activeTab === 'pipeline' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 min-h-full">
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex gap-2">
                              {['all', 'high_match'].map(t => (
                                 <button key={t} onClick={() => setFilterType(t)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filterType === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white text-slate-500 border border-slate-200'}`}>
                                    {t.replace('_', ' ')}
                                 </button>
                              ))}
                           </div>
                           <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-slate-100 pl-6">
                              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Live Updates</span>
                              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Match Engine active</span>
                           </div>
                        </div>

                        <DndContext
                           sensors={sensors}
                           collisionDetection={closestCorners}
                           onDragStart={handleDragStart}
                           onDragOver={handleDragOver}
                           onDragEnd={handleDragEnd}
                        >
                           <div className="flex h-[calc(100vh-280px)] gap-10 min-w-max pb-10">
                              {Object.keys(pipeline).map(status => {
                                 const rawList = pipeline[status];
                                 let filteredList = rawList.filter(c =>
                                    c.name.toLowerCase().includes(kanbanSearch.toLowerCase()) ||
                                    c.role.toLowerCase().includes(kanbanSearch.toLowerCase())
                                 );
                                 if (filterType === 'high_match') filteredList = filteredList.filter(c => c.match >= 90);

                                 return (
                                    <KanbanColumn
                                       key={status}
                                       id={status}
                                       status={status}
                                       list={filteredList}
                                       onCandidateClick={(c) => setSelectedCandidate({ ...c, stage: status })}
                                    />
                                 );
                              })}
                           </div>

                           <DragOverlay dropAnimation={{
                              sideEffects: defaultDropAnimationSideEffects({
                                 styles: {
                                    active: {
                                       opacity: '0.5',
                                    },
                                 },
                              }),
                           }}>
                              {activeDragId ? (
                                 <div className="rotate-3 shadow-2xl">
                                    <CandidateCard
                                       candidate={Object.values(pipeline).flat().find(c => c.id === activeDragId)}
                                       isDragging
                                    />
                                 </div>
                              ) : null}
                           </DragOverlay>
                        </DndContext>
                     </motion.div>
                  )}


                  {activeTab === 'jobs' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 space-y-12">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                           {jobs.map(job => (
                              <div key={job.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:shadow-2xl hover:-translate-y-1 transition-all">
                                 <div className="flex justify-between items-start mb-6">
                                    <div className="p-6 bg-indigo-600 text-white rounded-[2rem] shadow-xl shadow-indigo-600/10">
                                       <Briefcase size={32} />
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{job.status}</div>
                                 </div>
                                 <h3 className="text-2xl font-black mb-2">{job.title}</h3>
                                 <div className="flex flex-wrap gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">
                                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                                    <span className="flex items-center gap-1.5"><Zap size={14} /> {job.salary}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {job.yoe} YOE</span>
                                 </div>
                                 <div className="grid grid-cols-3 gap-6 bg-slate-50 p-6 rounded-[2rem]">
                                    <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Applicants</p><h5 className="font-black">{job.applicants}</h5></div>
                                    <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Match Rate</p><h5 className="font-black text-emerald-600">{job.matchRate}%</h5></div>
                                    <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Created</p><h5 className="font-black">{job.date}</h5></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  )}

                  {activeTab === 'messages' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex overflow-hidden">
                        <div className="w-[400px] border-r border-slate-100 bg-white flex flex-col shrink-0">
                           <div className="p-10 border-b border-slate-50">
                              <h4 className="text-xl font-black mb-8 tracking-tighter">Secure <span className="text-indigo-600">Comms</span></h4>
                              <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 p-3">
                                 <input type="text" placeholder="Filter talent chat..." className="w-full bg-transparent border-none font-bold text-xs outline-none" />
                              </div>
                           </div>
                           <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-2">
                              {Object.entries(pipeline).flatMap(([_, s]) => s).map(c => (
                                 <button onClick={() => setActiveChatId(c.id)} key={c.id} className={`w-full p-6 flex items-start gap-4 rounded-[2rem] transition-all relative ${activeChatId === c.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'hover:bg-slate-50'}`}>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black shrink-0 ${activeChatId === c.id ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                                       {c.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="text-left min-w-0">
                                       <p className="font-black text-sm truncate">{c.name}</p>
                                       <p className={`text-[10px] font-bold truncate ${activeChatId === c.id ? 'text-indigo-100' : 'text-slate-400'}`}>{chatHistories[c.id]?.slice(-1)[0]?.text || "Assign a task to start."}</p>
                                    </div>
                                 </button>
                              ))}
                           </div>
                        </div>

                        <div className="flex-1 flex flex-col bg-[#FBFBFF] relative overflow-hidden">
                           {activeChatId ? (
                              <>
                                 <div className="px-10 py-6 bg-white/60 backdrop-blur-md border-b border-slate-100 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black">
                                          {Object.entries(pipeline).flatMap(([_, s]) => s).find(c => c.id === activeChatId)?.name.split(' ').map(n => n[0]).join('')}
                                       </div>
                                       <h4 className="text-lg font-black tracking-tight">{Object.entries(pipeline).flatMap(([_, s]) => s).find(c => c.id === activeChatId)?.name}</h4>
                                    </div>
                                    <div className="flex gap-2">
                                       <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-white transition-all"><MoreHorizontal size={18} /></button>
                                    </div>
                                 </div>

                                 <div className="flex-1 overflow-y-auto p-12 space-y-8 custom-scroll">
                                    {(chatHistories[activeChatId] || []).map((msg, i) => (
                                       <motion.div key={i} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                                          <div className={`max-w-[70%] space-y-1.5 flex flex-col ${msg.type === 'sent' ? 'items-end' : 'items-start'}`}>
                                             <div className={`p-5 rounded-[2rem] text-[13px] font-bold leading-relaxed ${msg.type === 'sent' ? 'bg-indigo-600 text-white rounded-tr-sm shadow-lg shadow-indigo-600/10' : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'}`}>
                                                {msg.text}
                                             </div>
                                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mx-4">{msg.time}</p>
                                          </div>
                                       </motion.div>
                                    ))}
                                 </div>

                                 <div className="p-8 bg-white border-t border-slate-100 px-10">
                                    <div className="relative group flex items-center gap-4">
                                       <input
                                          type="text"
                                          value={currentMessage}
                                          onChange={e => setCurrentMessage(e.target.value)}
                                          onKeyDown={e => e.key === 'Enter' && handleSendMessage(activeChatId)}
                                          placeholder="Message candidate..."
                                          className="flex-1 h-14 bg-slate-50 border-none rounded-2xl px-6 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-inner"
                                       />
                                       <button onClick={() => handleSendMessage(activeChatId)} className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                                          <Send size={20} />
                                       </button>
                                    </div>
                                 </div>
                              </>
                           ) : (
                              <div className="flex-1 flex items-center justify-center p-20 opacity-20">
                                 <MessageSquare size={120} strokeWidth={1} />
                              </div>
                           )}
                        </div>
                     </motion.div>
                  )}

                  {activeTab === 'analytics' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 space-y-10 w-full overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                           {[
                              { label: "Pipeline Velocity", val: "A+", icon: <Zap size={20} />, trend: "+12%" },
                              { label: "Avg Match Score", val: "88%", icon: <Target size={20} />, trend: "Top 5%" },
                              { label: "Cycle Time", val: "14d", icon: <Clock size={20} />, trend: "-2d" },
                              { label: "Candidate Sat.", val: "9.2", icon: <ShieldCheck size={20} />, trend: "+0.5" },
                           ].map((s, i) => (
                              <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:-translate-y-1 hover:shadow-2xl transition-all">
                                 <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform">{s.icon}</div>
                                    <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{s.trend}</span>
                                 </div>
                                 <div className="space-y-1">
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{s.val}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">{s.label}</p>
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Interactive Graph Section */}
                        <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm p-12 relative overflow-hidden">
                           <div className="flex justify-between items-end mb-16">
                              <div>
                                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-3 italic">Hiring Volume Insights</h2>
                                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" /> Application Flow Velocity
                                 </p>
                              </div>
                              <div className="flex gap-4">
                                 <Button variant="outline" className="h-12 rounded-2xl px-8 text-xs font-black border-slate-200">Export CSV Data</Button>
                                 <Button className="h-12 rounded-2xl px-8 bg-slate-900 text-white text-xs font-black">Generate Executive Report</Button>
                              </div>
                           </div>

                           {/* Beautiful Animated Chart */}
                           <div className="h-[350px] w-full relative group">
                              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-black text-slate-300 pr-6 italic pb-8">
                                 <span>10k</span><span>7.5k</span><span>5k</span><span>2.5k</span><span>0</span>
                              </div>

                              <div className="ml-16 h-full border-b-2 border-slate-100 relative flex items-end justify-between px-6 pb-2">
                                 {/* Grid Lines */}
                                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2">
                                    {[0, 1, 2, 3, 4].map(idx => (
                                       <div key={idx} className="w-full border-t border-slate-50/80" />
                                    ))}
                                 </div>

                                 {[40, 65, 55, 80, 70, 95, 85, 100, 90, 75, 45, 60].map((h, i) => (
                                    <div key={i} className="w-[5%] flex flex-col items-center gap-4 group/bar z-10 h-full justify-end relative">
                                       <div className="w-full relative flex items-end h-[calc(100%-32px)]">
                                          <motion.div
                                             initial={{ height: 0 }}
                                             animate={{ height: `${h}%` }}
                                             transition={{ delay: i * 0.05, duration: 1, ease: 'easeOut' }}
                                             className={`w-full rounded-t-[1rem] transition-all shadow-lg ${i === 7 ? 'bg-indigo-600 shadow-[0_10px_20px_rgba(79,70,229,0.3)]' : 'bg-slate-100 group-hover/bar:bg-indigo-300'}`}
                                          />
                                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity z-20 pointer-events-none shadow-xl scale-95 group-hover/bar:scale-100 duration-200 whitespace-nowrap">
                                             {h * 100} Apps
                                          </div>
                                       </div>
                                       <span className="text-[10px] font-black text-slate-400 uppercase">M{i + 1}</span>
                                    </div>
                                 ))}

                                 {/* SVG Advanced Glow Line */}
                                 <svg className="absolute inset-x-6 inset-y-0 w-[calc(100%-3rem)] h-[calc(100%-32px)] pointer-events-none overflow-visible z-20 drop-shadow-[0_8px_16px_rgba(79,70,229,0.4)]">
                                    <motion.path
                                       initial={{ pathLength: 0 }}
                                       animate={{ pathLength: 1 }}
                                       transition={{ duration: 2.5, ease: "easeInOut" }}
                                       d="M 10 200 C 60 180, 100 120, 160 140 S 240 60, 300 80 S 380 40, 440 30 S 520 80, 580 60 S 660 140, 720 120 S 780 180, 840 160"
                                       fill="none"
                                       stroke="url(#gradientTrend)"
                                       strokeWidth="6"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <defs>
                                       <linearGradient id="gradientTrend" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#818cf8" />
                                          <stop offset="50%" stopColor="#4f46e5" />
                                          <stop offset="100%" stopColor="#db2777" />
                                       </linearGradient>
                                    </defs>
                                 </svg>
                              </div>
                           </div>
                        </div>

                        {/* Split Data Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                           <div className="bg-[#0F172A] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
                              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[60px] pointer-events-none" />
                              <div className="relative z-10 space-y-10">
                                 <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Pipeline Conversion</p>
                                    <h3 className="text-3xl font-black italic tracking-tight">Talent Acquisition Funnel</h3>
                                 </div>

                                 <div className="space-y-6">
                                    {[
                                       { label: "Applications", val: "1,240", width: "100%", color: "bg-indigo-500/20 border-indigo-500/50" },
                                       { label: "AI Screening", val: "480", width: "75%", color: "bg-indigo-500/40 border-indigo-500/60" },
                                       { label: "Technical Audit", val: "124", width: "50%", color: "bg-indigo-500/60 border-indigo-500/80" },
                                       { label: "Hired", val: "18", width: "25%", color: "bg-emerald-500 border-emerald-400" },
                                    ].map((step, i) => (
                                       <div key={i} className="group cursor-pointer">
                                          <div className="flex justify-between items-end mb-2">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{step.label}</span>
                                             <span className="text-sm font-black text-white">{step.val}</span>
                                          </div>
                                          <div className="h-6 w-full relative">
                                             <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: step.width }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={`h-full ${step.color} border rounded-r-xl rounded-l-sm transition-all group-hover:brightness-125 shadow-[0_0_20px_rgba(79,70,229,0.1)]`}
                                             />
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <div className="bg-white rounded-[3.5rem] border border-slate-100 p-12 shadow-sm space-y-12 h-full">
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Regional Hubs</p>
                                 <div className="flex items-center justify-between">
                                    <h3 className="text-3xl font-black italic tracking-tight text-slate-900">Demographic Impact</h3>
                                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                       <TrendingUp size={10} /> +18%
                                    </div>
                                 </div>
                              </div>
                              <PieChart data={[
                                 { label: "Bengaluru", value: 42, color: "#4f46e5", bgClass: "bg-indigo-600" },
                                 { label: "Mumbai", value: 28, color: "#0f172a", bgClass: "bg-slate-900" },
                                 { label: "Delhi NCR", value: 18, color: "#10b981", bgClass: "bg-emerald-500" },
                                 { label: "Hyderabad", value: 12, color: "#cbd5e1", bgClass: "bg-slate-300" },
                              ]} />
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </main>
         </div>

         {/* 3. SIDE-OVER CRM PROFILE (ALIGNED TO ATTACHED IMAGE) */}
         <AnimatePresence>
            {selectedCandidate && (
               <div className="fixed inset-0 z-[100] flex items-center justify-end p-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCandidate(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" />
                  <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="w-full max-w-2xl bg-white h-[calc(100vh-32px)] relative z-10 shadow-2xl rounded-[4rem] overflow-hidden flex flex-col border border-white/20">

                     {/* CRM HEADER */}
                     <div className="p-12 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-10">
                        <div className="flex items-center gap-8">
                           <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-2xl relative">
                              {selectedCandidate?.name?.split(' ').map(n => n[0]).join('')}
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse" />
                           </div>
                           <div>
                              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{selectedCandidate?.name}</h2>
                              <div className="flex items-center gap-4">
                                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">{selectedCandidate?.stage}</span>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedCandidate?.role}</span>
                              </div>
                           </div>
                        </div>
                        <button onClick={() => setSelectedCandidate(null)} className="w-14 h-14 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center transition-all"><X size={24} className="text-slate-400" /></button>
                     </div>

                     <div className="flex-1 overflow-y-auto p-12 custom-scroll space-y-12">

                        {/* AI INTERROGATOR BLOCK (EXACT MATCH TO IMAGE) */}
                        <div className="bg-[#0F172A] rounded-[4rem] p-12 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                           <div className="relative z-10 flex flex-col items-center text-center">
                              <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.5)] mb-8">
                                 <Cpu size={48} strokeWidth={2.5} />
                              </div>
                              <h4 className="text-3xl font-black mb-1 italic tracking-tight uppercase">AI Technical Interrogator</h4>
                              <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-10">Horton-Scale Talent Verification</p>
                              <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-sm mb-12">Initiate a profile-specific technical audit focusing on architectural patterns and heritage system management.</p>

                              {isAiInterviewerActive ? (
                                 <div className="w-full space-y-6">
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] text-left">
                                       <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-4 italic">Query Node 0{aiStep}/3</p>
                                       <p className="text-lg font-bold text-indigo-50 italic">"Can you elaborate on your experience with bundle size optimization in high-concurrency environments?"</p>
                                    </div>
                                    <Button onClick={() => aiStep < 3 ? setAiStep(aiStep + 1) : (setIsAiInterviewerActive(false), setAiStep(0), triggerToast("Full Technical Audit Generated."))} className="w-full h-20 bg-white text-slate-900 font-black rounded-[2rem] text-lg hover:bg-slate-100 shadow-2xl transition-all uppercase tracking-widest">Process Component Context</Button>
                                 </div>
                              ) : (
                                 <Button onClick={() => { setIsAiInterviewerActive(true); setAiStep(1); }} className="w-full max-w-md h-20 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-[2rem] shadow-2xl shadow-indigo-600/30 transition-all text-xl py-8">
                                    <Play className="mr-3 h-6 w-6 fill-white shrink-0" /> Launch Deep Interrogation
                                 </Button>
                              )}
                           </div>
                        </div>

                        {/* ACTION SECTION */}
                        <div className="grid grid-cols-2 gap-8">
                           <div onClick={() => setShowAssignmentModal(true)} className="p-12 bg-slate-50 border-2 border-slate-50 rounded-[3.5rem] hover:border-indigo-600 hover:bg-white transition-all group cursor-pointer text-center">
                              <FileText className="text-indigo-600 mb-6 mx-auto group-hover:scale-110 transition-transform" size={48} strokeWidth={1.5} />
                              <h5 className="font-black text-lg tracking-tight mb-2">Issue Project</h5>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-tight">Interactive Workspace Task</p>
                           </div>
                           <div onClick={() => triggerToast("Initializing Secure Video Bridge...")} className="p-12 bg-slate-50 border-2 border-slate-50 rounded-[3.5rem] hover:border-violet-600 hover:bg-white transition-all group cursor-pointer text-center">
                              <Video className="text-violet-600 mb-6 mx-auto group-hover:scale-110 transition-transform" size={48} strokeWidth={1.5} />
                              <h5 className="font-black text-lg tracking-tight mb-2">Video Node</h5>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-tight">Direct Talent Connection</p>
                           </div>
                        </div>

                        {/* LOCAL MESSAGE CONTEXT */}
                        <div className="bg-slate-50 p-10 rounded-[4rem] border border-slate-100">
                           <div className="flex items-center gap-4 mb-8">
                              <div className="h-0.5 bg-slate-200 flex-1" />
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workspace Comms Hub</span>
                              <div className="h-0.5 bg-slate-200 flex-1" />
                           </div>
                           <div className="max-h-60 overflow-y-auto pr-4 custom-scroll space-y-4 mb-8">
                              {(chatHistories[selectedCandidate?.id] || []).map((msg, i) => (
                                 <div key={i} className={`flex flex-col ${msg.type === 'sent' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-5 rounded-[2rem] text-[13px] font-bold shadow-sm ${msg.type === 'sent' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'}`}>
                                       {msg.text}
                                    </div>
                                    <span className="text-[8px] font-black text-slate-400 uppercase mt-1 tracking-widest mx-4">{msg.time}</span>
                                 </div>
                              ))}
                           </div>
                           <div className="relative">
                              <input value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} type="text" placeholder="Write a message..." className="w-full h-18 bg-white border border-slate-200 rounded-[1.8rem] pl-8 pr-24 text-[13px] font-bold outline-none focus:ring-8 focus:ring-indigo-600/5 transition-all shadow-inner" />
                              <button onClick={() => handleSendMessage()} className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:shadow-xl active:scale-90 transition-all">
                                 <Send size={20} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         {/* 4. MODALS */}
         <AnimatePresence>
            {showCreateJob && (
               <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCreateJob(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" />
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-2xl w-full bg-white rounded-[4rem] p-16 relative z-10 shadow-2xl border border-white/20">
                     <div className="flex justify-between items-start mb-12">
                        <div>
                           <h3 className="text-4xl font-black tracking-tighter italic mb-2">Publish Role</h3>
                           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Initialize Talent Search</p>
                        </div>
                        <button onClick={() => setShowCreateJob(false)} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all"><X size={24} /></button>
                     </div>
                     <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="col-span-2 space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Job Designation</label>
                              <input value={newJobData.title} onChange={e => setNewJobData({ ...newJobData, title: e.target.value })} type="text" placeholder="e.g. Lead UI Architect" className="w-full h-18 bg-slate-50 border border-slate-100 rounded-[1.8rem] px-8 font-black text-lg focus:bg-white focus:ring-8 focus:ring-indigo-600/5 transition-all outline-none" />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Salary Component</label>
                              <input value={newJobData.salary} onChange={e => setNewJobData({ ...newJobData, salary: e.target.value })} type="text" placeholder="e.g. $140k - 180k" className="w-full h-18 bg-slate-50 border border-slate-100 rounded-[1.8rem] px-8 font-bold text-sm focus:bg-white transition-all outline-none" />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Location Topology</label>
                              <input value={newJobData.location} onChange={e => setNewJobData({ ...newJobData, location: e.target.value })} type="text" placeholder="e.g. Remote / Hybrid" className="w-full h-18 bg-slate-50 border border-slate-100 rounded-[1.8rem] px-8 font-bold text-sm focus:bg-white transition-all outline-none" />
                           </div>
                           <div className="space-y-3 col-span-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Threshold Experience (YOE)</label>
                              <input value={newJobData.yoe} onChange={e => setNewJobData({ ...newJobData, yoe: e.target.value })} type="text" placeholder="e.g. 5+ Years" className="w-full h-18 bg-slate-50 border border-slate-100 rounded-[1.8rem] px-8 font-bold text-sm focus:bg-white transition-all outline-none" />
                           </div>
                        </div>
                        <div className="p-10 bg-[#0F172A] rounded-[3.5rem] text-white flex items-center gap-8 shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-bl-full group-hover:scale-110 transition-transform" />
                           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"><Cpu size={32} /></div>
                           <p className="text-[13px] font-bold leading-relaxed text-slate-400 italic">"Publishing triggers the **Match Engine**. Your 'New' column will populate with 85%+ matched candidates within 60 seconds."</p>
                        </div>
                     </div>
                     <div className="flex gap-6 mt-16">
                        <Button onClick={handleCreateJob} className="flex-1 h-20 bg-slate-900 hover:bg-black text-white font-black text-xl rounded-[2rem] shadow-2xl active:scale-95 transition-all italic">Launch Search Protocol</Button>
                        <Button variant="ghost" onClick={() => setShowCreateJob(false)} className="h-20 px-10 text-slate-400 font-bold hover:text-slate-900">Cancel Slot</Button>
                     </div>
                  </motion.div>
               </div>
            )}

            {showAssignmentModal && (
               <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAssignmentModal(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" />
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-2xl w-full bg-white rounded-[4rem] p-16 relative z-10 shadow-2xl">
                     <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-10 shadow-inner"><Code size={48} strokeWidth={2.5} /></div>
                     <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-4 italic">Assign Technical Task</h3>
                     <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] italic mb-12">Target Profile: {selectedCandidate?.name}</p>

                     <div className="grid grid-cols-1 gap-4 mb-14">
                        <button
                           onClick={() => handleDeployTask('AI')}
                           className="p-10 bg-[#0F172A] text-white rounded-[3rem] flex items-center justify-between shadow-2xl shadow-indigo-600/10 group hover:-translate-y-1 transition-all"
                        >
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl"><Cpu size={32} /></div>
                              <div className="text-left">
                                 <p className="font-black text-lg italic">Launch AI Interview Link</p>
                                 <p className="text-[10px] font-black text-indigo-400 uppercase mt-1 tracking-widest">20m Automated Interrogation</p>
                              </div>
                           </div>
                           <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>

                        <button
                           onClick={() => handleDeployTask('Project')}
                           className="p-10 bg-white border-4 border-slate-50 text-slate-900 rounded-[3rem] flex items-center justify-between group hover:border-indigo-600 hover:shadow-2xl transition-all"
                        >
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center"><Layers size={32} /></div>
                              <div className="text-left">
                                 <p className="font-black text-lg italic">Direct System Audit Project</p>
                                 <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">4h Real-world Environment Task</p>
                              </div>
                           </div>
                           <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                     </div>

                     <div className="flex justify-center">
                        <Button variant="ghost" className="h-14 px-12 text-slate-400 hover:text-slate-900 font-black uppercase tracking-widest text-[10px]" onClick={() => setShowAssignmentModal(false)}>Terminate Request</Button>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         <style dangerouslySetInnerHTML={{
            __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 20px; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 20px; }
      `}} />
      </div>
   )
}
