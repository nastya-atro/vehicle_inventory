# to build for linux using
FROM --platform=linux/amd64 node:16 AS builder

# to build for mac using
#FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

#
FROM nginx:latest

# copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# copy built application from "builder" image
COPY --from=builder /app/dist/chevoska-cli /usr/share/nginx/html



