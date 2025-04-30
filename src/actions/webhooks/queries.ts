import { prisma } from '@/lib/prisma'

// Function to match keyword in database.
export const matchKeyword = async (keyword: string) => {
  return await prisma.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: 'insensitive',
      },
    },
  })
}

// Function to get automation details from the database.
export const getKeywordAutomation = async (
    automationId: string,
    dm: boolean
  ) => {
    return await prisma.automation.findUnique({
      where: {
        id: automationId,
      },
  
      include: {
        dms: dm, // Include DM-specific data if `dm` is true
        triggers: {
          where: {
            type: dm ? 'DM' : 'COMMENT', // Filter triggers based on type (DM or COMMENT)
          },
        },
        listener: true, // Include the listener configuration for the automation
        user: {
          select: {
            subscription: {
              select: {
                plan: true, // Fetch the user's subscription plan (FREE or PRO)
              },
            },
            integrations: {
              select: {
                token: true, // Retrieve API tokens for messaging integrations
              },
            },
          },
        },
      },
    })
}

// Function to get the post details from the database.
export const getKeywordPost = async (postId: string, automationId: string) => {
    return await prisma.post.findFirst({
      where: {
        AND: [{ postId: postId }, { automationId }],
      },
      select: { automationId: true },
    })
}

// Function to track responses to an automation.
// This function increments the commentCount or dmCount based on the type of response.
export const trackResponses = async (
    automationId: string,
    type: 'COMMENT' | 'DM'
  ) => {
    if (type === 'COMMENT') {
      return await prisma.listener.update({
        where: { automationId },
        data: {
          commentsCount: {
            increment: 1,
          },
        },
      })
    }
  
    if (type === 'DM') {
      return await prisma.listener.update({
        where: { automationId },
        data: {
          dmCount: {
            increment: 1,
          },
        },
      })
    }
}

// Function to create a dm for the automation in the database.
export const createChatHistory = (
    automationId: string,
    sender: string,
    receiver: string,
    message: string
  ) => {
    return prisma.automation.update({
      where: {
        id: automationId,
      },
      data: {
        dms: {
          create: {
            receiver,
            senderId: sender,
            message,
          },
        },
      },
    })
}

// Function to get chat history from the database.
export const getChatHistory = async (sender: string, receiver: string) => {
    const history = await prisma.dM.findMany({
      where: {
        AND: [{ senderId: sender }, { receiver }],
      },
      orderBy: { createdAt: 'asc' },
    })
    const chatSession: {
      role: 'assistant' | 'user'
      content: string
    }[] = history.map((chat) => {
      return {
        role: chat.receiver ? 'assistant' : 'user',
        content: chat.message!,
      }
    })
  
    return {
      history: chatSession,
      automationId: history[history.length - 1].automationId,
    }
}