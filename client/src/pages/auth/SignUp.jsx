import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, User, ChevronLeft } from 'lucide-react';
import logo from '../../assets/images/logoazul.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleNextStep = () => {
    const { nombre, apPaterno, correo } = formData;
    if (!nombre.trim() || !apPaterno.trim() || !correo.trim()) {
      setError('Por favor, completa el nombre, apellido paterno y correo para continuar.');
      return;
    }
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      return setError('La contraseña debe tener: min. 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
      if (response.status === 201) {
        alert('¡Cuenta creada con éxito!');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarte');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #D8E9F3 100%)' }}
    >
      <div className="w-full max-w-md">
        <div className="bg-blanco rounded-kuxtal shadow-soft px-8 py-10">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Kuxtal Logo" className="w-24 mb-4" />
            <h1 className="text-2xl font-bold text-textos tracking-tight">
              {step === 1 ? 'Crear cuenta' : 'Establece tu contraseña'}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {step === 1 ? 'Ingresa tus datos institucionales' : 'Elige una contraseña segura'}
            </p>
          </div>

          {/* Indicador de progreso */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1.5 rounded-full bg-primary transition-all duration-300" />
            <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'bg-primary' : 'bg-secondary'}`} />
          </div>
          <div className="flex justify-between text-xs mb-6">
            <span className={step === 1 ? 'text-primary font-semibold' : 'text-gray-400'}>
              Paso 1 · Datos personales
            </span>
            <span className={step === 2 ? 'text-primary font-semibold' : 'text-gray-400'}>
              Paso 2 · Seguridad
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-kuxtal mb-5 text-sm flex items-start gap-2">
              <span className="mt-0.5 shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-textos mb-1.5">Nombre(s)</label>
                  <div className="relative">
                    <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      type="text"
                      placeholder="Daniel"
                      className="w-full pl-11 pr-4 py-3.5 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-textos mb-1.5">Ap. Paterno</label>
                    <input
                      name="apPaterno"
                      value={formData.apPaterno}
                      onChange={handleChange}
                      type="text"
                      placeholder="Paterno"
                      className="w-full px-4 py-3.5 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-textos mb-1.5">Ap. Materno</label>
                    <input
                      name="apMaterno"
                      value={formData.apMaterno}
                      onChange={handleChange}
                      type="text"
                      placeholder="Materno"
                      className="w-full px-4 py-3.5 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textos mb-1.5">Correo institucional</label>
                  <div className="relative">
                    <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      type="email"
                      placeholder="usuario@cua.uam.mx"
                      className="w-full pl-11 pr-4 py-3.5 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textos mb-1.5">Tipo de usuario</label>
                  <select
                    name="tipoUsuario"
                    value={formData.tipoUsuario}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm appearance-none cursor-pointer"
                  >
                    <option value="alumno">Alumno</option>
                    <option value="academico">Académico</option>
                    <option value="trabajador">Trabajador</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-primary text-blanco py-3.5 rounded-kuxtal font-bold shadow-soft hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-sm mt-2"
                >
                  Continuar
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-textos mb-1.5">Nueva contraseña</label>
                  <div className="relative">
                    <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mín. 8 caracteres"
                      className="w-full pl-11 pr-12 py-3.5 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 ml-1">Usa mayúscula, minúscula, número y al menos un carácter especial</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textos mb-1.5">Confirmar contraseña</label>
                  <div className="relative">
                    <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repite tu contraseña"
                      className="w-full pl-11 pr-12 py-3.5 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-blanco py-3.5 rounded-kuxtal font-bold shadow-soft hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-sm mt-2"
                >
                  Finalizar registro
                </button>

                <button
                  type="button"
                  onClick={() => { setStep(1); setError(''); }}
                  className="w-full flex items-center justify-center gap-1.5 text-gray-400 text-sm hover:text-primary transition-colors duration-200 py-1"
                >
                  <ChevronLeft size={15} />
                  Regresar a datos personales
                </button>
              </div>
            )}
          </form>

          <p className="mt-7 text-center text-sm text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline transition-all duration-200">
              Inicia sesión
            </Link>
          </p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">UAM Cuajimalpa · 2026</p>
      </div>
    </div>
  );
};

export default SignUp;
