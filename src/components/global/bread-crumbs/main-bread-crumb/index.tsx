import { PAGE_ICON, PAGE_NAME_FA } from "@/constants/pages";

import React from "react";

type Props = {
  page: string;
  slug?: string;
};

const MainBreadCrumb = ({ page, slug }: Props) => {
  return (
    <div className="flex flex-col items-start">
      {page === "Home" && (
        <div className="flex justify-center w-full">
          <div className="py-5 lg:py-5 flex gap-4 items-center">
            <p className="text-text-secondary text-lg">خوش آمدید</p>
            <h2 className="capitalize text-2xl font-medium">{slug}!</h2>
          </div>
        </div>
      )}
      <span className="inline-flex py-5 lg:py-6 gap-x-2 items-center">
        {PAGE_ICON[page.toUpperCase()]}
        <h2 className="font-semibold text-2xl capitalize">
          {PAGE_NAME_FA[page.toUpperCase()] || page}
        </h2>
      </span>
    </div>
  );
};

export default MainBreadCrumb;
