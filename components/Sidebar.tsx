import React from 'react';
import { User, AppView } from '../types';
import { Icons } from './Icons';

interface SidebarProps {
  user: User;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  currentView, 
  onChangeView, 
  onLogout,
  isOpen,
  onClose
}) => {
  const handleNavigation = (view: AppView) => {
    onChangeView(view);
    onClose(); // Close mobile menu after clicking
  };

  const navItemClass = (view: AppView) => 
    `w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
      currentView === view 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      <div className="p-6 flex items-center space-x-2">
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
          <Icons.Zap className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          WebMind IA
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <button 
          onClick={() => handleNavigation('repos')}
          className={navItemClass('repos')}
        >
          <Icons.LayoutGrid size={20} />
          <span>Repositórios</span>
        </button>
        <button 
          onClick={() => handleNavigation('history')}
          className={navItemClass('history')}
        >
          <Icons.FileText size={20} />
          <span>Histórico</span>
        </button>
        <button 
          onClick={() => handleNavigation('billing')}
          className={navItemClass('billing')}
        >
          <Icons.CreditCard size={20} />
          <span>Pagamentos</span>
        </button>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">{user.name}</span>
              <span className="text-xs text-gray-500 truncate w-24">{user.email}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors text-sm"
        >
          <Icons.LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl transform transition-transform animate-in slide-in-from-left duration-300">
             <button 
               onClick={onClose}
               className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900"
             >
               <Icons.X size={20} />
             </button>
             <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};