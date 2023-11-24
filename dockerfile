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

# Build app
RUN yarn build

# ---- Run Stage ----
FROM nginx:1.19.0-alpine AS runner

# Set working directory
WORKDIR /app

# Copy over the artifacts from the build stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./static
COPY --from=builder /app/public ./public

# Copy the Nginx configuration file
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf.template

# Expose port based on the $PORT environment variable
EXPOSE $PORT

# Replace $PORT in Nginx configuration file and start Nginx
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
