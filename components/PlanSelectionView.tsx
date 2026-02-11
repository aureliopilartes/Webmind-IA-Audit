import React from 'react';
import { Repository, AnalysisType } from '../types';
import { Icons } from './Icons';

interface PlanSelectionViewProps {
  repo: Repository;
  selectedPlan: AnalysisType | null;
  onSelectPlan: (type: AnalysisType) => void;
  onBack: () => void;
}

export const PlanSelectionView: React.FC<PlanSelectionViewProps> = ({ 
  repo, 
  selectedPlan, 
  onSelectPlan, 
  onBack 
}) => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500 pb-20">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-gray-500 hover:text-gray-900 transition-colors"
      >
        <Icons.ChevronRight className="rotate-180 mr-1" size={16} /> Voltar aos repositórios
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Repo Details Side */}
        <div className="lg:w-1/3">
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-10">
              <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-600 mb-4">
                <Icons.Code2 size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{repo.name}</h2>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{repo.description}</p>
              <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 bg-gray-50 p-2 rounded-lg">
                <span className={`w-2 h-2 rounded-full ${
                  repo.language === 'TypeScript' ? 'bg-blue-400' : 'bg-yellow-400'
                }`}></span>
                <span>{repo.language}</span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalhes do Projeto</h4>
                <div className="space-y-2 text-sm text-gray-600">
                   <div className="flex justify-between">
                     <span>Privacidade</span>
                     <span className="font-medium text-gray-900">{repo.isPrivate ? 'Privado' : 'Público'}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Último Update</span>
                     <span className="font-medium text-gray-900">{repo.lastUpdated}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Stars</span>
                     <span className="font-medium text-gray-900">{repo.stars}</span>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Plans */}
        <div className="lg:w-2/3">
           <h3 className="text-xl font-bold text-gray-900 mb-6">Escolha o nível de auditoria</h3>
           <div className="grid gap-6">
             {/* Basic Plan */}
            <div className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all group ${selectedPlan === AnalysisType.BASIC ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-100' : 'border-gray-100 bg-white hover:border-blue-200'}`}
              onClick={() => onSelectPlan(AnalysisType.BASIC)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">Análise Padrão</h4>
                <span className="text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg mt-2 sm:mt-0">5.000 KZ</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 max-w-md">Ideal para uma verificação rápida de saúde do código e identificação de problemas comuns.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                 {['Relatório de Vulnerabilidade', 'Code Smells & Bugs', 'Dívida Técnica'].map((item, i) => (
                   <span key={i} className="text-xs font-medium bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600 flex items-center">
                     <Icons.CheckCircle2 size={12} className="mr-1 text-green-500"/> {item}
                   </span>
                 ))}
              </div>
              <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10">Selecionar Padrão</button>
            </div>

            {/* Premium Plan */}
            <div className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all ${selectedPlan === AnalysisType.PREMIUM ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100' : 'border-gray-100 bg-white hover:border-indigo-200'}`}
              onClick={() => onSelectPlan(AnalysisType.PREMIUM)}
            >
              <div className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-lg shadow-indigo-500/30">Recomendado</div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-lg text-gray-900">Análise + Correção</h4>
                  <Icons.Zap size={16} className="text-indigo-600 fill-indigo-600" />
                </div>
                <span className="text-lg font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 mt-2 sm:mt-0">8.000 KZ</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 max-w-md">Uma auditoria profunda que inclui sugestões de código prontas para uso para corrigir falhas críticas.</p>
               <div className="flex flex-wrap gap-3 mb-6">
                 {['Tudo do Padrão', 'Sugestão de Código (Fix)', 'Refatoração IA', 'Suporte Prioritário'].map((item, i) => (
                   <span key={i} className="text-xs font-medium bg-white border border-indigo-100 px-2 py-1 rounded-md text-indigo-700 flex items-center">
                     <Icons.CheckCircle2 size={12} className="mr-1 text-indigo-500"/> {item}
                   </span>
                 ))}
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all">Selecionar Premium</button>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};