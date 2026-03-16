import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, Salad } from 'lucide-react';

const navItems = [
  { to: '/',          label: 'Inicio',    icon: Home },
  { to: '/citas',     label: 'Citas',     icon: Calendar },
  { to: '/perfil',    label: 'Perfil',    icon: User },
  { to: '/nutricion', label: 'Nutrición', icon: Salad },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="flex justify-around items-center h-16 px-2">
      {navItems.map(({ to, label, icon: Icon }) => {
        const isActive = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-kuxtal transition-all duration-200 ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
