import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
// Asumiendo que usarás un logo/imagen. Por ahora usamos un emoji grande, 
// pero puedes reemplazarlo con la imagen de la chica de tu diseño.

const Nutricion = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto py-6 px-4 animate-in fade-in duration-500 pb-24">
      {/* Cabecera de la pagina */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h2 className="text-3xl font-bold text-textos mb-2">Consulta de Nutrición</h2>
      </div>

      {/* Infromacion de la consulta de nutricion*/}
      <div className="bg-white rounded-kuxtal p-6 shadow-sm border border-gray-100 mb-10 space-y-2 text-black-600 text-sm leading-relaxed">
        <p><b>¿Qué es?</b></p>
        <p>
          La consulta de nutrición es una evaluación profesional orientada a mejorar la alimentación y los hábitos nutricionales de acuerdo con las necesidades y objetivos de cada persona.
        </p>

        <p><b>¿Para que ir a una consulta de nutrición?</b></p>
        <p>
          Puede ayudarte a mejorar tu alimentación, controlar tu peso, optimizar tu rendimiento académico o físico, y prevenir o manejar problemas de salud relacionados con la dieta.
        </p>

        <p><b>Procedimiento</b></p>
        <p>
          Para agendar una consulta en la Universidad Autónoma Metropolitana, Unidad UAM Cuajimalpa, primero deberás responder un cuestionario inicial que permitirá conocer tus hábitos alimenticios y objetivos de salud.
        </p>
        <p>
            Después podrás revisar los nutriólogos disponibles y elegir al profesional con quien deseas atenderte.
        </p>
        <p>
            Finalmente seleccionarás el horario disponible que mejor se adapte a tu agenda para confirmar tu cita.
        </p>

      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)} // Boton cancelar - Regresa a la página anterior (Home)
          className="flex-1 py-4 rounded-kuxtal border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-all duration-200"
        >
          Cancelar
        </button>
        
        {/* Boton Agendar cita - Lleva a la página de "Agendar Cita" */}
        <button
          onClick={() => navigate('/cuestionario/nutricion')}
          className="flex-1 py-4 rounded-kuxtal bg-primary text-white font-bold text-sm shadow-soft hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          Agendar Cita
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Nutricion;