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
FROM node:18 AS runner

# Set working directory
WORKDIR /app

# Copy over the artifacts from the build stage
# COPY --from=builder /app ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./static
COPY --from=builder /app/public ./public

# Start app
CMD ["sh", "-c", "yarn start -p $PORT"]


# CMD ["yarn", "start", "-p", "8080"]