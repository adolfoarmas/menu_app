
FROM node:18.12-alpine

WORKDIR /frontend/menu

COPY package.json /frontend/menu

COPY package-lock.json /frontend/menu

RUN npm cache clean --force

RUN apk update && apk add curl

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
