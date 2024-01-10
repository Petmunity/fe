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

# Set environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_NAVER_API_KEY 

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_NAVER_API_KEY=$NEXT_PUBLIC_NAVER_API_KEY 

# Build app

RUN yarn lint
RUN yarn build


# ---- Run Stage ----
FROM node:18 AS runner

# Set working directory
WORKDIR /app

# Copy over the artifacts from the build stage
# COPY --from=builder /app ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Start app
CMD ["sh", "-c", "yarn start -p $PORT"]


# CMD ["yarn", "start", "-p", "8080"]