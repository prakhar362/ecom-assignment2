"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Lock, Key, Smartphone, Server, EyeOff, Fingerprint, Search } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = React.useState("")
  const [showOtp, setShowOtp] = React.useState(false)
  const [stealthMode, setStealthMode] = React.useState(false)

  // OTP State handling
  const [otp, setOtp] = React.useState(["", "", "", ""])
  const otpInputRefs = React.useRef([])

  const passwordStrength = Math.min(password.length * 10, 100)
  const strengthColor = passwordStrength < 40 ? "bg-red-500" : passwordStrength < 80 ? "bg-yellow-500" : "bg-emerald-500"

  const handleSeekerLogin = (e) => {
    e.preventDefault()
    router.push("/jobs")
  }

  const handleEmployerLogin = (e) => {
    e.preventDefault()
    router.push("/employer/dashboard")
  }

  const handleSuperAdminLogin = (e) => {
    e.preventDefault()
    router.push("/superadmin/dashboard")
  }

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^[0-9]+$/.test(value)) return;

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if filled
    if (value !== "" && index < 3) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    // Move to prev input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Left side graphics (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 p-16 text-white flex-col justify-between relative overflow-hidden text-slate-300">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="z-10 mt-6 md:mt-12 relative">
          <h2 className="text-5xl font-black mb-6 text-white leading-tight tracking-tight">Your Career,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Cryptographically Secured.</span></h2>
          <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">Access your dashboard, manage your applications, and discover new opportunities with absolute peace of mind autonomously.</p>
        </div>
        
        {/* Security Showcase */}
        <div className="z-10 bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white"><ShieldCheck className="text-emerald-400 w-8 h-8"/> Enterprise-Grade Security</h3>
          <ul className="space-y-8">
            <li className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                 <Lock className="text-indigo-400 w-5 h-5" />
              </div>
              <div>
                <strong className="block font-bold text-slate-100 text-lg mb-1">Role-Based Access Control (RBAC)</strong>
                <span className="text-sm font-medium text-slate-400 leading-relaxed block">Strict separation of Employer and Student data preventing all unauthorized crossover access.</span>
              </div>
            </li>
            <li className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                 <Key className="text-indigo-400 w-5 h-5" />
              </div>
              <div>
                <strong className="block font-bold text-slate-100 text-lg mb-1">Passwordless Authentication</strong>
                <span className="text-sm font-medium text-slate-400 leading-relaxed block">WebAuthn and native Passkeys offering robust, strictly phishing-resistant infrastructure.</span>
              </div>
            </li>
            <li className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                 <Server className="text-indigo-400 w-5 h-5" />
              </div>
              <div>
                <strong className="block font-bold text-slate-100 text-lg mb-1">Data Encryption</strong>
                <span className="text-sm font-medium text-slate-400 leading-relaxed block">AES-256 military-grade encryption wrapping user resumes and company data purely at rest.</span>
              </div>
            </li>
            <li className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                 <Smartphone className="text-indigo-400 w-5 h-5" />
              </div>
              <div>
                <strong className="block font-bold text-slate-100 text-lg mb-1">Two-Factor Auth (2FA)</strong>
                <span className="text-sm font-medium text-slate-400 leading-relaxed block">Mandatory strict OTP code enforcement for Employer accounts bridging network gaps.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-12 xl:p-20 flex items-center justify-center bg-slate-50 relative">
        {/* Subtle right decoration */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium text-lg">Securely sign in into your NextStep portal.</p>
          </div>

          <Tabs defaultValue="seeker" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-10 h-14 bg-slate-200/50 p-1.5 rounded-2xl">
              <TabsTrigger value="seeker" className="h-11 rounded-xl shadow-sm text-[13px] font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-700 transition-all uppercase tracking-tighter">Job Seeker</TabsTrigger>
              <TabsTrigger value="employer" className="h-11 rounded-xl shadow-sm text-[13px] font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-700 transition-all uppercase tracking-tighter">Employer</TabsTrigger>
              <TabsTrigger value="superadmin" className="h-11 rounded-xl shadow-sm text-[13px] font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-700 transition-all uppercase tracking-tighter">Super Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="seeker">
              <form onSubmit={handleSeekerLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
                {/* Stealth Mode Toggle */}
                <div className="bg-slate-50/80 border border-slate-200 p-5 rounded-2xl flex items-start gap-4 shadow-inner group">
                  <div className="pt-0.5">
                    <button 
                      type="button"
                      onClick={() => setStealthMode(!stealthMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 overflow-hidden ${stealthMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${stealthMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-900 flex items-center gap-2 cursor-pointer" onClick={() => setStealthMode(!stealthMode)}>
                      <EyeOff size={16} className={stealthMode ? "text-indigo-600" : "text-slate-400"} />
                      Enable Stealth Mode
                    </label>
                    <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed font-medium">
                      Cryptographically blocks your current employer from actively mapping your profile and application habits.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Student Email</label>
                  <input type="email" placeholder="student@university.edu" required className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all shadow-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all shadow-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white" 
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {password.length > 0 && (
                    <div className="mt-4 flex gap-3 items-center">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                        <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${passwordStrength}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{passwordStrength < 40 ? "Weak" : passwordStrength < 80 ? "Good" : "Strong"}</span>
                    </div>
                  )}
                </div>
                
                <Button type="submit" className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20 font-bold text-lg rounded-xl mt-4 transition-all hover:-translate-y-1">Sign In to Dashboard</Button>
                
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-wider text-[11px]">Or continue seamlessly</span></div>
                </div>

                <div className="flex items-center justify-center">
                  <button type="button" onClick={handleSeekerLogin} className="group relative w-full flex justify-center py-4 px-4 border-2 border-indigo-100 rounded-xl bg-indigo-50/50 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all overflow-hidden shadow-sm hover:shadow-md">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="flex items-center gap-3 text-sm font-black text-indigo-700 tracking-wide uppercase">
                      <Fingerprint size={18} className="text-indigo-600" />
                      Login with Passkey / Biometrics
                    </span>
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="employer">
              <form onSubmit={handleEmployerLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] min-h-[460px]">
                {!showOtp ? (
                   <>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Work Email</label>
                       <input type="email" placeholder="name@company.com" required className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all shadow-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Password</label>
                       <input 
                         type="password" 
                         placeholder="••••••••" 
                         className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all shadow-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white" 
                         value={password}
                         required
                         onChange={(e) => setPassword(e.target.value)}
                       />
                     </div>
                     <Button type="button" onClick={() => setShowOtp(true)} className="w-full h-14 bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 text-white shadow-xl font-bold text-lg rounded-xl transition-all hover:-translate-y-1">Send 2FA Code</Button>
                   </>
                ) : (
                  <div className="h-full flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-indigo-50 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100">
                       <ShieldCheck size={32} className="text-indigo-600" />
                    </div>
                    <label className="block text-2xl font-black text-slate-900 mb-2 text-center tracking-tight">Verify Identity</label>
                    <p className="text-sm text-slate-500 font-medium text-center mb-8 px-4">We've securely dispatched a 4-digit code to your registered device.</p>
                    
                    <div className="flex gap-4 justify-center mb-10 w-full px-2">
                      {otp.map((digit, index) => (
                        <input 
                          key={index} 
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text" 
                          maxLength={1} 
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-14 h-16 text-center text-3xl font-black bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/20 focus:bg-white outline-none shadow-sm transition-all text-slate-900" 
                        />
                      ))}
                    </div>
                    <Button type="submit" className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 font-bold text-lg rounded-xl transition-all hover:-translate-y-1">Verify & Secure Login</Button>
                    <button type="button" onClick={() => setShowOtp(false)} className="w-full mt-4 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors">Cancel</button>
                  </div>
                )}
              </form>
            </TabsContent>

            <TabsContent value="superadmin">
              <form onSubmit={handleSuperAdminLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
                 <div className="bg-slate-900 p-6 rounded-2xl flex items-center gap-4 mb-4 border border-white/5">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400"><Server size={24} /></div>
                    <div>
                      <p className="text-white font-bold text-sm">System Authority</p>
                      <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mt-0.5">Academic Compliance Level</p>
                    </div>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Master Key</label>
                   <input type="password" placeholder="••••••••••••" required className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all shadow-sm font-medium text-slate-900 bg-slate-50/50 focus:bg-white" />
                 </div>
                 <Button type="submit" className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20 font-bold text-lg rounded-xl mt-4 transition-all hover:-translate-y-1 italic underline decoration-2">Access Authority Domain</Button>
              </form>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  )
}
