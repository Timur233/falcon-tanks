FROM --platform=linux/amd64 node:20 AS base

FROM base AS init
# exec bash terminal in container

CMD /bin/bash -c "tail -f /dev/null"

FROM base AS dev
WORKDIR /usr/src/app/packages/server
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY . ./usr/src/app
WORKDIR /usr/src/app
RUN yarn install
RUN yarn build
EXPOSE $SERVER_PORT
CMD [ "npm", "run", "preview" ]