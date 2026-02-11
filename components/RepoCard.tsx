import React from 'react';
import { Repository } from '../types';
import { Icons } from './Icons';

interface RepoCardProps {
  repo: Repository;
  onSelect: (repo: Repository) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(repo)}
      className="group relative bg-white border border-gray-100 hover:border-blue-500 hover:shadow-lg rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Icons.Code2 size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">{repo.name}</h3>
          </div>
          {repo.isPrivate && <Icons.Lock size={14} className="text-gray-400" />}
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {repo.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
            <span className={`w-2 h-2 rounded-full mr-1.5 ${
              repo.language === 'TypeScript' ? 'bg-blue-400' :
              repo.language === 'JavaScript' ? 'bg-yellow-400' :
              repo.language === 'Python' ? 'bg-green-400' : 'bg-purple-400'
            }`}></span>
            {repo.language}
          </span>
          <span className="text-xs text-gray-400">
            Updated {repo.lastUpdated}
          </span>
        </div>
        <Icons.ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};