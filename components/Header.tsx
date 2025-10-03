
import React from 'react';
import { CameraIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center gap-3">
        <CameraIcon className="w-8 h-8 text-indigo-400"/>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          AI Photo Studio
        </h1>
        <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md">nano-banana</span>
      </div>
    </header>
  );
};

export default Header;
