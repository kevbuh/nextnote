# FROM node:14

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# # get rid of the star in package*.json
# COPY package.json ./
# COPY yarn.lock ./

# RUN yarn
# # If you are building your code for production
# # RUN npm ci --only=production
# # KEV: ^^^dont run this because we are doing typescript

# # Bundle app source
# COPY . .

# # change the env.production to .env for production
# COPY .env.production .env 

# # yarn build will generate the dist folder
# RUN yarn build 

# ENV NODE_ENV production

# EXPOSE 8080
# CMD [ "node", "dist/index.js" ]
# USER node

FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.production .env

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node