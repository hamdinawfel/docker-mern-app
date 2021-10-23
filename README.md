#docker-mern-app

> Freestyle project using docker with mern stack application

## Content

**[1. Host Volumes and Nodemon](#heading--1)**

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
