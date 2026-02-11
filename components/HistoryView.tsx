import React from 'react';
import { Icons } from './Icons';

// Mock data specific to this view
const MOCK_HISTORY = [
  { id: 101, repoName: 'legacy-crm-system', date: '12 Maio 2024', plan: 'PREMIUM', score: 45, status: 'Crítico', issues: 12 },
  { id: 102, repoName: 'angola-travel-app', date: '10 Maio 2024', plan: 'BASIC', score: 88, status: 'Saudável', issues: 2 },
  { id: 103, repoName: 'website-v1', date: '02 Abril 2024', plan: 'BASIC', score: 92, status: 'Saudável', issues: 0 },
  { id: 104, repoName: 'finance-dashboard-pro', date: '28 Março 2024', plan: 'PREMIUM', score: 76, status: 'Alerta', issues: 5 },
];

export const HistoryView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Histórico de Relatórios</h1>
          <p className="text-gray-500">Acesse e compare suas auditorias passadas.</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Exportar CSV</button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-500 text-sm font-medium">Total de Auditorias</span>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{MOCK_HISTORY.length}</span>
            <span className="ml-2 text-sm text-green-600 flex items-center"><Icons.CheckCircle2 size={12} className="mr-1"/> +2 este mês</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-500 text-sm font-medium">Score Médio</span>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">75.2</span>
            <span className="ml-2 text-sm text-gray-400">/ 100</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-500 text-sm font-medium">Bugs Corrigidos (Est.)</span>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">24</span>
            <span className="ml-2 text-sm text-blue-600">via Premium</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
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
    </div>
  );
};