-- Tabla de Usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    correo_institucional VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    tipo_usuario TEXT CHECK (tipo_usuario IN ('alumno', 'academico', 'trabajador')),
    rol TEXT CHECK (rol IN ('paciente', 'especialista', 'admin')),
    estatus BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Perfil Pacientes (Incluyendo datos médicos Opción A)
CREATE TABLE pacientes_perfil (
    id_usuario UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_nacimiento DATE,
    sexo_biologico VARCHAR(20),
    genero VARCHAR(50),
    tipo_sangre VARCHAR(5),
    telefono VARCHAR(15),
    objetivo_nutricional TEXT,
    alergias TEXT,
    padecimientos TEXT,
    antecedentes_familiares TEXT,
    foto_url TEXT
);

-- Tabla Perfil Especialistas
CREATE TABLE especialistas_perfil (
    id_usuario UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    cedula_profesional VARCHAR(50) UNIQUE,
    especialidad VARCHAR(100),
    bio_extracto TEXT,
    rating_promedio DECIMAL(3,2) DEFAULT 0.0,
    foto_url TEXT
);
