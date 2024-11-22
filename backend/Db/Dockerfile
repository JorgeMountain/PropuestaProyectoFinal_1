FROM postgres:15

# Define el directorio de trabajo para inicialización
WORKDIR /docker-entrypoint-initdb.d

# Copia el script SQL de inicialización a la ruta de entrada del contenedor
COPY create-db.sql 10-create-db.sql
