"use server";

import { prisma } from "@/lib/prisma";
import { RESULTS } from "@prisma/client";
import { onUserInfo } from "@/actions/user";
import { NextRequest, NextResponse } from "next/server";

// Function to find a user in the database by their Clerk ID.
// Includes associated subscription and integration details.
export const findUser = async (clerkId: string) => {
  return await prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      subscription: true,
      integrations: {
        select: {
          id: true,
          name: true,
          token: true,
          expiresAt: true,
        },
      },
    },
  });
};

// Function to create a new user in the database.
// Automatically creates a new subscription for the user.
export const createUser = async (
  clerkId: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  return await prisma.user.create({
    data: {
      clerkId,
      firstName,
      lastName,
      email,
      subscription: {
        create: {},
      },
    },
    select: {
      firstName: true,
      lastName: true,
    },
  });
};

// Function to update a user's subscription details.
export const updateSubscription = async (
  clerkId: string,
  props: { customerId?: string; plan?: "PRO" | "FREE" }
) => {
  return await prisma.user.update({
    where: {
      clerkId,
    },
    data: {
      subscription: {
        update: {
          data: {
            ...props, // everything in props
          },
        },
      },
    },
  });
};

export const saveDocAndComments = async (
  originalName: string,
  filename: string,
  comments: string[],
  userId: string
) => {
  // Save doc + comment texts with default result
  const doc = await prisma.docs.create({
    data: {
      filePath: originalName,
      fileName: filename,
      userId, // Save uploader's userId in the Docs table
      comments: {
        create: comments.map((text) => ({
          text,
          accuracy: [0, 0],
        })),
      },
    },
    include: {
      comments: true,
      user: true,
    },
  });

  return doc;
};

// NEW
export async function saveCommentAnalysis(
  commentId: string,
  result: RESULTS,
  accuracy: number[]
) {
  return await prisma.comments.update({
    where: { id: commentId },
    data: {
      result,
      accuracy,
    },
  });
}

// Update Doc rusults input after getting it from AI server
export async function updateDocSentimentCounts(docId: string) {
  // Get all comments for this doc
  const allComments = await prisma.comments.findMany({
    where: { docId },
    select: { result: true },
  });

  const counts = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  allComments.forEach(({ result }) => {
    if (result === "positive") counts.positive += 1;
    else if (result === "negative") counts.negative += 1;
    else counts.neutral += 1;
  });

  return await prisma.docs.update({
    where: { id: docId },
    data: {
      positiveResults: counts.positive,
      negativeResults: counts.negative,
      neutralResults: counts.neutral,
    },
  });
}

// user doc single page <-- NEW
export const getUserDocWithComments = async (docId: string) => {
  const userResponse = await onUserInfo();
  const user = userResponse.data;

  if (!user?.id) return null;

  const doc = await prisma.docs.findUnique({
    where: {
      id: docId,
      userId: user.id,
    },
    select: {
      filePath: true,
      comments: {
        select: {
          id: true,
          text: true,
          result: true,
          accuracy: true,
        },
        orderBy: { id: "asc" },
      },
    },
  });

  return doc;
};
