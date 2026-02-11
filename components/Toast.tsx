import React, { useEffect } from 'react';
import { Icons } from './Icons';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: 'bg-gray-900',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };

  const icons = {
    success: <Icons.CheckCircle2 size={18} className="text-green-400" />,
    error: <Icons.ShieldAlert size={18} className="text-white" />,
    info: <Icons.Zap size={18} className="text-white" />
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-5 fade-in duration-300 w-full max-w-sm px-4">
      <div className={`${bgColors[type]} text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-white/10 backdrop-blur-md`}>
        {icons[type]}
        <span className="font-medium text-sm flex-1">{message}</span>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <Icons.X size={16} />
        </button>
      </div>
    </div>
  );
};