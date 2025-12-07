import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CreditCard, ArrowDown } from 'lucide-react';

interface ScanScreenProps {
  onScanComplete: () => void;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate Smart Card reading delay
    setTimeout(() => {
      setIsScanning(false);
      onScanComplete();
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col p-6 md:p-0"
    >
      <div className="mb-6 md:mb-10 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gov-900">Beneficiary Verification</h2>
        <p className="text-gray-500 text-base mt-1">Insert MyKad into the reader to proceed.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12 w-full">
        
        {/* Animated Card Slot Graphic */}
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Slot Device */}
            <div className="absolute bottom-0 w-48 h-16 bg-gov-900 rounded-t-lg z-20 shadow-xl border-t border-gray-700">
                <div className="w-full h-1 bg-black/50 mt-1"></div>
                {/* Status Light */}
                <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${isScanning ? 'bg-green-400 animate-pulse' : 'bg-red-900'}`}></div>
            </div>
            
            {/* Card */}
            <motion.div 
                className="absolute w-40 h-56 bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg border border-white/50 flex flex-col p-4 z-10"
                animate={isScanning ? { y: 60 } : { y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <div className="w-12 h-8 bg-yellow-500/20 rounded border border-yellow-500/50 mb-4 flex items-center justify-center">
                    <Cpu size={16} className="text-yellow-700 opacity-60" />
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-full bg-white/40 rounded"></div>
                    <div className="h-2 w-2/3 bg-white/40 rounded"></div>
                </div>
                <div className="mt-auto text-[10px] font-mono text-blue-800 font-bold opacity-50">MYKAD</div>
            </motion.div>

            {/* Arrows */}
            {!isScanning && (
                <motion.div 
                    className="absolute -top-8 text-gov-700"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowDown size={32} />
                </motion.div>
            )}
        </div>

        {/* Action Button */}
        <div className="w-full max-w-sm">
          {isScanning ? (
            <div className="flex flex-col items-center animate-pulse py-8 bg-blue-50 rounded-2xl border border-blue-100">
              <Cpu className="w-12 h-12 text-gov-800 animate-spin-slow mb-4" />
              <p className="text-gov-900 font-bold text-lg">Reading Chip Data...</p>
              <p className="text-gray-500 text-sm mt-1">Do not remove card</p>
            </div>
          ) : (
            <button
              onClick={handleScan}
              className="group relative w-full flex flex-col items-center justify-center py-8 px-6 bg-white border-2 border-gov-900 rounded-xl shadow-[0_6px_0_0_#0F172A] hover:shadow-[0_3px_0_0_#0F172A] hover:translate-y-[3px] transition-all active:shadow-none active:translate-y-[6px]"
            >
              <div className="flex items-center gap-4 mb-2">
                 <CreditCard className="w-8 h-8 text-gov-900" />
                 <h3 className="text-xl font-bold text-gov-900">Read MyKad (Insert)</h3>
              </div>
              <p className="text-gray-500 text-sm font-medium">
                Ensure chip is facing up in reader slot
              </p>
            </button>
          )}
        </div>
      </div>

      <div className="mt-auto pt-8 text-center md:hidden">
        <button className="text-gov-700 text-sm font-medium flex items-center justify-center gap-2 hover:underline">
          <span>Problems reading? Enter Manual IC</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ScanScreen;