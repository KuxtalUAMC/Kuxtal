const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const especialistaRoutes = require('./routes/especialistaRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de la Base de Datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middlewares Globales
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json()); // Permite que el servidor entienda los JSON que envía Axios

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/especialistas', especialistaRoutes);

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('🌿 API de Kuxtal en línea');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Conectado a PostgreSQL', time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error de conexión a DB', detail: err.message });
  }
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Kuxtal corriendo en http://localhost:${PORT}`);
});