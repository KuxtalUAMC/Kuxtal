import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserCircle, ShieldCheck, ChevronRight, X, Info } from 'lucide-react';

const InfoEspecialista = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID de la URL

  // Mock temporal para mostrar datos (En el futuro será axios.get(`/api/doctores/${id}`))
  const especialista = {
    nombre: 'Dra. Sofía Ramírez',
    especialidad: 'Nutrióloga Clínica',
    universidad: 'UNAM',
    cedula: 'CED-UNAM-9876',
    bio: 'Egresada de la Máxima Casa de Estudios (UNAM). Cuenta con más de 8 años de experiencia en el sector salud público y privado. Se especializa en el tratamiento integral de pacientes con síndrome metabólico, diabetes tipo 2 y obesidad severa. Su enfoque se basa en la nutrición basada en evidencia, buscando no solo el control de peso, sino la sanación de la relación del paciente con la comida mediante educación nutricional constante.'
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-secondary p-1 rounded-full mb-4 ring-4 ring-white shadow-soft">
          <UserCircle size={100} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-textos leading-tight">{especialista.nombre}</h1>
        <p className="text-sm font-semibold text-primary">{especialista.especialidad} | {especialista.universidad}</p>
      </div>

      <div className="space-y-6">
        {/* Caja de Datos Oficiales */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-6">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <ShieldCheck size={18} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Cédula Profesional</h3>
            </div>
            <p className="text-sm font-mono text-textos bg-secondary/50 p-2 rounded-lg inline-block">
              {especialista.cedula}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Info size={18} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Biografía y Enfoque</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {especialista.bio}
            </p>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-3 pt-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-kuxtal font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <X size={18} /> Cerrar
          </button>
          <button 
            onClick={() => navigate('/agendar/nutricion')}
            className="flex-1 py-4 bg-primary text-white rounded-kuxtal font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            Agendar cita <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoEspecialista;