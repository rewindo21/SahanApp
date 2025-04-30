import { onSubscribe } from "@/actions/user"; // COMMENT FOR STRIPE
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    session_id?: string;
    cancel?: boolean;
  };
};

// A Next.js server component that handles the subscription process.
// It checks the query parameters (`session_id` and `cancel`) to determine the flow:
// - If `session_id` is provided, it attempts to finalize the subscription using `onSubscribe`.
//   - On success (status 200), redirects to `/dashboard`.
//   - On failure, displays an error page with "404" and a generic error message.
// - If `cancel` is present, it displays a cancellation error message.
// It ensures appropriate UX based on the subscription outcome.

// COMMENT FOR STRIPE
const Page = async ({ searchParams: { cancel, session_id } }: Props) => {
  if (session_id) {
    const customer = await onSubscribe(session_id);

    if (customer.status === 200) {
      return redirect("/dashboard");
    }

    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Oppse! Something went wrong</p>
      </div>
    );
  }

  if (cancel) {
    return (
      <div className='"flex flex-col justify-center items-center h-screen w-full"'>
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Oppse! Something went wrong</p>
      </div>
    );
  }
};

export default Page;
