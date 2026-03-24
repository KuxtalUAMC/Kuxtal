import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blanco border-b border-gray-100 sticky top-0 z-10 shadow-sm">
      <Link 
        to="/mi-perfil" 
        className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary shadow-soft hover:scale-105 transition-transform"
      >
        <User size={20} />
      </Link>

      <h1 className="text-xl font-bold text-primary tracking-tight">Kuxtal</h1>

      <Link 
        to="/notificaciones" 
        className="relative w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-secondary hover:text-primary transition-colors"
      >
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </Link>
    </div>
  );
};

export default Topbar;