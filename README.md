## Docker 

Creando el contenedor con la base datos asociando el puerto 3000 al puerto de docker 5432.

docker run --name gs-postgres -e POSTGRES_USER=snick -e POSTGRES_PASSWORD=password -e POSTGRES_DB=gamersectorDB -p 3000:5432 -d postgres

## ENV.template

Mapeo el puerto 3001 a el servidor de express debido a que el 3000 esta asignado a la base de datos.

EXPRESS_PORT=3001
DB_HOST=localhost
DB_PORT=3000
DB_USER=snick
DB_PASSWORD=password
DB_NAME=gamersectorDB

