import React, { useState } from 'react';
import { Issue, IssueType, IssueSeverity } from '../types';
import { Icons } from './Icons';

interface IssueListProps {
  issues: Issue[];
}

export const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  const [filter, setFilter] = useState<'all' | IssueType>('all');

  const filteredIssues = filter === 'all' 
    ? issues 
    : issues.filter(i => i.type === filter);

  const getSeverityColor = (severity: IssueSeverity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-100';
      case 'major': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'minor': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: IssueType) => {
    switch (type) {
      case 'bug': return <Icons.Bug size={16} />;
      case 'vulnerability': return <Icons.ShieldAlert size={16} />;
      case 'code_smell': return <Icons.FileText size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">Problemas Detectados</h3>
        <div className="flex space-x-2">
          {['all', 'vulnerability', 'bug', 'code_smell'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'code_smell' ? 'Smells' : f === 'all' ? 'Todos' : f + 's'}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {filteredIssues.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum problema encontrado nesta categoria.
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <div key={issue.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start space-x-4">
              <div className={`mt-1 p-2 rounded-lg ${
                issue.type === 'vulnerability' ? 'text-red-500 bg-red-50' : 
                issue.type === 'bug' ? 'text-yellow-600 bg-yellow-50' : 'text-blue-500 bg-blue-50'
              }`}>
                {getTypeIcon(issue.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate pr-4">{issue.message}</h4>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getSeverityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 font-mono">
                  <span>{issue.file}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span>L.{issue.line}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};