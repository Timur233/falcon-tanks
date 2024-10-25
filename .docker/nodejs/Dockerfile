FROM --platform=linux/amd64 node:latest AS base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

FROM base as init

CMD ["npm", "run", "bootstrap"]

# run exec bash in node container, because bootstrap may ask to answer
#CMD /bin/bash -c "tail -f /dev/null"

FROM base as preview

ARG CLIENT_PORT
ARG SERVER_PORT

EXPOSE $CLIENT_PORT
EXPOSE $SERVER_PORT

ADD .docker/nodejs/start.sh /start.sh
WORKDIR /usr/src/app/packages/client

RUN chmod 775 /start.sh
CMD ["/start.sh"]

FROM base as dev

ARG CLIENT_PORT
ARG SERVER_PORT

EXPOSE $CLIENT_PORT
EXPOSE $SERVER_PORT

ADD .docker/nodejs/startDev.sh /start.sh
WORKDIR /usr/src/app/packages/client

RUN #chmod 775 /start.sh
# comment this for run bash
#CMD ["/start.sh"]
# run exec bash in node container
CMD /bin/bash -c "tail -f /dev/null"

