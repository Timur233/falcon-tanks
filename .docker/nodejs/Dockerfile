FROM --platform=linux/amd64 node:latest AS base


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

FROM base as initProject

ADD .docker/nodejs/start.sh /start.sh
RUN chmod 775 /start.sh
CMD ["/start.sh"]

FROM base as dev

ARG CLIENT_PORT
ARG SERVER_PORT
ARG POSTGRES_PORT

EXPOSE $CLIENT_PORT
EXPOSE "$SERVER_PORT"
EXPOSE "$POSTGRES_PORT"

ADD .docker/nodejs/startDev.sh /start.sh
RUN chmod 775 /start.sh
CMD ["/start.sh"]
