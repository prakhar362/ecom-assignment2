"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowLeft, FileText, Globe, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Base
        </Link>

        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
              <FileText size={24} />
            </div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">NextStep Governance</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black italic tracking-tighter mb-6"
          >
            Terms <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">of Service</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-8 py-6 border-y border-slate-200"
          >
            <div className="flex items-center gap-3">
               <Clock size={18} className="text-slate-400" />
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Last Updated: Oct 28, 2024</span>
            </div>
            <div className="flex items-center gap-3">
               <Globe size={18} className="text-slate-400" />
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Global Protocol 2.1</span>
            </div>
            <div className="flex items-center gap-3">
               <ShieldCheck size={18} className="text-slate-400" />
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Audited & Verified</span>
            </div>
          </motion.div>
        </header>

        <div className="prose prose-slate max-w-none space-y-12 pb-20">
          <section className="space-y-4">
            <h2 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black not-italic">01</span>
              Acceptance of Agreement
            </h2>
            <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm leading-relaxed text-slate-600 font-medium italic">
               By accessing or utilizing the NextStep Career Architecture (the "Platform"), you signify your absolute and categorical agreement to these terms. Our protocols are designed for optimal career engineering and strictly prohibit any unauthorized mapping of our backend logic.
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black not-italic">02</span>
              User Identity & Auth
            </h2>
            <p className="leading-relaxed text-slate-600 font-medium px-4 border-l-4 border-indigo-600">
               NextStep utilizes advanced cryptographic verification. Users are solely responsible for managing their Master Keys and Biometric identifiers. Forward-facing job application habits are ingested by our Neural Match Engine; however, we do not guarantee employment, but rather structural career opportunities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black not-italic">03</span>
              Intellectual Asset Protection
            </h2>
            <p className="leading-relaxed text-slate-600 font-medium px-4">
               All algorithms, UI/UX designs, and the "Deep Interrogation" logic are exclusive intellectual assets of NextStep Inc. Any attempt to scrape, duplicate, or re-engineer the platform via third-party AI scraping bots is a direct violation of our core security policies.
            </p>
          </section>
          
          <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group hover:rotate-1 transition-transform">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[4rem]" />
             <Shield size={64} className="mb-6 opacity-40 group-hover:scale-110 transition-transform" strokeWidth={1} />
             <h3 className="text-3xl font-black italic tracking-tight mb-4 leading-tight">Structural Integrity Policy</h3>
             <p className="text-indigo-100 font-medium italic leading-relaxed">
               NextStep reserves the right to terminate session authority for any entity found bypassing our "Stealth Mode" protections or engaging in bad-faith recruitment practices. We maintain a zero-trust architecture.
             </p>
          </div>
          
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center pt-20 italic">
            NextStep Governance v2.1 • All Rights Reserved Oct 2024
          </p>
        </div>
      </div>
    </div>
  )
}
