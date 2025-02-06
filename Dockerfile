FROM node:23-alpine3.20

COPY . /app/

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]