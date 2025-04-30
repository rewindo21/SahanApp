import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

// Create or Reuse Prisma Client Instance
export const prisma = globalThis.prisma || new PrismaClient() // in tutorial prisma is defined as client

// If the app is not in production, store the prisma instance in globalThis.prisma.
if(process.env.NODE_ENV !== 'production') globalThis.prisma = prisma