# 🌿 Kuxtal - Plataforma de Bienestar e Integración Saludable

**Kuxtal** (del maya: *Vida*) es una aplicación web full-stack diseñada para la gestión de salud y bienestar institucional. Permite la interacción entre pacientes (alumnos, académicos, trabajadores) y especialistas (nutriólogos, médicos, etc.).

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca principal para la interfaz.
- **Tailwind CSS**: Framework de estilos para un diseño moderno y responsivo.
- **React Router Dom**: Gestión de navegación y rutas protegidas.
- **Lucide React**: Set de iconos optimizados.
- **FullCalendar**: Integración de calendario para gestión de citas.

### Backend
- **Node.js & Express**: Entorno de ejecución y framework para la API.
- **PostgreSQL**: Base de datos relacional.
- **JWT (JSON Web Token)**: Autenticación segura.
- **Bcrypt**: Encriptación de datos sensibles.

### Infraestructura
- **Docker & Docker Compose**: Contenedores para base de datos, servidor y cliente.

## 📦 Estructura del Proyecto

```text
├── client/              # Frontend en React
│   ├── src/components/  # Componentes reutilizables (Sidebar, Topbar, etc.)
│   ├── src/pages/       # Vistas principales (Home, Auth, Nutrition)
│   └── src/routes/      # Configuración de rutas y protección
├── server/              # Backend en Node.js
│   ├── src/controllers/ # Lógica de negocio
│   ├── src/routes/      # Definición de endpoints de la API
│   └── src/middlewares/ # Validaciones y seguridad (Auth)
├── database/            # Scripts de inicialización SQL
└── docker-compose.yml   # Orquestación de servicios
```

## 🛠️ Instalación y Configuración

### Requisitos Previos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.
- Node.js (opcional, si deseas correrlo localmente sin Docker).

### Levantar con Docker (Recomendado)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/kuxtal.git
   cd Kuxtal
   ```

2. Levanta los contenedores:
   ```bash
   docker-compose up --build
   ```

3. Accede a la aplicación:
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:4000](http://localhost:4000)

## 🔑 Funcionalidades Principales

- **Gestión de Usuarios:** Registro y login con roles diferenciados (Alumno, Académico, Trabajador).
- **Perfiles Especializados:** Perfiles detallados para Pacientes y Especialistas (Cédula, Especialidad).
- **Módulo de Nutrición:** Seguimiento de objetivos nutricionales y datos médicos.
- **Seguridad:** Rutas protegidas que requieren autenticación para acceder al panel principal.

## 📄 Licencia
Este proyecto es propiedad privada. Consulta los términos de uso institucional.
