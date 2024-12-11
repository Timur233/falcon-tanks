FROM --platform=linux/amd64 node:20 AS base
WORKDIR /usr/src/app
COPY . .
RUN yes | yarn install

FROM base AS build
RUN yarn build

FROM base AS dev
CMD [ "yarn", "run", "dev" ]

FROM --platform=linux/amd64 node:20 AS prod
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/packages/server/ts-dist ./server/ts-dist
COPY --from=build /usr/src/app/packages/client/dist ./client/dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# Ensure .env exists, if it does, copy it, otherwise copy .env.example to .env
RUN if [ -f .env ]; then cp .env .env; else cp .env.example .env; fi

# EXPOSE $SERVER_PORT
CMD [ "node", "server/ts-dist" ]
# CMD /bin/bash -c "tail -f /dev/null"
