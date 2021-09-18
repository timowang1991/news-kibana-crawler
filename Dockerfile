FROM node:16-alpine3.12

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["node", "src/server.js"]
