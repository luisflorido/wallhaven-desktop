FROM node:18

WORKDIR /app

RUN apt-get install && apt-get update -y

RUN apt-get install dpkg fakeroot rpm -y

COPY *.json .

RUN npm install --force

COPY . .

RUN npm run make