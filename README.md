#docker-mern-app

> Freestyle project using docker with mern stack application

## Content

**[1. Host Volumes and Nodemon](#heading--1)**
**[2. Docker Compose](#heading--2)**

## 1. Host Volumes and Nodemo <a name="heading--1"/>

See set-nodemon branch

### Motivation

> One of the irritating things about testing during development with Docker and ExpressJS is that whenever you change your code, you have to wait for the container to rebuild

### Remediation

> Host volumes sync file changes between a local host folder and a container folder.

> Nodemon is a Node.js package that automatically restarts an application when it detects file changes in one or more specified directories.

> Using a host volume and nodemon, you can set up the Node.js application’s container so it automatically syncs code changes between the container and the local machine.

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

## 2. Docker Compose <a name="heading--1"/>

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
      - ./:/app:ro
      - /app/node_modules
    environment:
      - PORT=8081
    # Alternative for environment ==>
    # env_file:
    #   - ./.env
```

```
docker-compose up -d
```

Or use `--build` flag to forcing docker compose to rebuild the image when there is a change in Dockerfile.

```
docker-compose up -d --build
```

Stop and remove the running containers and remove image.

```
docker-compose down
```

Romove the volumes created for this containers by using `-v` flag.

```
docker-compose down -v
```
