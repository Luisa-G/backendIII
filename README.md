# AdoptMe API

Proyecto final para la clase de Backend III en Coderhouse.
Consta de un API para gestionar mascotas, usuarios y las adopciones correspondientes.

## Correr el proyecto
```bash
# iniciar el proyecto
$ npm run start

# iniciar el proyecto en modo desarrollo
$ npm run dev
```

## Correr pruebas
```bash
$ npm run test
```

## Imagen en Dockerhub
Imagen disponible en Dockerhub

[![DockerHub](https://img.shields.io/badge/DockerHub-View-blue)](https://hub.docker.com/repository/docker/luisafg/app-adoption-imagen)

Enlace directo a la imagen:  
`https://hub.docker.com/repository/docker/luisafg/app-adoption-imagen`


## Construcción de la Imagen desde Dockerfile
```bash
# Desde la raíz del proyecto
docker build -t luisafg/app-adoption-imagen:1.0.0 .