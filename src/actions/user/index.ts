"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser, updateSubscription } from "./queries";
import { refereshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";
import { stripe } from '@/lib/stripe'

// Function to fetch the currently logged-in user.
// If no user is found, redirect to the sign-in page.
export const onCurrentUser = async () => {
  const user = await currentUser(); // Fetch the current user.

  if (!user) {
    return redirect("/sign-in");
  }

  return user;
};

// Function to onboard the user.
// If the user is already onboarded, check if their token is about to expire.
// If the token is about to expire, refresh the token.
// If the user is not onboarded, create a new user.
export const onBoardUser = async () => {
  const user = await onCurrentUser(); // Fetch the current user.
  try {
    const found = await findUser(user.id);
    if (found) {
      // If the user has active integrations, check their expiration.
      if (found.integrations.length > 0) {
        const today = new Date();
        const time_left =
          found.integrations[0].expiresAt?.getTime()! - today.getTime();
        const days_left = Math.round(time_left / (1000 * 3600 * 24));
        // If the token is about to expire in less than 5 days, refresh it.
        if (days_left < 5) {
          console.log("referesh");
          const referesh = await refereshToken(found.integrations[0].token);
          const today = new Date();
          const expire_date = today.setDate(today.getDate() + 60);
          // Update the integration record with the new token and expiration date.
          const update_token = await updateIntegration(
            found.integrations[0].id,
            referesh.access_token,
            new Date(expire_date)
          );
          if (!update_token) {
            console.log("error updating token");
          }
        }
      }
      // Return the existing user's details with a success status.
      return {
        status: 200,
        data: {
          firstname: found.firstName,
          lastname: found.lastName,
        },
      };
    }
    // If the user does not exist, create a new record.
    const created = await createUser(
      user.id,
      user.firstName!,
      user.lastName!,
      user.emailAddresses![0].emailAddress
    );
    return {
      status: 201,
      data: { created },
    };
  } catch (error) {
    console.log("error onboarding user", error);
    return { status: 500 };
  }
};

// This function retrieves user information by first getting the current user and then fetching their profile.
export const onUserInfo = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    if (profile) return { status: 200, data: profile };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

// COMMENT FOR STRIPE
// Function to subscribe the user to a plan. 
export const onSubscribe = async (session_id: string) => {
  const user = await onCurrentUser() // Fetch the current user.
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session) {
      const subscribed = await updateSubscription(user.id, {
        customerId: session.customer as string,
        plan: 'PRO',
      })

      if (subscribed) return { status: 200 }
      return { status: 401 }
    }
    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}
