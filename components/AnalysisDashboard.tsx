import React from 'react';
import { AnalysisResult, Repository } from '../types';
import { Icons } from './Icons';
import { IssueList } from './IssueList';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalysisDashboardProps {
  repo: Repository;
  result: AnalysisResult;
  onBack: () => void;
  onNewAnalysis: () => void;
  onDownloadPdf?: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ 
  repo, 
  result, 
  onBack, 
  onNewAnalysis,
  onDownloadPdf 
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 max-w-7xl mx-auto">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
        <div>
          <button 
            onClick={onBack}
            className="mb-2 flex items-center text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wide"
          >
            <Icons.ChevronRight className="rotate-180 mr-1" size={14} /> Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Relatório de Auditoria</h1>
          <div className="flex flex-wrap items-center mt-2 gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{repo.name}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full text-xs">Concluído</span>
            <span className="hidden sm:inline">•</span>
            <span>{new Date().toLocaleDateString('pt-AO')}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <button 
            onClick={onNewAnalysis}
            className="w-full sm:w-auto flex justify-center items-center px-4 py-3 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors bg-white"
          >
            Nova Análise
          </button>
          <button 
            onClick={onDownloadPdf}
            className="w-full sm:w-auto flex justify-center items-center px-4 py-3 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20 active:scale-95 transform"
          >
            <Icons.Download size={18} className="mr-2" />
            PDF
          </button>
        </div>
      </header>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm font-medium">Vulnerabilidades</span>
            <Icons.ShieldAlert className="text-red-500" size={20} />
          </div>
          <span className="text-3xl font-bold text-gray-900">{result.vulnerabilitiesCount}</span>
          <span className="text-xs text-red-500 ml-2 block mt-1 font-medium">Críticas encontradas</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-yellow-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm font-medium">Code Smells</span>
            <Icons.Bug className="text-yellow-500" size={20} />
          </div>
          <span className="text-3xl font-bold text-gray-900">{result.codeSmellsCount}</span>
          <span className="text-xs text-yellow-500 ml-2 block mt-1 font-medium">Requer atenção</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm font-medium">Dívida Técnica</span>
            <Icons.CreditCard className="text-indigo-500" size={20} />
          </div>
          <span className="text-3xl font-bold text-gray-900">{result.technicalDebtRatio}%</span>
          <span className="text-xs text-indigo-500 ml-2 block mt-1 font-medium">Ratio estimado</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm font-medium">Duplicação</span>
            <Icons.Code2 className="text-blue-500" size={20} />
          </div>
          <span className="text-3xl font-bold text-gray-900">{result.duplications}%</span>
          <span className="text-xs text-blue-500 ml-2 block mt-1 font-medium">Código repetido</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 px-2">Qualidade Geral do Código</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={result.chartData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="score" stroke="#4f46e5" strokeWidth={3} fill="#4f46e5" fillOpacity={0.2} />
                  <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      itemStyle={{ color: '#4f46e5', fontWeight: 600 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <IssueList issues={result.issues} />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resumo Executivo</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl mb-6 border border-blue-100">
              <p className="text-sm text-blue-900 leading-relaxed font-medium">
                {result.summary}
              </p>
            </div>
            <h4 className="text-xs uppercase font-bold text-gray-500 mb-4 tracking-wider">Recomendações Prioritárias</h4>
            <ul className="space-y-4">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600 group">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <span className="mt-0.5">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Fix Section */}
      {result.suggestedFixes && (
        <div className="mt-8 bg-gray-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative border border-gray-800">
          <div className="absolute top-0 right-0 p-40 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
          <div className="absolute bottom-0 left-0 p-32 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
          
          <div className="flex items-center space-x-3 mb-6 relative z-10">
            <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg shadow-orange-500/20">
              <Icons.Zap className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Correção Automática Sugerida</h3>
              <p className="text-gray-400 text-xs uppercase tracking-wide font-bold">Recurso Premium</p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 relative z-10">
            <div className="flex flex-col justify-center">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nossa IA identificou uma vulnerabilidade crítica e gerou automaticamente um patch de correção seguindo as melhores práticas de segurança.
              </p>
              <button className="self-start flex items-center space-x-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-sm font-medium transition-all border border-white/10 group">
                <Icons.CheckCircle2 size={18} className="text-green-400" />
                <span>Aplicar correção no repositório</span>
                <Icons.ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-1" />
              </button>
            </div>
            <div className="bg-black/80 rounded-xl p-5 font-mono text-xs md:text-sm overflow-x-auto border border-white/10 shadow-inner relative group">
              <div className="absolute top-3 right-3 flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <pre className="mt-4 text-gray-300">
                <span className="text-purple-400">export const</span> <span className="text-blue-400">secureHandler</span> = <span className="text-yellow-300">async</span> (req, res) ={'>'} {'{'}
{'\n'}  <span className="text-gray-500">// Fix: Added input sanitization</span>
{'\n'}  <span className="text-purple-400">const</span> cleanInput = sanitize(req.body.data);
{'\n'}  <span className="text-green-400">{result.suggestedFixes || '// Code snippet here'}</span>
{'\n'}{'}'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};