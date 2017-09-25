# DockerMonitoring

This project was generated with [generator-ngx-app](https://github.com/angular-starter-kit/generator-ngx-app/)
version 1.2.1

# Getting started

1. Go to project folder and install dependencies:
 ```bash
 npm install
 ```
 
2. Launch development server, and open `localhost:4200` in your browser:
 ```bash
 npm start
 ```
 
 
 # Docker startup
 
 1. Build docker image
 ```bash
  docker build . --tag docker-monitoring-bla --no-cache
  ```
 
 2. Launch Docker , and open `localhost:4200` in your browser:
 ```bash
 docker run --rm --name dm -p 4200:4200 -p 49153:49153 -v /var/run/docker.sock:/var/run/docker.sock docker-monitoring-bla
 ```
