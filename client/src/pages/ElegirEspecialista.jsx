import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Heart, UserCircle, Clock, Calendar, Info, ChevronRight, X } from 'lucide-react';

const ElegirEspecialista = () => {
  const navigate = useNavigate();
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const [favoritos, setFavoritos] = useState([]);

  const especialistas = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      nombre: 'Dra. Sofía Ramírez',
      especialidad: 'Nutrición',
      universidad: 'UNAM',
      horario: '09:00 AM - 06:00 PM',
      dias: 'Lunes - Viernes',
      bio: 'Egresada de la UNAM. Especialista en control de peso y enfermedades metabólicas crónicas.'
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      nombre: 'Dra. Valeria Torres',
      especialidad: 'Nutrición',
      universidad: 'IPN',
      horario: '10:00 AM - 04:00 PM',
      dias: 'Lunes - Jueves',
      bio: 'Egresada del IPN. Enfocada en atletas de alto rendimiento y recomposición corporal.'
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      nombre: 'Dra. Fernanda Medina',
      especialidad: 'Nutrición',
      universidad: 'Tec de Monterrey',
      horario: '08:00 AM - 02:00 PM',
      dias: 'Martes - Sábado',
      bio: 'Egresada del Tec de Monterrey. Abordaje integral para problemas gastrointestinales y salud hormonal.'
    }
  ];

  const toggleFavorito = (id) => {
    setFavoritos(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50/50 pb-32">
      {/* Topbar */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-textos">Elegir Especialista</h1>
      </div>

      <div className="px-4 py-6">
        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar especialista..." className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-kuxtal shadow-sm outline-none focus:ring-2 focus:ring-primary text-sm"/>
        </div>

        <div className="flex gap-2 mb-8">
          {['Todas', 'Favoritos'].map(filtro => (
            <button key={filtro} onClick={() => setFiltroActivo(filtro)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filtroActivo === filtro ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}>
              {filtro}
            </button>
          ))}
        </div>

        {/* Tarjetas de Especialistas */}
        <div className="space-y-6">
          {especialistas.map((doc) => {
            const esFavorito = favoritos.includes(doc.id);
            if (filtroActivo === 'Favoritos' && !esFavorito) return null;

            return (
              <div key={doc.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft relative flex flex-col gap-4">
                <button onClick={() => toggleFavorito(doc.id)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-50">
                  <Heart size={22} className={`${esFavorito ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                </button>

                <div className="flex items-center gap-4">
                  <UserCircle size={48} className="text-secondary shrink-0" />
                  <div>
                    <h3 className="font-bold text-textos text-lg leading-tight">{doc.nombre}</h3>
                    <p className="text-sm font-semibold text-primary">{doc.especialidad} | {doc.universidad}</p>
                  </div>
                </div>

                {/* Información de Horarios (Lo nuevo) */}
                <div className="bg-secondary/30 rounded-2xl p-3 flex justify-around text-[11px] font-bold text-gray-600 uppercase tracking-tight">
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-primary"/> {doc.horario}</div>
                  <div className="flex items-center gap-1.5"><Calendar size={14} className="text-primary"/> {doc.dias}</div>
                </div>

                {/* Botones de la Tarjeta */}
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => navigate(`/doctores/nutricion/info/${doc.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary text-primary rounded-xl font-bold text-xs hover:bg-primary/10 transition-colors"
                  >
                    <Info size={14} /> Información
                  </button>
                  <button 
                    onClick={() => navigate('/agendar/nutricion')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md hover:opacity-90 transition-all"
                  >
                    Agendar cita <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTONES DE NAVEGACIÓN INFERIOR (Escape Hatch) */}
        <div className="mt-12 space-y-3">
          <button onClick={() => navigate(-1)} className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 text-gray-600 rounded-kuxtal font-bold shadow-sm hover:bg-gray-50 transition-colors">
            Atrás
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-kuxtal font-bold shadow-sm hover:bg-red-100 transition-colors">
            <X size={20} /> Cancelar cita
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElegirEspecialista;