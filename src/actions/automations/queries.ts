'use server'

import { prisma } from '@/lib/prisma'
import { v4 } from 'uuid'

// Function to create an automation in the database.
export const createAutomation = async (clerkId: string, id?: string) => {
  return await prisma.user.update({
    where: {
      clerkId,
    },
    data: {
      automations: {
        create: {
          ...(id && { id }), // if id exists, add it to the data object
        },
      },
    },
  })
}

// Function to retrieve all automations associated with a specific user from the database.
export const getAutomation = async (clerkId: string) => {
  return await prisma.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      automations: {
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          keywords: true,
          listener: true,
        },
      },
    },
  })
}

// Function to retrieve detailed information for a specific automation by its ID.
export const findAutomation = async (id: string) => {
  return await prisma.automation.findUnique({
    where: {
      id,
    },
    include: {
      keywords: true,
      triggers: true,
      posts: true,
      listener: true,
      user: {
        select: {
          subscription: true,
          integrations: true,
        },
      },
    },
  })
}

// Function to update the name or activation status of a specific automation in the database.
export const updateAutomation = async (
  id: string,
  update: {
    name?: string
    active?: boolean
  }
) => {
  return await prisma.automation.update({
    where: { id },
    data: {
      name: update.name,
      active: update.active,
    },
  })
}

// Function to add a listener to an automation in the database.
export const addListener = async (
  automationId: string,
  listener: 'SMARTAI' | 'MESSAGE',
  prompt: string,
  reply?: string
) => {
  return await prisma.automation.update({
    where: {
      id: automationId,
    },
    data: {
      listener: {
        create: {
          listener,
          prompt,
          commentReply: reply,
        },
      },
    },
  })
}

// Function to add a trigger for an automation in the database.
export const addTrigger = async (automationId: string, trigger: string[]) => {
  // if the trigger array has 2 elements, update the automation with the triggers
  if (trigger.length === 2) {
    return await prisma.automation.update({
      where: { id: automationId },
      data: {
        triggers: {
          createMany: {
            data: [{ type: trigger[0] }, { type: trigger[1] }],
          },
        },
      },
    })
  }
  // else, update the automation with a single trigger
  return await prisma.automation.update({
    where: {
      id: automationId,
    },
    data: {
      triggers: {
        create: {
          type: trigger[0],
        },
      },
    },
  })
}

// Function to add a keyword to an automation in the database.
export const addKeyWord = async (automationId: string, keyword: string) => {
  return prisma.automation.update({
    where: {
      id: automationId,
    },
    data: {
      keywords: {
        create: {
          word: keyword,
        },
      },
    },
  })
}

// Function to delete a keyword from an automation in the database.
export const deleteKeywordQuery = async (id: string) => {
  return prisma.keyword.delete({
    where: { id },
  })
}

// Function to add a post to an automation in the database.
export const addPost = async (
  autmationId: string,
  posts: {
    postId: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'ALBUM'
  }[]
) => {
  return await prisma.automation.update({
    where: {
      id: autmationId,
    },
    data: {
      posts: {
        createMany: {
          data: posts,
        },
      },
    },
  })
}
