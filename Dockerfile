FROM node:lts-alpine3.18

WORKDIR /app

COPY package.json .

COPY prisma ./prisma/

ARG NODE_ENV
ARG DATABASE_URL
# RUN if [ "$NODE_ENV" = "development" ]; \
#     then npm install; \
#     else npm install --only=production; \
#     fi
RUN npm install
COPY . ./

ENV PORT 80
EXPOSE $PORT
RUN npm run build
# RUN npm run prisma:deploy
# CMD [ "node", "dist/main.js" ]