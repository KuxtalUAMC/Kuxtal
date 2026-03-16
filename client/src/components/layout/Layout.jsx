import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar: Va a ser visible solo en escritorio (md:flex), oculta en móvil */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        {/* Topbar: Aquí irá el icono para desplegar el menú en móvil */}
        <Topbar onProfileClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 pb-20 md:pb-0">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Aqui React Router renderiza las páginas */}
            <Outlet /> 
          </div>
        </main>

        {/* Bottom Navigation: Visible solo en móvil, oculta en escritorio */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <BottomNav />
        </nav>
      </div>
    </div>
  );
};

export default Layout;