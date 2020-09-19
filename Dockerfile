FROM node:12-slim
LABEL maintainer="mrchoke@gmail.com" demo="Ai4Thai TFace API"


ENV SRC /src

RUN mkdir ${SRC}

ADD . ${SRC}

WORKDIR ${SRC}

RUN yarn install
RUN yarn build

COPY .env ${SRC}/.env

EXPOSE "3000"

CMD ["yarn","start:express"]
