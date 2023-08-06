FROM node:19-alpine

MAINTAINER xSquaredLabs

RUN apk update && \
    apk add --no-cache \
    git

WORKDIR /one

COPY package*.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

RUN chown -R node /one && chmod -R 740 /one

USER node

ENV NODE_ENV=production

CMD ["npm", "start"]
