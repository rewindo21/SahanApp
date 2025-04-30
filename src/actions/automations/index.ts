"use server";

import { onCurrentUser } from "../user";
import { findUser } from "../user/queries";
import {
  addKeyWord,
  addListener,
  addPost,
  addTrigger,
  createAutomation,
  deleteKeywordQuery,
  findAutomation,
  getAutomation,
  updateAutomation,
} from "./queries";

// Function to create an automation.
export const createAutomations = async (id?: string) => {
  const user = await onCurrentUser(); // Fetch the current user.
  try {
    const create = await createAutomation(user.id, id); // clerkId and uuid
    if (create) return { status: 200, data: "Automation created" };

    return { status: 404, data: "Oops! something went wrong" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

// Function to get all automations.
export const getAllAutomations = async () => {
  const user = await onCurrentUser(); // Fetch the current user.
  try {
    const automations = await getAutomation(user.id);
    if (automations) return { status: 200, data: automations.automations };

    return { status: 404, data: [] };
  } catch (error) {
    return { status: 500, data: [] };
  }
};

// Function to get detailed information for a single automation by its ID.
export const getAutomationInfo = async (id: string) => {
  await onCurrentUser(); // Ensure the user is authenticated.
  try {
    const automation = await findAutomation(id);
    if (automation) return { status: 200, data: automation };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

// Function to update the name of an automation.
export const updateAutomationName = async (
  automationId: string,
  data: {
    name?: string;
    active?: boolean;
    automation?: string;
  }
) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(automationId, data);
    if (update) {
      return { status: 200, data: "Automation successfully updated" };
    }
    return { status: 404, data: "Oops! could not find automation" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

// Function to save a listener to an automation.
export const saveListener = async (
  autmationId: string,
  listener: "SMARTAI" | "MESSAGE",
  prompt: string,
  reply?: string
) => {
  await onCurrentUser(); // Ensure the user is authenticated.
  try {
    const create = await addListener(autmationId, listener, prompt, reply);
    if (create) return { status: 200, data: "Listener saved" };
    return { status: 404, data: "Cannot save listener" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

// Function to save a trigger for an automation.
export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser(); // Ensure the user is authenticated.
  try {
    const create = await addTrigger(automationId, trigger);
    if (create) return { status: 200, data: "Trigger saved" };
    return { status: 404, data: "Cannot save trigger" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

// Function to save a keyword for an automation.
export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser(); // Ensure the user is authenticated.
  try {
    const create = await addKeyWord(automationId, keyword);

    if (create) return { status: 200, data: "Keyword added successfully" };

    return { status: 404, data: "Cannot add this keyword" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

// Function to delete a keyword from an automation.
export const deleteKeyword = async (id: string) => {
  await onCurrentUser(); // Ensure the user is authenticated.
  try {
    const deleted = await deleteKeywordQuery(id);
    if (deleted)
      return {
        status: 200,
        data: "Keyword deleted",
      };
    return { status: 404, data: "Keyword not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

// retrieve the current user's Instagram profile posts.
// It authenticates the user (`onCurrentUser`), fetches profile data (`findUser`), and
// retrieves the latest 10 posts from Instagram using the user's access token.
// Returns the posts with a 200 status or an error status (404/500) on failure.
export const getProfilePosts = async () => {
  const user = await onCurrentUser(); // Fetch the current user.
  try {
    const profile = await findUser(user.id);
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    );
    const parsed = await posts.json();
    if (parsed) return { status: 200, data: parsed };
    console.log("🔴 Error in getting posts");
    return { status: 404 };
  } catch (error) {
    console.log("🔴 server side Error in getting posts ", error);
    return { status: 500 };
  }
};

// attach posts to a specific automation.
// It ensures the user is authenticated (`onCurrentUser`), saves the posts (`addPost`),
// and returns a success or error message with a corresponding HTTP status code.
export const savePosts = async (
  autmationId: string,
  posts: {
    postId: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "ALBUM";
  }[]
) => {
  await onCurrentUser(); // Ensure the user is authenticated.
  try {
    const create = await addPost(autmationId, posts);

    if (create) return { status: 200, data: "Posts attached" };

    return { status: 404, data: "Automation not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

// activate or deactivate an automation by its ID.
// It ensures the current user is authenticated (`onCurrentUser`), updates the automation state (`updateAutomation`), 
// and returns appropriate success or error messages with corresponding HTTP status codes.
export const activateAutomation = async (id: string, state: boolean) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(id, { active: state });
    if (update)
      return {
        status: 200,
        data: `Automation ${state ? "activated" : "disabled"}`,
      };
    return { status: 404, data: "Automation not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};