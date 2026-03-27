import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Calendar, Clock, MapPin, UserCircle, XCircle, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MisCitas = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  // ESTADOS
  const [citas, setCitas] = useState([]);
  const [tabActiva, setTabActiva] = useState('proximas');
  const [vistaActual, setVistaActual] = useState('lista'); // 'lista', 'detalle', 'cancelar'
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const [alertaExito, setAlertaExito] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // OBTENER DATOS
  const fetchCitas = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/api/citas/mis-citas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCitas(res.data);
    } catch (error) {
      console.error("Error cargando citas", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, [token]);

  // LÓGICA DE FILTRADO PARA PESTAÑAS
  const ahora = new Date();
  const proximas = citas.filter(c => c.estado === 'programada' && new Date(c.fecha_hora_inicio) >= ahora);
  // Asumimos pasadas si están completadas o si son programadas pero la fecha ya pasó
  const pasadas = citas.filter(c => c.estado === 'completada' || (c.estado === 'programada' && new Date(c.fecha_hora_inicio) < ahora));
  const canceladas = citas.filter(c => c.estado === 'cancelada');

  const citasFiltradas = tabActiva === 'proximas' ? proximas : tabActiva === 'pasadas' ? pasadas : canceladas;

  // FUNCIONES DE ACCIÓN
  const handleVerDetalle = (cita) => {
    setCitaSeleccionada(cita);
    setVistaActual('detalle');
  };

  const handleIrCancelar = (cita) => {
    setCitaSeleccionada(cita);
    setVistaActual('cancelar');
  };

  const confirmarCancelacion = async () => {
    if (!motivoCancelacion) return alert("Selecciona un motivo");
    try {
      await axios.put(`http://localhost:4000/api/citas/${citaSeleccionada.id}/cancelar`, 
        { motivo: motivoCancelacion }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlertaExito('¡Cita cancelada exitosamente!');
      setTimeout(() => {
        setAlertaExito(false);
        setVistaActual('lista');
        fetchCitas();
      }, 2000);
    } catch (error) {
      console.error("Error al cancelar", error);
    }
  };

  const handleOcultarCita = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/citas/${id}/ocultar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCitas(); // Recargamos para que desaparezca
    } catch (error) {
      console.error("Error al ocultar", error);
    }
  };

  const handleReagendar = () => {
    // Para reagendar: mandamos la doctora al calendario
    const docData = { id: citaSeleccionada.id_especialista, nombre: citaSeleccionada.doctor_nombre, especialidad: citaSeleccionada.especialidad };
    navigate('/agendar/nutricion', { state: { doctor: docData } });
  };

  // HELPERS DE FORMATO
  const formatearFecha = (isoString) => {
    return new Date(isoString).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };
  const formatearHora = (isoString) => {
    return new Date(isoString).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  };

  // ==========================================
  // VISTA 1: LISTA PRINCIPAL
  // ==========================================
  if (vistaActual === 'lista') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gray-50/50 pb-24">
        <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
          <h1 className="text-xl font-bold text-textos">Mis Citas</h1>
        </div>

        {/* Pestañas */}
        <div className="px-4 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {['proximas', 'pasadas', 'canceladas'].map(tab => (
            <button 
              key={tab} onClick={() => setTabActiva(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                tabActiva === tab ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-4 space-y-4">
          {isLoading ? <p className="text-center text-gray-400 mt-10 animate-pulse">Cargando citas...</p> : 
           citasFiltradas.length === 0 ? <p className="text-center text-gray-400 mt-10">No tienes citas en esta sección.</p> :
           citasFiltradas.map(cita => (
            <div key={cita.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-soft">
              {/* Etiqueta de Estado */}
              <div className="flex justify-between items-center mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  tabActiva === 'proximas' ? 'bg-yellow-100 text-yellow-700' :
                  tabActiva === 'pasadas' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tabActiva === 'proximas' ? 'Programada' : tabActiva === 'pasadas' ? 'Completada' : 'Cancelada'}
                </span>
                {tabActiva === 'canceladas' && (
                  <button onClick={() => handleOcultarCita(cita.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold text-lg uppercase">
                  {cita.doctor_nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-textos leading-tight">{cita.doctor_nombre}</h3>
                  <p className="text-xs text-primary font-semibold">{cita.especialidad}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-2 text-xs font-semibold text-gray-600">
                <div className="flex items-center gap-2"><Calendar size={14} className="text-primary"/> <span className="capitalize">{formatearFecha(cita.fecha_hora_inicio)}</span></div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-primary"/> {formatearHora(cita.fecha_hora_inicio)} hrs.</div>
              </div>

              {/* Botones dinámicos según la pestaña */}
              <div className="flex gap-2">
                {tabActiva === 'proximas' && (
                  <>
                    <button onClick={() => handleIrCancelar(cita)} className="flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100">Cancelar</button>
                    <button onClick={() => handleVerDetalle(cita)} className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md">Más información</button>
                  </>
                )}
                {tabActiva === 'pasadas' && (
                  <>
                    <button onClick={() => handleVerDetalle(cita)} className="flex-1 py-2.5 bg-secondary text-primary rounded-xl font-bold text-xs hover:bg-blue-100">Información</button>
                    <button onClick={() => { setCitaSeleccionada(cita); handleReagendar(); }} className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md">Agendar de nuevo</button>
                  </>
                )}
                {tabActiva === 'canceladas' && (
                  <button onClick={() => handleVerDetalle(cita)} className="w-full py-2.5 bg-secondary text-primary rounded-xl font-bold text-xs hover:bg-blue-100">Ver Información</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA 2: DETALLES DE LA CITA
  // ==========================================
  if (vistaActual === 'detalle') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gray-50/50 pb-24 animate-in slide-in-from-right duration-300">
        <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
          <button onClick={() => setVistaActual('lista')} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
          <h1 className="text-xl font-bold text-textos">Detalle de la cita</h1>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-gray-100 pb-2">Datos de la Consulta</h3>
            <div className="flex items-center gap-4"><UserCircle size={28} className="text-gray-300" /><div><p className="text-xs text-gray-400 font-semibold">Especialista</p><p className="font-bold text-textos">{citaSeleccionada.doctor_nombre}</p></div></div>
            <div className="flex items-center gap-4"><MapPin size={28} className="text-gray-300" /><div><p className="text-xs text-gray-400 font-semibold">Ubicación</p><p className="font-bold text-textos">{citaSeleccionada.consultorio}</p></div></div>
            <div className="flex items-center gap-4"><Calendar size={28} className="text-gray-300" /><div><p className="text-xs text-gray-400 font-semibold">Fecha</p><p className="font-bold text-textos capitalize">{formatearFecha(citaSeleccionada.fecha_hora_inicio)}</p></div></div>
            <div className="flex items-center gap-4"><Clock size={28} className="text-gray-300" /><div><p className="text-xs text-gray-400 font-semibold">Hora</p><p className="font-bold text-textos">{formatearHora(citaSeleccionada.fecha_hora_inicio)} hrs.</p></div></div>
            {citaSeleccionada.motivo_cancelacion && (
              <div className="bg-red-50 p-3 rounded-xl"><p className="text-xs text-red-500 font-bold mb-1">Motivo de cancelación:</p><p className="text-sm text-red-700">{citaSeleccionada.motivo_cancelacion}</p></div>
            )}
          </div>

          {(citaSeleccionada.estado === 'programada' && new Date(citaSeleccionada.fecha_hora_inicio) >= ahora) && (
            <div className="flex gap-3 pt-4">
              <button onClick={() => setVistaActual('cancelar')} className="flex-1 py-4 bg-red-50 text-red-600 rounded-kuxtal font-bold text-sm shadow-sm hover:bg-red-100">Cancelar cita</button>
              <button onClick={handleReagendar} className="flex-1 py-4 bg-primary text-white rounded-kuxtal font-bold text-sm shadow-lg">Reagendar</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA 3: CANCELAR CITA
  // ==========================================
  if (vistaActual === 'cancelar') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-white pb-24 animate-in slide-in-from-bottom duration-300 relative">
        {alertaExito && (
          <div className="absolute top-10 left-4 right-4 bg-green-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg z-50 animate-bounce">
            <CheckCircle2 /> {alertaExito}
          </div>
        )}

        <div className="px-4 py-4 flex justify-end">
          <button onClick={() => setVistaActual('lista')} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500"><XCircle size={28} /></button>
        </div>

        <div className="px-6 py-4 flex flex-col items-center text-center space-y-4">
          <div className="bg-red-50 p-4 rounded-full text-red-500 mb-2"><XCircle size={48} /></div>
          <h1 className="text-2xl font-bold text-textos">Cancelar Cita</h1>
          <p className="text-sm text-gray-500">Estás a punto de cancelar tu cita con <span className="font-bold">{citaSeleccionada.doctor_nombre}</span> el {formatearFecha(citaSeleccionada.fecha_hora_inicio)}.</p>
        </div>

        <div className="px-6 mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-textos">Motivo principal *</label>
            <select value={motivoCancelacion} onChange={(e) => setMotivoCancelacion(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-kuxtal text-sm font-semibold outline-none focus:border-red-400">
              <option value="">Selecciona un motivo...</option>
              <option value="Problemas de salud">Problemas de salud</option>
              <option value="Conflicto de horario">Conflicto de horario / Clases</option>
              <option value="Olvido">Olvidé la cita</option>
              <option value="Otro">Otro motivo</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-textos flex items-center gap-2"><FileText size={16}/> Detalles adicionales</label>
            <textarea placeholder="Cuéntanos más (opcional)..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-red-400 min-h-[120px] resize-none"></textarea>
          </div>

          <div className="pt-8 space-y-3">
            <button onClick={confirmarCancelacion} className="w-full py-4 bg-red-500 text-white rounded-kuxtal font-bold text-sm shadow-lg hover:bg-red-600">Confirmar Cancelación</button>
            <button onClick={() => setVistaActual('lista')} className="w-full py-4 text-gray-500 font-bold text-sm">No, regresar</button>
          </div>
        </div>
      </div>
    );
  }
};

export default MisCitas;