FROM node:alpine
WORKDIR /animedle-client
COPY package.json .
COPY package-lock.json .
RUN npm i && npm i typescript -g
COPY . .
CMD ["npm", "run", "build"]