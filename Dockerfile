ARG MODE=production
FROM node:18.15.0-alpine3.17 as build


ARG MODE

WORKDIR /app

#COPY package.json /app/package.json
#COPY package-lock.json /app/package-lock.json
#RUN npm ci

COPY . /app
RUN npm install

ENV NODE_ENV $MODE
RUN npm run build
 # -- --mode $#MODE

FROM nginx:1.16.0-alpine

COPY --from=build /app/dist /opt/site
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]