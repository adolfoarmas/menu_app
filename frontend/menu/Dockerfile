
FROM node:18.12-alpine AS build

WORKDIR /frontend/menu

COPY package.json /frontend/menu
COPY package-lock.json /frontend/menu

RUN npm install --production

COPY . .

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /frontend/menu/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]