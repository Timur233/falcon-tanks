FROM --platform=linux/amd64 node:20 AS base

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN yes | yarn bootstrap

RUN yarn build
EXPOSE $SERVER_PORT

FROM base AS dev
CMD [ "npm", "run", "dev" ]
# CMD /bin/bash -c "tail -f /dev/null"

FROM base AS prod
CMD [ "npm", "run", "preview" ]
