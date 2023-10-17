# API de INVENT - Backend del Panel de Administración 1.0

## Descripción

La API de INVENT es el backend de un panel de administración para una empresa intermediaria de envíos de mercancías llamada INVENT. Este panel está protegido y requiere iniciar sesión para acceder a él. Los trabajadores pueden crear envíos a través de la plataforma, añadiendo información sobre el envío. La API también se integra con una base de datos MySQL para almacenar y recuperar datos relacionados con los envíos.

## Autenticación

La API está protegida y requiere que los usuarios inicien sesión para acceder. Se admiten dos categorías de usuarios: "trabajador" y "administrador".

## Configuración de la Base de Datos

La API de INVENT utiliza MySQL como base de datos para almacenar información sobre envíos, usuarios y compañías transportistas. Asegúrate de seguir estos pasos para configurar correctamente la base de datos:

1. Instala MySQL: Si aún no tienes MySQL instalado, puedes descargarlo desde el sitio web oficial: MySQL Downloads.

2. Crea una Base de Datos: Crea una base de datos en MySQL que utilizará la API. El nombre de la base de datos debe coincidir con el que se especifica en el archivo de configuración .env. Puedes usar una herramienta como MySQL Workbench o ejecutar comandos SQL para crearla.

3. Configuración en el Archivo .env:

Asegúrate de que el archivo .env en la raíz de tu proyecto contenga la configuración correcta para MySQL. Debería tener variables como DB_PORT y JWT SECRET. (Existe un archivo .env.example)

4. MySQL Client en la API: La API de INVENT utiliza un módulo llamado MySQLClient.js para gestionar la conexión a la base de datos. Asegúrate de que este archivo esté configurado para utilizar las variables de entorno del archivo .env y los valores definidos en config.js:

- `address` debería ser "localhost" o la dirección de tu base de datos MySQL.
- `user` debería ser "demo" o el usuario de tu base de datos MySQL.
- `password` debería obtenerse de process.env.DB_PASSWORD o utilizar "password" si no se proporciona en el archivo .env.
- `database` debería ser "invent" o el nombre de tu base de datos MySQL.

## Crear las tablas de la base de datos

1. Ejecuta en la terminal:

- npm run reset

Este comando permite inicializar las tablas en la base de datos utilizando Node.js. Al ejecutar este comando, se conecta a la base de datos y crea las tablas necesarias para el funcionamiento de la API. Este comando debe ser ejecutado una sola vez, antes de utilizar la API por primera vez, o en caso de que se requiera reiniciar las tablas de la base de datos. Este comando ya te crea la base de datos precargada con usuarios y envíos.

## Ejecutar la API

Para ejecutar la API de INVENT, sigue estos pasos:

1. Instalación de Dependencias: Abre una terminal en la raíz de tu proyecto y ejecuta el siguiente comando para instalar las dependencias:

- npm install

2. Iniciar la API: Una vez instaladas las dependencias, puedes iniciar la API con el siguiente comando:

- npm start

La API debería estar en funcionamiento y escuchando en un puerto específico. Puedes acceder a ella a través de las rutas definidas en los controladores.

## Endpoints

### Usuarios

- `POST /user/register`: Registra un nuevo usuario en la plataforma. Los usuarios pueden ser de las categorías "trabajador" o "administrador".

- `POST /user/login`: Inicia sesión en la plataforma.

- `GET /user/:id`: Obtiene la información de un usuario por su ID.

- `GET /users/category/:category`: Obtiene una lista de usuarios por categoría.

### Envíos

- `POST /shipments`: Crea un nuevo envío proporcionando detalles como dirección de destino, código postal, nombres del destinatario y remitente, y peso del envío. La API elegirá automáticamente la empresa transportista y calculará el precio.

- `GET /shipments`: Obtiene una lista de todos los envíos creados.

- `GET /shipments/:id`: Obtiene detalles de un envío por su ID.

- `DELETE /shipments/:id`: Elimina un envío por su ID.

### Empresas Transportistas

- `POST /carrier`: Crea una nueva empresa transportista.

- `GET /carriers`: Obtiene una lista de todas las empresas transportistas.

- `GET /carrier/:id`: Obtiene detalles de una empresa transportista por su ID.

- `PUT /carrier/:id`: Actualiza el nombre de una empresa transportista por su ID.

- `DELETE /carrier/:id`: Elimina una empresa transportista por su ID.

## Tecnologías utilizadas

- Node.js: La plataforma en la que se basa la aplicación.

- Express.js: Un framework web para Node.js, utilizado en la construcción de la API.

- Cors: Un middleware para Express que se utiliza para habilitar las solicitudes de recursos cruzados.

- Dotenv: Un paquete para cargar variables de entorno desde un archivo .env.

- Joi: Una librería de validación de datos para Node.js, utilizada para validar datos en la aplicación.

- JsonWebToken (jsonwebtoken): Una librería para crear y verificar tokens de autenticación JWT.

- Morgan: Un middleware para Express que se utiliza para el registro de solicitudes HTTP.

- mysql2: Un controlador MySQL para Node.js, utilizado para interactuar con la base de datos MySQL.

- mysql2-promise: Una biblioteca que proporciona funciones de promesa para trabajar con mysql2.

- UUID: Una biblioteca para la generación de identificadores únicos (UUID).

- Vitest: Un marco de prueba para aplicaciones Vue 3. Se utiliza para las pruebas del proyecto.
