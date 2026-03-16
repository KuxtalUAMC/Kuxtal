import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className="flex justify-around items-center h-16">
      <Link to="/" className="flex flex-col items-center text-green-600">
        <span className="text-xl">🏠</span>
        <span className="text-xs">Inicio</span>
      </Link>
      <Link to="/citas" className="flex flex-col items-center text-gray-400">
        <span className="text-xl">📅</span>
        <span className="text-xs">Citas</span>
      </Link>
      <Link to="/perfil" className="flex flex-col items-center text-gray-400">
        <span className="text-xl">👤</span>
        <span className="text-xs">Perfil</span>
      </Link>
    </div>
  );
};

export default BottomNav;