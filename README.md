# PI-Dogs-new

Este proyecto individual (PI) es acerca de perros, y utiliza la Dog API para obtener información sobre razas de perros y sus características. El proyecto está compuesto por una aplicación cliente (folder "cliente") y una aplicación servidor (folder "api") que se comunican a través de una API REST.

## Requisitos
Antes de comenzar, asegúrese de tener instalado lo siguiente:
<li>Node.js (version 14 o superior)</li>
<li>PostgreSQL (Version 13 o superior)</li>

## Instalación
<ol>
	<li>
		Clonar el repositorio:
<pre><code>git clone https://github.com/marcobejarano/PI-Dogs-new.git</code></pre>
    </li>
    <li>
		Crear un archivo .env en la raíz del proyecto (al mismo nivel que el archivo package.json) y agregar los siguientes datos:
<pre><code>POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=dogs
POSTGRES_HOST=localhost
SERVER_HOST=localhost
SERVER_PORT=3001
API_KEY=live_mYqEuqE22grVm35ZYyKeB25L8Db5CsFPKVhhXktFWQKsaBvdHJlgFFmWtqrpSugq
</code></pre>
		Los datos anteriores son necesarios para configurar la conexión con la base de datos PostgreSQL y la API de la Dog API.
    </li>
	<li>
		Instalar las dependencias del proyecto en las carpetas api y client:
<pre><code>cd api
npm install
</code></pre>
<pre><code>cd ../client
npm install
</code></pre>
	</li>
</ol>

## Uso
Para iniciar el servidor y el cliente, ejecute el siguiente comando tanto en la raíz del folder "api" y en la raíz del folder "cliente":
<pre><code>npm start</code></pre>
Este comando iniciará el servidor en el puerto 3001 y el cliente en el puerto 3000.

## API
El servidor expone los siguientes endpoints:
<ul>
	<li><b>GET /api/v1/dogs:</b> devuelve una lista de todas las razas de perros.</li>
	<li><b>GET /api/v1/dogs/:id:</b> devuelve información detallada sobre una raza de perro específica, identificada por su id.</li>
	<li><b>GET /api/v1/search?name=&lt;name&gt;:</b> devuelve información sobre la lista de perros que contiene la el Dog's API.</li>
	<li><b>POST /api/v1/dogs:</b> permite crear nuevas razas de perro y ser agregadas a la base de datos.</li>
	<li><b>GET /api/v1/temperaments:</b> devuelve y almacena los temperamentos de todas las razas de perros de la Dog API en la tabla "temperaments" de la base de datos "dogs".</li>
</ul>