FROM node:15
WORKDIR /app
COPY package.json .
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .
ENV PORT 8081
EXPOSE $PORT
CMD [ "npm", "run","dev" ]