import { findAutomation } from "@/actions/automations/queries";
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponses,
} from "@/actions/webhooks/queries";
import { sendDMtoComment, sendDMtoUser } from "@/lib/fetch";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Required for Instagram to validate the webhook.
export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
  // Parse Incoming Webhook Payload as Json
  const webhook_payload = await req.json();

  // checking the received contents against predefined keywords.
  let matcher;
  try {
    // direct messeges
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      );
    }
    // comments
    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text
      );
    }

    if (matcher && matcher.automationId) {
      // We have a matched keyword
      console.log("Matched");

      // Check if the keyword is a direct message
      if (webhook_payload.entry[0].messaging) {
        // Get the automation details
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true
        );

        // Check if the automation has triggers
        if (automation && automation.triggers) {
          // Check If the automation is for simple messages
          if (
            automation.listener &&
            automation.listener.listener === "MESSAGE"
          ) {
            // Send the message
            const direct_message = await sendDMtoUser(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener?.prompt,
              automation.user?.integrations[0].token!
            );

            if (direct_message.status === 200) {
              const tracked = await trackResponses(automation.id, "DM");
              if (tracked) {
                return NextResponse.json(
                  {
                    message: "Message sent",
                  },
                  { status: 200 }
                );
              }
            }
          }

          // If the automation is for AI responses
          if (
            automation.listener &&
            automation.listener.listener === "SMARTAI" &&
            automation.user?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                },
              ],
            });

            // Save the chat history for the user
            if (smart_ai_message.choices[0].message.content) {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text
              );

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content
              );

              await prisma.$transaction([reciever, sender]);

              // Send the message
              const direct_message = await sendDMtoUser(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.user?.integrations[0].token!
              );
              // Track the response
              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "DM");
                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message sent",
                    },
                    { status: 200 }
                  );
                }
              }
            }
          }
        }
      }

      // Check if the keyword is a comment
      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === "comments"
      ) {
        // Get the automation details
        const automation = await getKeywordAutomation(
          matcher.automationId,
          false
        );

        console.log("geting the automations");

        // Get the post details
        const automations_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id!
        );

        console.log("found keyword ", automations_post);

        // Check if the automation has triggers
        if (automation && automations_post && automation.triggers) {
          // Check If the automation is for simple messages
          if (
            automation.listener &&
            automation.listener.listener === "MESSAGE"
          ) {
            // Send the message
            const direct_message = await sendDMtoComment(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].changes[0].value.id,
              automation.listener?.prompt,
              automation.user?.integrations[0].token!
            );
            // Track the response
            if (direct_message.status === 200) {
              const tracked = await trackResponses(automation.id, "COMMENT");
              if (tracked) {
                return NextResponse.json(
                  {
                    message: "Message sent",
                  },
                  { status: 200 }
                );
              }
            }
          }

          // If the automation is for AI responses
          if (
            automation.listener?.listener === "SMARTAI" &&
            automation.user?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                },
              ],
            });

            // Save the chat history for the user
            if (smart_ai_message.choices[0].message.content) {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.from.id,
                webhook_payload.entry[0].changes[0].value.text
              );

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.from.id,
                smart_ai_message.choices[0].message.content
              );

              await prisma.$transaction([reciever, sender]);

              // Send the message
              const direct_message = await sendDMtoComment(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.id,
                automation.listener?.prompt,
                automation.user?.integrations[0].token!
              );
              // Track the response
              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "COMMENT");
                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message sent",
                    },
                    { status: 200 }
                  );
                }
              }
            }
          }
        }
      }
    }

    // If no keyword is matched
    if (!matcher) {
      // Check if the user has a chat history and continue the conversation
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      );

      if (customer_history.history.length > 0) {
        const automation = await findAutomation(customer_history.automationId!);

        if (
          automation?.user?.subscription?.plan === "PRO" &&
          automation.listener?.listener === "SMARTAI"
        ) {
          const smart_ai_message = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "assistant",
                content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
              },
              ...customer_history.history, // Passing customer all history responses
              {
                role: "user",
                content: webhook_payload.entry[0].messaging[0].message.text,
              },
            ],
          });

          if (smart_ai_message.choices[0].message.content) {
            const reciever = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text
            );

            const sender = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content
            );

            await prisma.$transaction([reciever, sender]);

            const direct_message = await sendDMtoUser(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content,
              automation.user?.integrations[0].token!
            );

            if (direct_message.status === 200) {
              return NextResponse.json(
                {
                  message: "Message sent",
                },
                { status: 200 } // must be 200 to avoid errors
              );
            }
          }
        }
      }

      return NextResponse.json(
        {
          message: "No automation set",
        },
        { status: 200 } // must be 200 to avoid errors
      );
    }
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 } // must be 200 to avoid errors
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 } // must be 200 to avoid errors
    );
  }
}
