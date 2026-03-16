import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* TODAS LAS RUTAS AQUÍ ADENTRO REQUIEREN LOGIN */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/perfil" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
