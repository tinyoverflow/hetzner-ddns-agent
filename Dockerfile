FROM node:16.15.1-alpine
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

CMD ["npm", "start"]