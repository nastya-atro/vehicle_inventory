# to build for linux using
FROM --platform=linux/amd64 node:16 AS builder

# to build for mac using
#FROM node:16 AS builder

COPY package*.json ./

WORKDIR /app

RUN npm install
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
#RUN pnpm install

COPY . .

CMD ["npm", "run", "start:dev"]
