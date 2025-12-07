"use client";
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LogOut, Battery, Signal, Shield, Check, Menu } from 'lucide-react';
import LoginScreen from '../components/LoginScreen';
import ScanScreen from '../components/ScanScreen';
import VerifyScreen from '../components/VerifyScreen';
import SuccessScreen from '../components/SuccessScreen';

export type Step = 'login' | 'scan' | 'verify' | 'success';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('login');
  const [agentId, setAgentId] = useState('POS-MY-9921');

  const handleLogout = () => {
    setStep('login');
  };

  const steps: Step[] = ['login', 'scan', 'verify', 'success'];
  const stepLabels = {
    login: 'Agent Login',
    scan: 'Smart Card',
    verify: 'Biometric',
    success: 'Receipt'
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 md:p-6 font-sans">
      {/* Main Container: Mobile = Full Height, Tablet = Fixed Aspect Ratio Card */}
      <div className="w-full h-[100dvh] md:h-auto md:min-h-[700px] md:max-w-6xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative border border-gray-200">
        
        {/* TABLET SIDEBAR (Hidden on Mobile) */}
        <aside className="hidden md:flex flex-col w-80 bg-gov-900 text-white p-8 justify-between shrink-0 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            <div className="z-10 relative">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                        <Shield className="text-yellow-500 w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight tracking-tight">MyDigital<br/>Pension</h1>
                    </div>
                </div>
                
                {step !== 'login' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                      <div className="bg-white/10 rounded-xl p-5 border border-white/5 backdrop-blur-sm">
                          <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold mb-1">Active Agent</p>
                          <p className="font-mono text-xl font-semibold tracking-wide">{agentId}</p>
                      </div>
                      
                      {/* Vertical Steps Indicator */}
                      <nav className="space-y-0">
                          {steps.map((s, idx) => {
                              const currentIdx = steps.indexOf(step);
                              const thisIdx = steps.indexOf(s);
                              const isActive = s === step;
                              const isPast = currentIdx > thisIdx;
                              
                              return (
                                  <div key={s} className="flex gap-4 relative group">
                                      {/* Connecting Line */}
                                      {idx !== steps.length - 1 && (
                                        <div className={`absolute left-4 top-8 bottom-[-8px] w-0.5 ${isPast ? 'bg-blue-500' : 'bg-slate-700'}`} />
                                      )}
                                      
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 transition-all duration-300 ${isActive ? 'bg-white text-gov-900 border-white scale-110' : isPast ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-700 text-slate-600 bg-gov-900'}`}>
                                          {isPast ? <Check size={14} strokeWidth={3}/> : idx + 1}
                                      </div>
                                      <div className={`flex flex-col justify-center pb-8 transition-colors duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                        <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>{stepLabels[s]}</span>
                                      </div>
                                  </div>
                              )
                          })}
                      </nav>
                  </div>
                )}
            </div>

            <div className="z-10 relative">
                 <div className="flex gap-6 text-blue-300 mb-6 bg-black/20 p-4 rounded-xl backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <Signal size={18} /> <span className="text-xs font-mono">5G</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Battery size={18} /> <span className="text-xs font-mono">98%</span>
                    </div>
                 </div>
                 {step !== 'login' && (
                    <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-medium text-red-300 hover:text-white hover:bg-red-500/20 w-full p-3 rounded-lg transition-all">
                        <LogOut size={18} /> Disconnect
                    </button>
                 )}
            </div>
        </aside>

        {/* RIGHT CONTENT / MOBILE VIEW */}
        <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
          
          {/* Mobile Status Bar (Hidden on Tablet) */}
          <div className="md:hidden bg-gov-900 text-white px-6 py-3 flex justify-between items-center text-xs z-50 shrink-0">
            <div className="flex gap-2 items-center font-mono">
              <span>09:42</span>
            </div>
            <div className="flex gap-3 items-center">
              <Signal size={14} />
              <Battery size={14} />
            </div>
          </div>

          {/* Mobile Header (Hidden on Tablet) */}
          {step !== 'login' && (
            <header className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shrink-0 z-40 shadow-sm">
              <div>
                <h1 className="text-gov-900 font-bold text-lg leading-none">Pencen Mobile</h1>
                <p className="text-gray-500 text-xs mt-1 font-mono">{agentId}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-3 bg-gray-50 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </header>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative p-0 md:p-12 flex flex-col">
              <div className="flex-1 w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {step === 'login' && (
                    <LoginScreen 
                      key="login" 
                      agentId={agentId}
                      setAgentId={setAgentId}
                      onLogin={() => setStep('scan')} 
                    />
                  )}
                  {step === 'scan' && (
                    <ScanScreen 
                      key="scan" 
                      onScanComplete={() => setStep('verify')} 
                    />
                  )}
                  {step === 'verify' && (
                    <VerifyScreen 
                      key="verify" 
                      onVerified={() => setStep('success')} 
                    />
                  )}
                  {step === 'success' && (
                    <SuccessScreen 
                      key="success" 
                      onReset={() => setStep('scan')} 
                    />
                  )}
                </AnimatePresence>
              </div>
          </div>

          {/* Footer Branding */}
          <div className="py-4 bg-white/50 md:bg-transparent text-center text-[10px] text-gray-400 border-t border-gray-100 md:border-none shrink-0 font-mono uppercase tracking-widest">
            Secure Government Gateway v2.4.1
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;