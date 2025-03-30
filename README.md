# Internación Cirugía Backend

Este proyecto es una API backend desarrollada con Node.js y MongoDB para gestionar el sistema integral de internación y cirugía.

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir la API REST.
- **MongoDB**: Base de datos NoSQL para almacenar la información.
- **Mongoose**: ODM para interactuar con MongoDB.

## Requisitos previos

- Node.js (versión 18 o superior)
- MongoDB (instancia local o en la nube)

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/usuario/Internacion_Cirugia_Backend.git
    cd Internacion_Cirugia_Backend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno en un archivo `.env`:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/nombre_base_datos
    JWT_SECRET
    ```

4. Inicia el servidor:
    ```bash
    npm start
    ```

## Endpoints principales
- **Pacientes**
  - `GET /api/auth/register`: Registrar usuarios del sistema.
  - `POST /api/auth/login`: Login de usuarios en el sistema.

- **Pacientes**
  - `GET /api/pacientes`: Listar pacientes.
  - `POST /api/paciente`: Crear un nuevo paciente.

- **Camas**
  - `GET /api/camas`: Listar cirugías.
  - `POST /api/cama`: Registrar una nueva cirugía.

## Scripts disponibles

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática.

## Contribuciones

Es la primera version del sistema , sujeta a cambios y actualizaciones de requisitos con base de datos no relacional.
Cada integrante crear su propia rama para trabajar.
¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.