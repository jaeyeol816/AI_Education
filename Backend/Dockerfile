FROM amd64/node:16

RUN mkdir /app && mkdir /app/logs

RUN apt-get upgrade 

RUN apt-get update

RUN apt-get install python -y

RUN apt-get install python3-pip -y

RUN pip3 install --upgrade pip 

RUN pip3 install google-cloud-language 

RUN pip3 install google

RUN pip3 install google.cloud

RUN pip3 install sklearn

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]