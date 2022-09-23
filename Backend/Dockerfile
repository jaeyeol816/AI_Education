FROM amd64/node:16

RUN mkdir /app && mkdir /app/logs

RUN apt-get upgrade || : && apt-get install python -y

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]