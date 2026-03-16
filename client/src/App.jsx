import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* TODAS LAS RUTAS AQUÍ ADENTRO REQUIEREN LOGIN */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* Otras rutas futuras como /nutricion van aquí */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;