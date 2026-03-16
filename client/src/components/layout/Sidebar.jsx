import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 h-full text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold text-blue-100 mb-10">Kuxtal</h2>
      <nav className="space-y-4 flex-1">
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800">Editar perfil</Link>
        <Link to="/perfil" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800">Mi Perfil</Link>
      </nav>
      <div className="text-xs text-slate-500 text-center">UAM Cuajimalpa - 2026</div>
    </div>
  );
};

export default Sidebar;