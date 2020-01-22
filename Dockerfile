FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apt-get update && \
    apt-get -y install sudo

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

RUN sudo apt-get install software-properties-common -y

RUN sudo add-apt-repository ppa:jonathonf/ffmpeg-4 && sudo apt install ffmpeg -y

COPY . .

EXPOSE 5000 7575

CMD ["npm", "start"]