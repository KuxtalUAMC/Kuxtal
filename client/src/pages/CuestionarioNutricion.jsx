import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CuestionarioNutricion = () => {
  const navigate = useNavigate();

  const [respuestas, setRespuestas] = useState({
    objetivoNutricional: '',
    objetivoOtroTexto: '',
    numComidas: '',
    restricciones: [],
    restriccionesOtraTexto: '',
    estudiosLaboratorio: ''
  });

  const handleChange = (e) => {
    setRespuestas({ ...respuestas, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (opcion) => {
    setRespuestas((prev) => {
      const tieneOpcion = prev.restricciones.includes(opcion);
      if (tieneOpcion) {
        return { ...prev, restricciones: prev.restricciones.filter((item) => item !== opcion) };
      } else {
        return { ...prev, restricciones: [...prev.restricciones, opcion] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación: ¿cuestionario fue llenado por completo?
    if (!respuestas.objetivoNutricional || !respuestas.numComidas || !respuestas.estudiosLaboratorio) {
      alert('Por favor, completa las preguntas desplegables para continuar.');
      return;
    }

    const datosFinales = {
      objetivoNutricional: respuestas.objetivoNutricional === 'Otro' 
        ? respuestas.objetivoOtroTexto 
        : respuestas.objetivoNutricional,
      numComidas: respuestas.numComidas,
      restricciones_alimento: respuestas.restricciones.includes('Otra')
        ? [...respuestas.restricciones.filter(r => r !== 'Otra'), respuestas.restriccionesOtraTexto].join(', ')
        : respuestas.restricciones.join(', '),
      estudiosLaboratorio: respuestas.estudiosLaboratorio === 'Sí'
    };

    console.log("Datos que se enviarán a la BD:", datosFinales);
    navigate('/doctores/nutricion'); 
  };

  const opcionesRestricciones = ['Vegano', 'Vegetariano', 'Intolerancia a la lactosa', 'Alergia al gluten / Celiaquía', 'Ninguna', 'Otra'];

  return (
    <div className="max-w-md mx-auto py-6 px-4 animate-in fade-in duration-500 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textos mb-1">Cuestionario de nutricion</h1><br></br>
        <p className="text-sm text-gray-500 leading-relaxed">
          Responde este breve cuestionario para que el especialista conozca tus necesidades.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Pregunta 1*/}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-textos">
            ¿Cuál es tu principal objetivo nutricional?
          </label>
          <select 
            name="objetivoNutricional"
            value={respuestas.objetivoNutricional}
            onChange={handleChange}
            className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="">Selecciona una opción...</option>
            <option value="Control de peso">Control de peso</option>
            <option value="Aumento de masa muscular">Aumento de masa muscular</option>
            <option value="Mejora de hábitos alimenticios">Mejora de hábitos alimenticios</option>
            <option value="Rendimiento deportivo">Rendimiento deportivo</option>
            <option value="Condiciones médicas">Condiciones médicas (ej. diabetes)</option>
            <option value="Otro">Otro</option>
          </select>

          {/* CONDICIONAL: Solo aparece si selecciona "Otro" */}
          {respuestas.objetivoNutricional === 'Otro' && (
            <input 
              type="text" 
              name="objetivoOtroTexto"
              value={respuestas.objetivoOtroTexto}
              onChange={handleChange}
              placeholder="Especifica tu objetivo nutricional..."
              required
              className="w-full mt-2 p-4 bg-white border border-gray-200 text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary animate-in slide-in-from-top-2"
            />
          )}
        </div>

        {/* Pregunta 2 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-textos">
            ¿Cuántas comidas realizas al día?
          </label>
          <select name="numComidas" value={respuestas.numComidas} onChange={handleChange} className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary appearance-none">
            <option value="">Selecciona una opción...</option>
            <option value="1 a 2">1 a 2</option>
            <option value="3">3</option>
            <option value="4 a 5">4 a 5</option>
            <option value="Más de 5">Más de 5</option>
          </select>
        </div>

        {/* Pregunta 3 */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-textos">
            ¿Tienes alguna restricción alimentaria? <span className="font-normal text-gray-500 text-xs">(Puedes seleccionar varias)</span>
          </label>
          <div className="bg-white p-4 rounded-kuxtal border border-gray-100 shadow-sm space-y-3">
            {opcionesRestricciones.map((opcion) => (
              <label key={opcion} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" checked={respuestas.restricciones.includes(opcion)} onChange={() => handleCheckbox(opcion)} className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary checked:bg-primary checked:border-primary transition-all"/>
                  <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">{opcion}</span>
              </label>
            ))}
          </div>

          {/* CONDICIONAL-Solo aparece si selecciona "Otra" en los checkboxes */}
          {respuestas.restricciones.includes('Otra') && (
            <input 
              type="text" 
              name="restriccionesOtraTexto"
              value={respuestas.restriccionesOtraTexto}
              onChange={handleChange}
              placeholder="Especifica tu restricción..."
              required
              className="w-full p-4 bg-white border border-gray-200 text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary animate-in slide-in-from-top-2"
            />
          )}
        </div>

        {/* Pregunta 4 */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-textos">
            ¿Cuentas con estudios de laboratorio recientes? <span className="font-normal text-gray-500 text-xs">(Últimos 3 meses)</span>
          </label>
          <select name="estudiosLaboratorio" value={respuestas.estudiosLaboratorio} onChange={handleChange} className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary appearance-none">
            <option value="">Selecciona una opción...</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex gap-3 pt-6">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 rounded-kuxtal border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-all duration-200">Cancelar</button>
          <button type="submit" className="flex-1 py-4 rounded-kuxtal bg-primary text-white font-bold text-sm shadow-soft hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2">Continuar <ChevronRight size={18} /></button>
        </div>
      </form>
    </div>
  );
};

export default CuestionarioNutricion;