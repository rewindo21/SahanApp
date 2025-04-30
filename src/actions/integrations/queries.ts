"use server"

import { prisma } from "@/lib/prisma" 

// Function to update token and expiration date of an integration.
export const updateIntegration = async (id: string, token: string, expire: Date) => {
    return await prisma.integration.update({
        where: { id },
        data: {
            token,
            expiresAt: expire,
        },
    }) 
}

// Function to get an integration of a user.
export const getIntegration = async (clerkId: string) => {
    return await prisma.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        integrations: {
          where: {
            name: 'INSTAGRAM',
          },
        },
      },
    })
}

// Function to create an integration for a user.
export const createIntegration = async (
    clerkId: string,
    token: string,
    expire: Date,
    igId?: string
  ) => {
    return await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        integrations: {
          create: {
            token,
            expiresAt: expire,
            instagramId: igId,
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
      },
    })
}