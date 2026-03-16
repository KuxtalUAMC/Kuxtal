import React from 'react';

const Topbar = ({ onProfileClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="md:hidden font-bold text-green-600">Kuxtal</div>
      <div className="hidden md:block text-gray-500 italic">Bienvenido, Usuario</div>
      
      <button 
        onClick={onProfileClick}
        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
      >
        👤
      </button>
    </header>
  );
};

export default Topbar;