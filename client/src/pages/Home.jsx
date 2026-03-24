import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Datos para los módulos (puedes añadir más fácil)
  const modulos = [
    { id: 1, nombre: 'Nutrición', icono: '🍎', color: 'bg-orange-100', path: '/nutricion' },
    { id: 2, nombre: 'Psicología', icono: '🧠', color: 'bg-purple-100', path: '/psicologia' },
    { id: 3, nombre: 'Médico General', icono: '🩺', color: 'bg-blue-100', path: '/medico' },
    { id: 4, nombre: 'Enfermería', icono: '💉', color: 'bg-red-100', path: '/enfermeria' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Saludo y Header */}
      <section>
        <h1 className="text-3xl font-bold text-textos">Bienvenido</h1>
        <p className="text-gray-500">¿En qué área necesitas atención?</p>
      </section>

      {/* Grid de Servicios */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {modulos.map((modulo) => (
          <button
            key={modulo.id}
            onClick={() => navigate(modulo.path)}
            className={`${modulo.color} p-6 rounded-kuxtal flex flex-col items-center justify-center transition-transform hover:scale-105 shadow-soft border border-white`}
          >
            <span className="text-4xl mb-3">{modulo.icono}</span>
            <span className="font-bold text-textos">{modulo.nombre}</span>
          </button>
        ))}
      </section>

      <section className="bg-secondary p-6 rounded-kuxtal shadow-soft">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-textos">Próximas Citas</h3>
          <button className="text-primary text-sm font-bold">Ver todas</button>
        </div>

        {/* Ejemplo de cita, aun no lo implementamos */}
        <div className="bg-blanco p-4 rounded-xl flex items-center space-x-4 border border-blue-50">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl">
            🍎
          </div>
          <div>
            <p className="font-bold text-textos text-sm">Cita de Nutrición</p>
            <p className="text-gray-400 text-xs">Mañana, 10:00 AM - Dr. García</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;