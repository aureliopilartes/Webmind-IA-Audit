import React from 'react';
import { Icons } from './Icons';

interface LoginViewProps {
  onLogin: (provider: 'github') => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
            <Icons.Zap className="text-white w-10 h-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">WebMind IA Audit</h1>
        <p className="text-center text-gray-500 mb-8">
          Plataforma de auditoria de código para empresas, assistida por Inteligência Artificial.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin('github')}
            className="w-full flex items-center justify-center space-x-3 bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-95 font-medium shadow-lg shadow-gray-900/10"
          >
            <Icons.Github size={20} />
            <span>Continuar com GitHub</span>
          </button>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">
             Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade.
           </p>
        </div>
      </div>
    </div>
  );
};