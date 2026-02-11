import React, { useState } from 'react';
import { Repository } from '../types';
import { RepoCard } from './RepoCard';
import { Icons } from './Icons';

interface RepoListViewProps {
  repos: Repository[];
  onSelectRepo: (repo: Repository) => void;
}

export const RepoListView: React.FC<RepoListViewProps> = ({ repos, onSelectRepo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Seus Repositórios</h1>
        <p className="text-gray-500">Selecione um projeto para iniciar a auditoria de código.</p>
        <div className="mt-6 flex items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm max-w-md focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
          <Icons.Search className="text-gray-400 mr-3" />
          <input 
            type="text" 
            placeholder="Buscar repositórios..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>
      </header>

      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map(repo => (
            <RepoCard key={repo.id} repo={repo} onSelect={onSelectRepo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <Icons.Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum repositório encontrado</h3>
          <p className="text-gray-500">Tente buscar por outro termo.</p>
        </div>
      )}
    </div>
  );
};