FROM node:22 AS development

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]