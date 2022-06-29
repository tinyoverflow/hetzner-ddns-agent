FROM node:16.15.1-alpine
LABEL org.opencontainers.image.authors=tinyoverflow
LABEL org.opencontainers.image.source=https://github.com/tinyoverflow/hetzner-ddns-agent

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

CMD ["npm", "start"]