# Dockerfile

# Stage 1 - the build process
# FROM node:18-alpine as build-deps
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# # COPY .env.development .env.production
# RUN yarn build

# # Stage 2 - the production environment
# FROM nginx:1.17-alpine
# COPY --from=build-deps /usr/src/app/.next /usr/share/nginx/html
# COPY --from=build-deps /usr/src/app/public /usr/share/nginx/html/public
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# ---- Build Stage ----
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock for utilising Docker cache 
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .
# # COPY .env.development .env.production
# Build app
RUN yarn build


# ---- Run Stage ----
FROM nginx:1.19.0-alpine AS runner

# Set working directory
WORKDIR /app

# Copy over the artifacts from the build stage
COPY --from=builder /app/out ./

# Copy the Nginx configuration file
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
