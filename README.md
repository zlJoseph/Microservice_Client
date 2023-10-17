<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1yBJigY_ddinB4UdxHkBSUcrdjyhrpc99" alt="Logo del Proyecto" width="150">
</p>

# API de Registro de Clientes

<p align="center">
  <em>Reto Promart</em>
</p>

<h4 align="center">Un microservicio de API REST para gestionar registros de clientes, consultas por identificador y paginación de clientes.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/AdonisJS-v5.9.0-blue" alt="AdonisJS">
  <img src="https://img.shields.io/badge/Typescript-v4.6.x-blue" alt="Typescript">
  <img src="https://img.shields.io/badge/ORM%20Lucid-v18.4.2-blue" alt="ORM Lucid">
  <img src="https://img.shields.io/badge/MySQL-blue" alt="MySQL">
  <img src="https://img.shields.io/badge/GCP-blue" alt="GCP">
  <img src="https://img.shields.io/badge/Version-v1.0.0-brightgreen" alt="Versión">
</p>

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Prerrequisitos](#prerrequisitos)
3. [Instalación](#instalación)
4. [Contribución](#contribución)
5. [Licencia](#licencia)
6. [Agradecimientos](#agradecimientos)

## Introducción

El microservicio de registro de clientes es una API REST que permite realizar las siguientes operaciones:

- Registro de nuevos clientes y ejecuta eventos por cada cliente creado.
- Consulta de clientes por identificador.
- Recuperación de una lista paginada de clientes.

Este servicio se basa en AdonisJS, Typescript, MySQL y ORM Lucid, y se despliega en Google App Engine.

## Prerrequisitos

- Node >= v16
- Xampp = 8.2.4
- Abrir xampp y correr los modulos Apache y MySQL. Después abrir phpMyAdmin y crear la base de datos `promart` con la codificación `utf8_general_ci`:
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1ax6fwfi0yn4qfxHCOSsaQ9A3TFwG613K" alt="Crear BD">
</p>

## Instalación

1. Clona este repositorio.

```bash
git clone https://github.com/zlJoseph/Microservice_Client.git
cd Microservice_Client
```

2. Instale las dependencias.

```bash
npm install
```

3. Cree un nuevo archivo `.env` y copia el contenido de `.env.example` en el. Configurar con sus credenciales de base de datos si fuese necesario

```ini 
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=2Ya0J0osucHqWMy_01s4R9f8qh6YYRod
APP_KEY_ANALYTICS=COLYqlayPHniVL-F-h8wuz9ht072-ceb
API_ENDPOINT_ANALYTICS=http://127.0.0.1:3001/api/v1
API_KEY=qmmoHpiK0DO4teDNLgI0wQWt6oldKUMBOF180oLpKnAdHogPCSO5gMCpIdxrrHShbu5Yg3VbjG81EXsfPzXNOp0VXE0IRKcdkG2SQB17gqhKUkLdXp703MBdRssreuI6
DRIVE_DISK=local
#Configuración de la base de datos
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME=promart
```
4. Ejecuta las migraciones para crear las tablas de la base de datos(Es necesario cumplir el tercer punto de los prerrequisitos).

```bash
node ace migration:run
```
5. Inicia el servidor de desarrollo.

```bash
node ace serve --watch
```