FROM node:16 as builder
WORKDIR '/app'

COPY package.json .
COPY package-lock.json .
RUN npm install -g npm@6.14.8
RUN npm install

COPY . .

RUN mv .env.example .env

ARG BASE_API_URL
ARG BASE_ASSETS_URL

ENV REACT_APP_BASE_API_URL $BASE_API_URL
ENV REACT_APP_BASE_ASSETS_URL $BASE_ASSETS_URL

RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]