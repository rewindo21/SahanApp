import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import React from "react";
import {
  PrefetchUserAutomations,
  PrefetchUserProfile,
} from "@/react-query/prefetch";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const Layout = async ({ children, params }: Props) => {
  //Query client fetch data
  const query = new QueryClient();
  await PrefetchUserProfile(query);
  await PrefetchUserAutomations(query);

  return (
    // This component structure utilizes a HydrationBoundary to manage server-side state
    <HydrationBoundary state={dehydrate(query)}>
      <div className="p-3">
        {/* Sidebar */}
        <Sidebar slug={params.slug} />
        {/* Navbar */}
        <div
          className="
      lg:mr-[250px] 
      lg:pr-10 
     
      flex 
      flex-col 
      overflow-auto
      "
        >
          <Navbar slug={params.slug} />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
