import React from 'react';
import { Icons } from './Icons';

// Mock data specific to this view
const MOCK_HISTORY = [
  { id: 101, repoName: 'legacy-crm-system', date: '12 Maio 2024', plan: 'PREMIUM', score: 45, status: 'Crítico', issues: 12 },
  { id: 102, repoName: 'angola-travel-app', date: '10 Maio 2024', plan: 'BASIC', score: 88, status: 'Saudável', issues: 2 },
  { id: 103, repoName: 'website-v1', date: '02 Abril 2024', plan: 'BASIC', score: 92, status: 'Saudável', issues: 0 },
  { id: 104, repoName: 'finance-dashboard-pro', date: '28 Março 2024', plan: 'PREMIUM', score: 76, status: 'Alerta', issues: 5 },
  { id: 105, repoName: 'multicaixa-api-wrapper', date: '15 Fev 2024', plan: 'PREMIUM', score: 98, status: 'Saudável', issues: 0 },
];

export const HistoryView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 pb-20">
      <header className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Histórico de Relatórios</h1>
          <p className="text-gray-500">Acesse e compare suas auditorias passadas.</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center">
            <Icons.Download size={16} className="mr-2"/> CSV
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-500 text-sm font-medium">Total de Auditorias</span>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{MOCK_HISTORY.length}</span>
            <span className="ml-2 text-sm text-green-600 flex items-center"><Icons.CheckCircle2 size={12} className="mr-1"/> +2 este mês</span>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-500 text-sm font-medium">Score Médio</span>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">75.2</span>
            <span className="ml-2 text-sm text-gray-400">/ 100</span>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-500 text-sm font-medium">Bugs Corrigidos</span>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">24</span>
            <span className="ml-2 text-sm text-blue-600">via Premium</span>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Repositório</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plano</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Issues</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-500 mr-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <Icons.Code2 size={16} />
                      </div>
                      <span className="font-semibold text-gray-900">{item.repoName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${
                      item.plan === 'PREMIUM' 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.plan === 'PREMIUM' && <Icons.Zap size={10} className="mr-1" />}
                      {item.plan}
                    </span>
                  </td>
                   <td className="px-6 py-4 text-sm text-gray-500">
                    {item.issues > 0 ? (
                      <span className="flex items-center text-red-500 font-medium">
                        <Icons.Bug size={14} className="mr-1"/> {item.issues}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                   </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray-900 mr-2">{item.score}</span>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.score < 50 ? 'bg-red-500' : item.score < 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Crítico' ? 'bg-red-50 text-red-700 border border-red-100' : 
                      item.status === 'Alerta' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 
                      'bg-green-50 text-green-700 border border-green-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                      <Icons.ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {MOCK_HISTORY.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 active:scale-[0.99] transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Icons.Code2 size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.repoName}</h3>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold ${
                item.plan === 'PREMIUM' 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}>
                {item.plan}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-xl">
              <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase font-bold">Score</span>
                 <span className={`text-lg font-bold ${
                    item.score < 50 ? 'text-red-500' : item.score < 80 ? 'text-yellow-600' : 'text-green-600'
                 }`}>{item.score}</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase font-bold">Issues</span>
                 <span className="text-lg font-bold text-gray-700">{item.issues}</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
               <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase font-bold">Status</span>
                 <span className={`text-xs font-bold ${
                    item.status === 'Crítico' ? 'text-red-600' : 
                    item.status === 'Alerta' ? 'text-yellow-600' : 
                    'text-green-600'
                 }`}>{item.status}</span>
              </div>
            </div>

            <button className="w-full py-2.5 flex items-center justify-center text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};