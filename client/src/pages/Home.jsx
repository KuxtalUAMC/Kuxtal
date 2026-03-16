import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="bg-secondary p-8 rounded-full mb-6">
        <span className="text-6xl">🌿</span>
      </div>
      <h1 className="text-3xl font-bold text-textos mb-4">Módulo en Construcción</h1>
      <p className="text-textos opacity-70 max-w-sm">
        Estamos trabajando para centralizar las consultas de la comunidad UAM Cuajimalpa. 
        ¡Próximamente podrás agendar aquí!
      </p>
    </div>
  );
};

export default Home;