FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


# Bundle app source
COPY . .

EXPOSE 3002

CMD [ "node", "app.js" ]