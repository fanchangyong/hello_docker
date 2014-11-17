FROM node:0.10.32
MAINTAINER fanchangyong@gmail.com
ADD . /src
RUN cd /src; npm install; cd -
CMD cd /src; node index.js
