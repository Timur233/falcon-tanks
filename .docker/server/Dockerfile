FROM --platform=linux/amd64 node:20 AS base

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install

EXPOSE $SERVER_PORT

FROM base AS dev
CMD [ "npm", "run", "dev" ]

FROM base AS prod
RUN yarn build
CMD [ "npm", "run", "preview" ]