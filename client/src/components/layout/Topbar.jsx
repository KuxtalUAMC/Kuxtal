import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const nombre = user?.nombre || 'Usuario';
  const inicial = nombre.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blanco border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-soft">
      {/* Marca visible en móvil */}
      <div className="md:hidden font-bold text-primary text-lg tracking-tight">Kuxtal</div>

      {/* Saludo en escritorio */}
      <div className="hidden md:flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
          {inicial}
        </div>
        <div>
          <p className="text-sm font-semibold text-textos leading-tight">Hola, {nombre}</p>
          <p className="text-xs text-gray-400 leading-tight">Bienvenido a Kuxtal</p>
        </div>
      </div>

      {/* Botón de logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 font-medium transition-colors duration-200 px-3 py-2 rounded-kuxtal hover:bg-red-50"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Cerrar sesión</span>
      </button>
    </header>
  );
};

export default Topbar;
