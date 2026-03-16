import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, Salad } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/',          label: 'Inicio',    icon: Home },
  { to: '/citas',     label: 'Citas',     icon: Calendar },
  { to: '/perfil',    label: 'Perfil',    icon: User },
  { to: '/nutricion', label: 'Nutrición', icon: Salad },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const nombre = user?.nombre || 'Usuario';
  const inicial = nombre.charAt(0).toUpperCase();

  return (
    <div className="w-64 bg-slate-900 h-full flex flex-col">
      {/* Encabezado */}
      <div className="px-6 pt-8 pb-6 border-b border-slate-700/50">
        <span className="text-xl font-bold text-white tracking-tight">Kuxtal</span>
        <p className="text-xs text-slate-400 mt-0.5">UAM Cuajimalpa</p>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-kuxtal font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Perfil del usuario */}
      <div className="px-4 pb-6 border-t border-slate-700/50 pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-kuxtal hover:bg-slate-800 transition-all duration-200 cursor-default">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
            {inicial}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{nombre}</p>
            <p className="text-slate-400 text-xs truncate">{user?.rol || 'paciente'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
