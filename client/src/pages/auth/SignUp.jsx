import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logoazul.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // El dominio que definiste para la institución
  const DOMINIO_REQUERIDO = '@cua.uam.mx';

  const [formData, setFormData] = useState({
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    correo: '',
    tipoUsuario: 'alumno',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación del Paso 1: Datos Personales y Dominio de Correo
  const handleNextStep = () => {
    const { nombre, apPaterno, correo } = formData;
    
    // 1. Verificar campos vacíos
    if (!nombre.trim() || !apPaterno.trim() || !correo.trim()) {
      setError('Por favor, completa el nombre, apellido paterno y correo para continuar.');
      return;
    }

    // 2. Verificar dominio del correo
    if (!correo.toLowerCase().endsWith(DOMINIO_REQUERIDO)) {
      setError(`El correo debe ser institucional (${DOMINIO_REQUERIDO}).`);
      return;
    }
    
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Regla: 8+ carac, 1 Mayús, 1 Minús, 1 Núm, 1 Especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      return setError('La contraseña debe tener: min. 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
      if (response.status === 201) {
        alert("¡Cuenta creada con éxito!");
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarte');
    }
  };

  return (
    <div className="min-h-screen bg-blanco flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Kuxtal Logo" className="w-24 mb-4" />
          <h2 className="text-2xl font-bold text-textos">
            {step === 1 ? 'Crear Cuenta' : 'Establecer Contraseña'}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-kuxtal mb-4 text-xs border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            /* PASO 1: DATOS PERSONALES */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-textos mb-1">Nombre(s)</label>
                <input 
                  name="nombre" 
                  value={formData.nombre} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Daniel" 
                  className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-textos mb-1">Apellido Paterno</label>
                  <input 
                    name="apPaterno" 
                    value={formData.apPaterno} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Paterno" 
                    className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-textos mb-1">Apellido Materno</label>
                  <input 
                    name="apMaterno" 
                    value={formData.apMaterno} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Materno" 
                    className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textos mb-1">Correo Institucional</label>
                <input 
                  name="correo" 
                  value={formData.correo} 
                  onChange={handleChange} 
                  type="email" 
                  placeholder="usuario@cua.uam.mx" 
                  className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textos mb-1">Tipo de Usuario</label>
                <select 
                  name="tipoUsuario" 
                  value={formData.tipoUsuario} 
                  onChange={handleChange} 
                  className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="alumno">Alumno</option>
                  <option value="academico">Académico</option>
                  <option value="trabajador">Trabajador</option>
                </select>
              </div>

              <button 
                type="button" 
                onClick={handleNextStep} 
                className="w-full bg-primary text-blanco p-4 rounded-kuxtal font-bold shadow-soft hover:opacity-90 transition-opacity"
              >
                Continuar
              </button>
            </div>
          ) : (
            /* PASO 2: SEGURIDAD */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-textos mb-1">Nueva Contraseña</label>
                <input 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  type="password" 
                  placeholder="Mín. 8 caracteres" 
                  className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textos mb-1">Confirmar Contraseña</label>
                <input 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  type="password" 
                  placeholder="Repite tu contraseña" 
                  className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-blanco p-4 rounded-kuxtal font-bold shadow-soft hover:opacity-90 transition-opacity"
              >
                Finalizar Registro
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-gray-400 text-sm hover:text-textos transition-colors"
              >
                Regresar a datos personales
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;