<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio


2. crear el archivo constans:

  * urlDB = "url de la base de datos"




3. Ejecutar
  ```
  docker container run \
  --name bk-lenguajes-app \
  -w /app \
  -dp 3000:3000 \
  -v "$(pwd)":/app \
  node:lts-alpine3.17 \
  sh -c "yarn install && yarn start:dev"
  ```




## Stack usado
* MongoDB
* Nest


## Url local:

* http://localhost:3000/api/seed-words