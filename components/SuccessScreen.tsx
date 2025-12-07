import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Share2, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col p-6 md:p-0 items-center md:items-stretch"
    >
      <div className="flex flex-col items-center md:flex-row md:items-center md:gap-8 mb-8">
          {/* Success Animation Header */}
          <div className="relative shrink-0">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 z-10 relative"
            >
              <Check className="text-white w-12 h-12" strokeWidth={4} />
            </motion.div>
            {/* Simple decorative rings */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 1.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute inset-0 bg-green-500 rounded-full z-0"
            />
          </div>

          <div className="text-center md:text-left mt-6 md:mt-0">
              <h2 className="text-2xl font-bold text-gov-900">Pension Released<br/>Successfully</h2>
              <p className="text-gray-500 text-sm mt-2">
                Funds have been transferred to the registered account immediately.
              </p>
          </div>
      </div>

      {/* Receipt Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8 relative md:max-w-md md:self-center md:w-full">
         {/* Ticket jagged edge visual trick (top) */}
         <div className="h-3 bg-gov-900 w-full relative">
            <div className="absolute bottom-[-6px] left-0 right-0 h-3 bg-white" style={{ clipPath: 'polygon(0% 50%, 5% 0%, 10% 50%, 15% 0%, 20% 50%, 25% 0%, 30% 50%, 35% 0%, 40% 50%, 45% 0%, 50% 50%, 55% 0%, 60% 50%, 65% 0%, 70% 50%, 75% 0%, 80% 50%, 85% 0%, 90% 50%, 95% 0%, 100% 50%, 100% 100%, 0% 100%)', transform: 'rotate(180deg)' }}></div>
         </div>
         
         <div className="p-8 space-y-6">
            <div className="flex justify-between items-center pb-6 border-b-2 border-gray-100 border-dashed">
              <span className="text-sm text-gray-500 uppercase font-bold tracking-wider">Transaction ID</span>
              <span className="text-base font-mono font-bold text-gov-900">TXN-8829-XJ2</span>
            </div>
            
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-500 font-medium">Beneficiary</span>
               <span className="text-base font-bold text-gov-900">Haji Abu Bakar</span>
            </div>

            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-500 font-medium">Date & Time</span>
               <span className="text-sm font-bold text-gov-900 text-right">{new Date().toLocaleDateString()} <br/> {new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</span>
            </div>

             <div className="flex justify-between items-center pt-6 border-t-2 border-gray-100">
               <span className="text-base font-bold text-gov-900">Total Amount</span>
               <span className="text-2xl font-black text-green-600">RM 1,250.00</span>
            </div>
         </div>

         {/* Receipt Actions */}
         <div className="bg-gray-50 px-8 py-4 flex gap-4 border-t border-gray-100">
            <button className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-gov-700 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-200">
               <Download size={16} />
               Save
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-gov-700 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-200">
               <Share2 size={16} />
               Share
            </button>
         </div>
      </div>

      {/* Main Action */}
      <div className="mt-auto w-full md:w-auto md:max-w-md md:self-center">
        <button
          onClick={onReset}
          className="w-full py-5 bg-gov-900 text-white rounded-xl font-bold text-lg shadow-[0_6px_0_0_#020617] hover:shadow-[0_3px_0_0_#020617] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center gap-3"
        >
          New Transaction
          <ArrowRight size={22} />
        </button>
      </div>
    </motion.div>
  );
};

export default SuccessScreen;