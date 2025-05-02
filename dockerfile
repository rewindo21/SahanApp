# Use Node.js v22.6.0 and install Bun
FROM node:22.6.0-slim AS base

# Install curl, and unzip
RUN apt-get update && apt-get install -y curl unzip && \
    curl -fsSL https://bun.sh/install | bash && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="/root/.bun/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy dependency files
COPY bun.lockb package.json ./

# Install dependencies
RUN bun i

# Copy the rest of the code
COPY . .

# Generate Prisma client and build
RUN prisma generate && bun run build

# Expose port and run the app
EXPOSE 3000
CMD ["bun", "run", "dev"]