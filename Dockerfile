FROM node:12

WORKDIR /usr/my_app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm","app.js"]