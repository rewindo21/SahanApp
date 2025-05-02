export const dynamic = "force-dynamic";

import { getAutomationInfo } from "@/actions/automations";
import PostNode from "@/components/global/automations/post/post-node";
import ThenNode from "@/components/global/automations/then/then-node";
import Trigger from "@/components/global/automations/trigger";
import AutomationBreadCrumb from "@/components/global/bread-crumbs/automations";
import { Warning } from "@/icons";
import { PrefetchUserAutomation } from "@/react-query/prefetch";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  params: { id: string };
};

// This asynchronous function generates metadata for a page by fetching automation information 
// based on the provided ID and returning the automation's name as the page title.
export async function generateMetadata({params}:{params: {id: string}}) {
  const info = await getAutomationInfo(params.id)
  return {
    title: info.data?.name
  }
}

const page = async ({ params }: Props) => {
  // prefetch user automation data
  const query = new QueryClient()
  await PrefetchUserAutomation(query, params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationBreadCrumb id={params.id} />{" "}
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            اگر...
          </div>
          <Trigger id={params.id} />
        </div>
        <ThenNode id={params.id}/>
        <PostNode id={params.id}/>
      </div>
    </HydrationBoundary>
  );
};

export default page;
