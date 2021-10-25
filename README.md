# docker-mern-app

> Freestyle project using docker with mern stack application

## Content

**[1. Host Volumes and Nodemon](#heading--1)**

**[2. Docker Compose](#heading--2)**

**[3. Docker Compose with development / production environment ](#heading--3)**


## 1. Host Volumes and Nodemon <a name="heading--1"/>

See set-nodemon branch

### Motivation

> One of the irritating things about testing during development with Docker and ExpressJS is that whenever you change your code, you have to wait for the container to rebuild

### Remediation

> Host volumes sync file changes between a local host folder and a container folder.

> Nodemon is a Node.js package that automatically restarts an application when it detects file changes in one or more specified directories.

> By using a host volume and nodemon, the Node.js application’s container automatically syncs code changes between the container and the local folder.

```
nodemon i --save-dev
```

```
 "scripts": {
    "start": "node app.js",
    "dev": "nodemon -L app.js"
  }
```

```
docker build -t node-app-image .
```

```
docker run -d -p 3000:8081 -e PORT=8081 -v ${pwd}:/app:ro -v /app/node_modules --name node-app node-app-image
```

## 2. Docker Compose <a name="heading--2"/>

See docker-compose branch

### Motivation

> When there are more than one container for an application, shoud create several Docker files and shoud configure many links between this containers. This adds on the load of maintaining them and is also quite time-consuming.

### Remediation

> Docker Compose solves this problem by allowing you to use a YAML file to operate multi-container applications at once.

```
touch docker-compose.yml
```

```
version: "3"
services:
  node-app:
    build: .
    ports:
      - "3000:8081"
    volumes:
      - ./:/app:ro  # automatically syncs the changes between the container and the local folder (like ${pwd}:/app:ro).
      - /app/node_modules # (prevent the node_modules to be syncs)
    environment:
      - PORT=8081
   
```

```
docker-compose up -d
```

Basic docker-compose commands 

````
// create and start containers
docker-compose up
// start services with detached mode
docker-compose -d up
// start specific service
docker-compose up <service-name>
// list images
docker-compose images
// list containers
docker-compose ps
// start service
docker-compose start
// stop services
docker-compose stop
// display running containers
docker-compose top
// kill services
docker-compose kill
// remove stopped containers
docker-compose rm
// stop all contaners and remove images, volumes
docker-compose down
````




## 3. Docker Compose with development / production environment <a name="heading--3"/>

See dev-prod-setup branch

### Motivation

>In a software development lifecycle, there may be as little deployment environments as just development and production. However, there may also be as many as development, integration, testing, staging and production. every environment require special configurations.

### Remediation

>Docker Compose can use environment variables from shell or .env file and it can merge multiple Compose file into one. so by defining the base config in one file `docker-compose.yml` and the specific config in other files(`docker-compose.dev.yml` or `docker-compose.prod.yml`) can deal with a problem without repeating the whole thing (DRY).

`Dockerfile`
```
FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
          then npm install; \
          else npm install --only=production; \
          fi
 
COPY . .
ENV PORT 8081
EXPOSE $PORT
CMD [ "node", "app.js" ]
```
`docker-compose.yml`
```
version: "3"
services:
  node-app:
    build: .
    ports:
      - "3000:8081"
    environment:
      - PORT=8081

```
`docker-compose.dev.yml`
```
version: "3"
services:
  node-app:
    build:
      context: .
      args:
        NODE_ENV: development
    volumes:
        - ./:/app:ro
        - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev

```
```
 docker-compose  -f docker-compose.yml -f docker-compose.dev.yml up -d  --build
```

`docker-compose.prod.yml`
```
version: "3"
services:
  node-app:
    build:
      context: .
      args:
        NODE_ENV: production
    environment:
      - NODE_ENV=production
    command: node app.js
```

```
 docker-compose  -f docker-compose.yml -f docker-compose.prod.yml up -d  --build
```
