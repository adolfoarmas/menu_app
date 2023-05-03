
FROM node:18.12-alpine

WORKDIR /frontend/menu

COPY package.json /frontend/menu

COPY . .

RUN apk update && apt add curl

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
