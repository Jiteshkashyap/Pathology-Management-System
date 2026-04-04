FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm" ,"run" , "start"]