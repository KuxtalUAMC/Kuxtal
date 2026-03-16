import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logoazul.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        correo: email,
        password: password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-blanco flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Kuxtal Logo" className="w-32 mb-4" />
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-kuxtal mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="usuario@cua.uam.mx"
          />
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-secondary text-textos rounded-kuxtal outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Contraseña"
          />
          <button 
            type="submit" 
            className="w-full bg-primary text-blanco p-4 rounded-kuxtal font-bold shadow-soft hover:opacity-90 transition-all"
          >
            Entrar
          </button>
        </form>

        <p className="mt-8 text-center text-textos text-sm">
          ¿No tienes cuenta? <Link to="/signup" className="text-primary font-bold hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;