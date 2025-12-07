import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Fingerprint, CheckCircle2, Loader2, Navigation, ShieldCheck, Activity, ChevronDown, AlertCircle } from 'lucide-react';

interface VerifyScreenProps {
  onVerified: () => void;
}

const VerifyScreen: React.FC<VerifyScreenProps> = ({ onVerified }) => {
  const [verificationState, setVerificationState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  // Beneficiary Status State
  const [beneficiaryStatus, setBeneficiaryStatus] = useState<string>('Bedridden');

  // Location Simulation State
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [locationText, setLocationText] = useState('');

  const handleAcquireLocation = () => {
    setLocationStatus('loading');
    const texts = [
      'Searching for Satellites...',
      'Triangulating Signal...',
      'Verifying Geofence...'
    ];
    
    // Sequence the status updates
    setLocationText(texts[0]);
    
    const t1 = setTimeout(() => setLocationText(texts[1]), 800);
    const t2 = setTimeout(() => setLocationText(texts[2]), 1600);
    const t3 = setTimeout(() => {
      setLocationStatus('success');
    }, 3000);
  };

  const handleBiometricScan = () => {
    if (locationStatus !== 'success') return;
    if (beneficiaryStatus === 'Deceased') return; // Prevent scan if deceased

    setVerificationState('scanning');
    
    // Animate progress bar
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setVerificationState('success');
        setTimeout(onVerified, 800); // Slight delay to show 100% success
      }
    }, 40); // 2 seconds total roughly
  };

  // Status options for dropdown
  const statusOptions = [
    { value: 'Bedridden', label: 'Still Bedridden' },
    { value: 'Mobile', label: 'Mobile/Recovered' },
    { value: 'Deceased', label: 'Deceased' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col p-6 md:p-0"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gov-900">Field Verification</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-gov-900 text-white text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Step 3 of 4</span>
        </div>
      </div>

      {/* Main Content Stack - Vertical Layout */}
      <div className="flex flex-col gap-6 mb-8">
          
          {/* 1. Profile & Status Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {/* Profile Header */}
            <div className="flex items-start gap-5 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200" 
                  alt="Beneficiary" 
                  className="w-20 h-20 rounded-xl object-cover border-4 border-gray-100 bg-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-gov-900 leading-tight truncate">Haji Abu Bakar</h3>
                  <p className="text-sm text-gray-500 font-mono mt-1">800101-14-1234</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold border border-blue-100">Army Vet</span>
                  </div>
                </div>
            </div>

            {/* Status Update Section */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                {/* Explicit Status Display */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                   <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gov-900">Current Status: <span className="text-blue-700">Bedridden</span></p>
                        <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-wide">Last Verified: 2024</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600">
                        <Activity size={16} />
                      </div>
                   </div>
                </div>
                
                {/* Update Controls */}
                <div className="relative">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Update Condition</label>
                   <div className="relative">
                      <select 
                          value={beneficiaryStatus}
                          onChange={(e) => setBeneficiaryStatus(e.target.value)}
                          className={`w-full appearance-none border-2 rounded-lg p-3 pr-10 font-bold text-sm transition-all focus:outline-none focus:ring-4 focus:ring-gov-900/10 cursor-pointer
                              ${beneficiaryStatus === 'Deceased' ? 'bg-red-50 border-red-200 text-red-900' : 
                                beneficiaryStatus === 'Mobile' ? 'bg-green-50 border-green-200 text-green-900' : 
                                'bg-white border-gray-200 text-gov-900'}
                          `}
                      >
                          {statusOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                   </div>
                </div>
                
                {beneficiaryStatus === 'Deceased' && (
                  <div className="mt-3 flex gap-2 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 items-start">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <p>Marking as Deceased will suspend pension release pending death certificate verification.</p>
                  </div>
                )}
             </div>
          </div>

          {/* 2. Location Verification Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative flex flex-col min-h-[180px]">
            {locationStatus === 'idle' && (
              <div className="flex-1 flex flex-row items-center justify-between p-6 bg-white gap-4">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                        <Navigation size={24} />
                    </div>
                    <div>
                        <h4 className="text-gov-900 font-bold text-sm">Location Check</h4>
                        <p className="text-xs text-gray-500 mt-1">Verify visit coordinates</p>
                    </div>
                 </div>
                 <button 
                  onClick={handleAcquireLocation}
                  className="px-4 py-3 bg-white border-2 border-gov-200 text-gov-900 rounded-xl text-xs font-bold shadow-sm hover:bg-gov-50 hover:border-gov-300 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
                 >
                   <Navigation size={14} className="text-gov-700" />
                   Acquire GPS
                 </button>
              </div>
            )}

            {locationStatus === 'loading' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 space-y-4 text-center">
                 <div className="flex items-center gap-3">
                    <Loader2 size={20} className="text-gov-700 animate-spin" />
                    <p className="text-xs font-mono font-bold text-gov-800 animate-pulse uppercase tracking-wide">{locationText}</p>
                 </div>
                 <div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                        className="h-full bg-gov-700"
                    />
                 </div>
              </div>
            )}

            {locationStatus === 'success' && (
              <div className="flex-1 flex flex-col relative h-full">
                {/* Simulated Map Layer */}
                <div className="bg-slate-200 relative overflow-hidden h-32 w-full">
                  <div className="absolute inset-0 opacity-20" style={{ 
                    backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', 
                    backgroundSize: '16px 16px' 
                  }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="relative"
                    >
                       <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-pulse"></div>
                       <MapPin size={32} className="text-red-600 relative z-10 drop-shadow-md" fill="currentColor" />
                    </motion.div>
                  </div>
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap z-20 border border-green-400"
                  >
                     <ShieldCheck size={12} />
                     GPS MATCHED (2m)
                  </motion.div>
                </div>

                <div className="px-5 py-3 bg-white border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-green-700">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Geofence Verified</span>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400">4.2105° N, 101.9758° E</p>
                </div>
              </div>
            )}
          </div>
      </div>

      {/* 3. Biometric Action Area */}
      <div className="mt-auto w-full">
        {verificationState === 'idle' ? (
           <button
             onClick={handleBiometricScan}
             disabled={locationStatus !== 'success' || beneficiaryStatus === 'Deceased'}
             className={`w-full rounded-xl p-6 flex items-center justify-between shadow-[0_6px_0_0_#020617] transition-all group relative overflow-hidden ${
               locationStatus === 'success' && beneficiaryStatus !== 'Deceased'
                ? 'bg-gov-900 text-white hover:shadow-[0_3px_0_0_#020617] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px]' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border-2 border-gray-200'
             }`}
           >
             <div className="text-left relative z-10">
               <span className="block text-lg font-bold">
                 {beneficiaryStatus === 'Deceased' ? 'Verification Disabled' : 'Scan Thumbprint'}
               </span>
               <span className={`text-xs ${locationStatus === 'success' && beneficiaryStatus !== 'Deceased' ? 'text-blue-200' : 'text-gray-400'}`}>
                 {beneficiaryStatus === 'Deceased' 
                    ? 'Beneficiary marked as deceased'
                    : locationStatus !== 'success' 
                        ? 'Waiting for GPS Verification...' 
                        : 'Require: Right Thumb'}
               </span>
             </div>
             <div className={`p-3 rounded-xl transition-colors ${locationStatus === 'success' && beneficiaryStatus !== 'Deceased' ? 'bg-white/10' : 'bg-gray-200'}`}>
               <Fingerprint size={32} />
             </div>
           </button>
        ) : (
          <div className="bg-white border-2 border-gray-100 rounded-xl p-8 shadow-sm">
             <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <Fingerprint 
                    size={80} 
                    className={`transition-colors duration-300 ${verificationState === 'success' ? 'text-green-600' : 'text-gov-800'}`} 
                  />
                  {verificationState === 'scanning' && (
                    <motion.div 
                      className="absolute inset-0 overflow-hidden"
                      initial={{ height: '0%' }}
                      animate={{ height: '100%' }}
                      transition={{ duration: 2, ease: "linear" }}
                    >
                      <Fingerprint size={80} className="text-blue-500 opacity-50" />
                    </motion.div>
                  )}
                </div>

                <div className="w-full max-w-xs space-y-2">
                   <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span>Analyzing</span>
                      <span>{progress}%</span>
                   </div>
                   <div className="h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <motion.div 
                        className={`h-full rounded-full ${verificationState === 'success' ? 'bg-green-500' : 'bg-gov-900'}`}
                        style={{ width: `${progress}%` }}
                      />
                   </div>
                </div>
                
                <p className="text-base font-bold text-gov-900 min-h-[1.5rem]">
                  {verificationState === 'success' ? 'Identity Confirmed (98%)' : 'Verifying against JPN database...'}
                </p>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VerifyScreen;