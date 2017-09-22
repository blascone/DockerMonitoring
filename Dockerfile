FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD  docker_monitoring/DockerTest5.ts /usr/src/app/runDockerSocket.ts

RUN npm install -g angular-cli

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app


RUN apt-get update && apt-get install -y curl

RUN curl "https://get.docker.com/builds/`uname -s`/`uname -m`/docker-latest.tgz" > docker.tgz &&\
    tar -xvzf docker.tgz &&\
    mv docker/* /usr/bin &&\
    rm -rf docke*


CMD node /usr/src/app/runDockerSocket.ts & npm start --prefix /usr/src/app

EXPOSE 49153
EXPOSE 4200
