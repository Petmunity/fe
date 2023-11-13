# Dockerfile

# Stage 1 - the build process
FROM node:18-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
# COPY .env.development .env.production
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.17-alpine
COPY --from=build-deps /usr/src/app/.next /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/public /usr/share/nginx/html/public
COPY nginx.conf /etc/nginx/conf.d/default.conf