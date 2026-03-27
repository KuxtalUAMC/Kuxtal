import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, ChevronRight, UserCircle } from 'lucide-react'; // Asegúrate de importar estos iconos



const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // 1. Estados para las citas del Home
  const [proximasCitas, setProximasCitas] = useState([]);
  const [isLoadingCitas, setIsLoadingCitas] = useState(true);

  // 2. Efecto para traer las citas
  useEffect(() => {
    const fetchCitasHome = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/citas/mis-citas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const ahora = new Date();
        
        // Filtramos y ordenamos
        const futuras = response.data
          .filter(cita => cita.estado === 'programada' && new Date(cita.fecha_hora_inicio) >= ahora)
          .sort((a, b) => new Date(a.fecha_hora_inicio) - new Date(b.fecha_hora_inicio));

        // Solo guardamos las 2 más próximas para el Home
        setProximasCitas(futuras.slice(0, 2)); 
      } catch (error) {
        console.error("Error al cargar citas en Home", error);
      } finally {
        setIsLoadingCitas(false);
      }
    };

    if (token) fetchCitasHome();
  }, [token]);

  // Funciones de formato
  const formatearFecha = (isoString) => {
    return new Date(isoString).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
  };
  const formatearHora = (isoString) => {
    return new Date(isoString).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  };

  // Datos para los módulos
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

      {/* SECCIÓN PRÓXIMAS CITAS */}
      <section className="mt-8 px-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-lg font-bold text-textos">Próximas Citas</h2>
            <p className="text-xs text-gray-500">Tus consultas agendadas</p>
          </div>
          {/* Botón para ir a ver todas las citas */}
          <button 
            onClick={() => navigate('/mis-citas')} 
            className="text-xs font-bold text-primary flex items-center hover:underline"
          >
            Ver todas <ChevronRight size={14} />
          </button>
        </div>

        {/* Estado de carga */}
        {isLoadingCitas ? (
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft animate-pulse flex flex-col items-center justify-center min-h-[120px]">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-2"></div>
            <p className="text-xs text-gray-400 font-semibold">Cargando tu agenda...</p>
          </div>
        ) : proximasCitas.length === 0 ? (
          
          /* Estado vacío (No hay citas) */
          <div className="bg-white p-6 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center text-center">
            <div className="bg-secondary/30 p-3 rounded-full mb-3">
              <Calendar size={28} className="text-primary" />
            </div>
            <p className="text-sm font-bold text-textos mb-1">No tienes citas próximas</p>
            <p className="text-xs text-gray-500 mb-4">Agenda una consulta para cuidar tu salud.</p>
            <button 
              onClick={() => navigate('/doctores/nutricion')}
              className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-full shadow-md hover:bg-primary/90 transition-colors"
            >
              Agendar ahora
            </button>
          </div>

        ) : (
          
          /* Renderizado de las citas (Máximo 2) */
          <div className="space-y-4">
            {proximasCitas.map(cita => (
              <div key={cita.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-soft flex items-center gap-4 hover:border-primary/30 transition-colors cursor-pointer" onClick={() => navigate('/mis-citas')}>
                
                {/* Fecha destacada estilo calendario */}
                <div className="bg-secondary/40 px-3 py-2 rounded-2xl flex flex-col items-center justify-center min-w-[60px]">
                  <span className="text-xs font-bold text-primary uppercase">{new Date(cita.fecha_hora_inicio).toLocaleDateString('es-MX', { month: 'short' })}</span>
                  <span className="text-lg font-black text-textos leading-none">{new Date(cita.fecha_hora_inicio).getDate()}</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-textos text-sm">{cita.doctor_nombre}</h3>
                  <p className="text-xs text-gray-500 mb-1">{cita.especialidad}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Clock size={12} /> {formatearHora(cita.fecha_hora_inicio)} hrs.
                  </div>
                </div>

                <div className="p-2 text-gray-300">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;