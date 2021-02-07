FROM node:12.18.3

RUN mkdir -p /proj/
WORKDIR /proj/
COPY . /proj/

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]

#Step_1:  docker build -t files .
#Step_2:  docker run --rm --name web -p 3000:3000 -d files
#Step_2:  docker run --rm --name web -p 3000:3000 -v /root/sprite_script_web/node_modules:/proj/node_modules -d files
