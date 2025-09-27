# 1️⃣ Build Stage
## node:22-alpine (88.8 MB)
FROM node:22-alpine AS builder 

WORKDIR /app

RUN apk add --no-cache curl openssl3

# Copy package.json and install only production dependencies
COPY package.json package-lock.json ./ 

# Clean and install dependencies (including dev dependencies)
RUN npm ci 

# Copy the source code (has docker ignore)
COPY . .

# Prevent RUN command create a new layer
RUN \
    # Generate Prisma Client
    npx prisma generate && \
    # Build the NestJS application
    npm run build && \
    ## Build node_module
    npm ci --omit=dev && \  
    curl -sf https://gobinaries.com/tj/node-prune | sh && \
    node-prune /app/node_modules 

# 2️⃣ Production Stage 
## node:22-alpine (158MB)
FROM node:22-alpine AS runner
ENV NODE_ENV=production

WORKDIR /app

# Copy only necessary files from build stage
## dist: 1.1 MB
COPY --from=builder /app/dist ./dist
## package.json: 4KB
COPY --from=builder /app/package.json ./
## package.json: 496KB
COPY --from=builder /app/package-lock.json ./ 
## node_modules: 282MB
COPY --from=builder /app/node_modules ./node_modules


# Expose the correct port
EXPOSE 8000

# Run the application (408MB)
CMD ["node", "dist/main.js"]

# docker build -t ducvui2003/nestjs-ecommerce:1.0 .                                                  ✔  21:16:34  
# docker push ducvui2003/nestjs-ecommerce:1.0 
