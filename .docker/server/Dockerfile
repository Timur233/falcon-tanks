FROM --platform=linux/amd64 node:20 AS base

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install

FROM base AS prod
EXPOSE $SERVER_PORT
RUN yarn build
CMD [ "npm", "run", "preview" ]