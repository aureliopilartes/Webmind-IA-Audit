import React from 'react';
import { Icons } from './Icons';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="relative">
         <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
         <div className="absolute inset-0 flex items-center justify-center">
           <Icons.Zap className="text-blue-600 animate-pulse fill-blue-600" />
         </div>
      </div>
      <h2 className="mt-8 text-2xl font-bold text-gray-900">Auditando Código...</h2>
      <p className="text-gray-500 mt-2 animate-pulse font-medium">A IA está varrendo vulnerabilidades e code smells.</p>
    </div>
  );
};