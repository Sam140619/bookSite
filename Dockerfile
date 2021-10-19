FROM node:11.6.0-alpine AS builder
WORKDIR /BOOKSITE
COPY . ./BOOKSITE
RUN npm i

RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /BOOKSITE/dist/BOOKSITE/ /usr/share/nginx/html