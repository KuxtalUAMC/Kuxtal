import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  // Si no hay token, lo manda al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, lo deja pasar a la ruta solicitada
  return <Outlet />;
};

export default ProtectedRoute;