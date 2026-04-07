"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowLeft, Lock, Globe, Clock, ShieldAlert, Cpu, EyeOff } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
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
              <Lock size={24} />
            </div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Privacy Architecture</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black italic tracking-tighter mb-6"
          >
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Governance</span>
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
               <ShieldCheck size={18} className="text-slate-400" />
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">AES-256 Verified</span>
            </div>
          </motion.div>
        </header>

        <div className="prose prose-slate max-w-none space-y-12 pb-20">
          <section className="space-y-4">
            <h2 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-4">
               <Cpu size={24} className="text-slate-400" />
               Neural Ingestion Integrity
            </h2>
            <p className="leading-relaxed text-slate-600 font-medium px-4 border-l-4 border-indigo-600">
               NextStep ingests highly sensitive career data. We utilize a strictly Zero-Retention frontend architecture. All resumes and user documents are immediately wrapped in AES-256 encryption layers at rest. Our neural engines process your application patterns for matching without exposing your plaintext profile to unauthorized entities.
            </p>
          </section>

          <section className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-100 rounded-[3rem] space-y-4 shadow-sm">
                   <h3 className="text-xl font-black italic tracking-tight uppercase flex items-center gap-4">
                      <EyeOff size={20} className="text-indigo-600" />
                      Stealth Mode
                   </h3>
                   <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                      Our signature "Stealth Mode" cryptographically masks your current job placement from mapping algorithms. Your current employer cannot see your application habits on the NextStep platform.
                   </p>
                </div>
                <div className="p-10 bg-slate-900 text-white rounded-[3rem] space-y-4 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[4rem]" />
                   <h3 className="text-xl font-black italic tracking-tight uppercase flex items-center gap-4">
                      <ShieldAlert size={20} className="text-rose-500" />
                      Zero Trust
                   </h3>
                   <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                      Access to your profile is strictly role-based. Employers can only view "Verified Deep Interrogation Results" once they have been matched by the Neural Engine.
                   </p>
                </div>
             </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black not-italic">02</span>
              Data Portability
            </h2>
            <p className="leading-relaxed text-slate-600 font-medium px-4">
               Users maintain absolute authority over their career data. You may request a cryptographic dump of all ingested artifacts or initiate an immediate "Flush Protocol" to erase your entire career history from our active buffers.
            </p>
          </section>
          
          <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
             <h3 className="text-3xl font-black italic tracking-tight mb-4 leading-tight">Identity Verification Transparency</h3>
             <p className="text-indigo-100 font-medium italic leading-relaxed">
               NextStep utilizes biometric passkeys and WebAuthn. We do NOT store your biometric data. We only store the cryptographic challenge outputs verified by your native device hardware.
             </p>
          </div>
          
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center pt-20 italic">
            Privacy Governance v2.1 • All Rights Reserved Oct 2024
          </p>
        </div>
      </div>
    </div>
  )
}
