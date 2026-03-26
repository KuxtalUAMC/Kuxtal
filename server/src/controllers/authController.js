const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Conexión a la DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- FUNCIÓN DE REGISTRO ---
exports.signUp = async (req, res) => {
  const { nombre, apPaterno, apMaterno, correo, password, tipoUsuario } = req.body;

  // Validación de seguridad de contraseña en el Servidor
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      message: "La contraseña no cumple con los requisitos de seguridad." 
    });
  }
  
  try {
    // 1. Verificar si el usuario ya existe
    const userExists = await pool.query(
      'SELECT id FROM usuarios WHERE correo_institucional = $1',
      [correo]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Este correo ya está registrado en Kuxtal" });
    }

    // 2. Encriptar la contraseña (Seguridad)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insertar en la tabla 'usuarios'
    const newUser = await pool.query(
      `INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, correo_institucional, password_hash, tipo_usuario, rol) 
       VALUES ($1, $2, $3, $4, $5, $6, 'paciente') RETURNING id`,
      [nombre, apPaterno, apMaterno, correo, passwordHash, tipoUsuario]
    );

    // 4. Crear su perfil de paciente inicial (Tabla relacionada)
    await pool.query(
      'INSERT INTO pacientes_perfil (id_usuario) VALUES ($1)',
      [newUser.rows[0].id]
    );

    res.status(201).json({ message: "Usuario creado exitosamente" });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error en el servidor al registrar" });
  }
};

// --- FUNCIÓN GET ME ---
exports.getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, apellido_paterno, apellido_materno, correo_institucional, tipo_usuario, rol FROM usuarios WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
};

// --- FUNCIÓN DE LOGIN ---
exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // 1. Buscar al usuario
    const userResult = await pool.query(
      'SELECT * FROM usuarios WHERE correo_institucional = $1',
      [correo]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    const user = userResult.rows[0];

    // 2. Comparar contraseña ingresada con el hash de la DB
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 3. Crear el Token de sesión (JWT)
    const token = jwt.sign(
      { id: user.id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // La sesión dura un día
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido_paterno: user.apellido_paterno,
        tipo_usuario: user.tipo_usuario,
        rol: user.rol
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error en el servidor al iniciar sesión" });
  }
};