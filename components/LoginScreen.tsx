import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ChevronRight, Loader2 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  agentId: string;
  setAgentId: (id: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, agentId, setAgentId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col items-center justify-center p-8 md:p-0 bg-gradient-to-b from-gov-50 to-white md:bg-none"
    >
      <div className="w-full max-w-sm space-y-8 md:bg-white md:p-8 md:rounded-3xl md:shadow-lg md:border md:border-gray-100">
        
        {/* Logo Section - Visible only on mobile inside component, as tablet has sidebar */}
        <div className="flex flex-col items-center text-center space-y-4 md:hidden">
          <div className="w-24 h-24 bg-gov-900 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20 mb-2">
            <Shield className="text-yellow-500 w-12 h-12" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gov-900">MyDigital Pension</h2>
            <p className="text-sm text-gray-500 mt-1">Official Agent Portal</p>
          </div>
        </div>

        {/* Tablet Header for Login Form */}
        <div className="hidden md:block mb-8">
            <h2 className="text-2xl font-bold text-gov-900">Agent Authentication</h2>
            <p className="text-gray-500 mt-1">Please sign in to start your shift.</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gov-900 uppercase tracking-wide ml-1">
              Agent ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Lock className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="block w-full pl-14 pr-4 py-5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gov-900 transition-all font-mono text-xl font-medium"
                placeholder="Enter ID"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-5 px-6 border border-transparent rounded-xl shadow-lg text-xl font-bold text-white bg-gov-900 hover:bg-gov-800 focus:outline-none focus:ring-4 focus:ring-gov-900/20 disabled:opacity-80 disabled:cursor-wait transition-all active:scale-[0.98] mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6" />
                Authenticating...
              </>
            ) : (
              <>
                Secure Login
                <ChevronRight className="ml-2 h-6 w-6" />
              </>
            )}
          </button>
        </form>

        <div className="pt-6 text-center">
          <p className="text-xs text-gray-400">
            Authorized personnel only. <br className="md:hidden"/>
            Access is monitored and recorded.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginScreen;