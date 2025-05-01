# 1. Use Node.js v22 base and install Bun
FROM node:22.6.0-slim AS base

# Install curl and git (needed by Bun and potentially your dependencies)
RUN apt-get update && apt-get install -y curl git && \
    curl -fsSL https://bun.sh/install | bash && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set PATH for Bun
ENV PATH="/root/.bun/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy dependency files
COPY bun.lockb package.json ./

# Install dependencies using Bun
RUN bun i

# Copy the rest of your project
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build the Next.js project
RUN bun run build

# 2. Final lightweight image for running the app
FROM node:22.6.0-slim AS runner

# Install curl and Bun again in runtime
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://bun.sh/install | bash && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="/root/.bun/bin:$PATH"
ENV NODE_ENV=production

WORKDIR /app

# Copy built files and dependencies from build stage
COPY --from=base /app /app

EXPOSE 3000

# Start the app in dev mode (you said `bun run dev`)
CMD ["bun", "run", "dev"]