"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function DesktopHeader({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="خدمات">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">دستیار اینستاگرام</HoveredLink>
            <HoveredLink href="/">دستیار یوتیوب</HoveredLink>
            <HoveredLink href="/">آنالیز احساس کاربران</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="آموزش">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="آموزش دستیار اینستاگرام"
              href="/"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="چگونه از دستیار اینستا استفاده کنیم برای افزایش فروش"
            />
            <ProductItem
              title="آموزش دستیار یوتیوب"
              href="/"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="چگونه از دستیار یوتیوب استفاده کنیم برای افزایش بازدید"
            />
            <ProductItem
              title="آموزش آنالیز احساس کاربران وبسایت"
              href="/"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="چگونه با سهن رفتار و رضایتمندی کاربران خود را بررسی کنید"
            />
            <ProductItem
              title="برای Developer ها"
              href="/"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="به زودی ..."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="پلن ها">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">رایگان</HoveredLink>
            <HoveredLink href="/">حرفه ای</HoveredLink>
            <HoveredLink href="/">سازمانی</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="درباره سهن">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">درباره ما</HoveredLink>
            <HoveredLink href="/">تیم ما</HoveredLink>
            <HoveredLink href="/">تماس با ما</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export function MobileHeader({ className }: { className?: string }) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (item: string) => {
    setOpenSubmenu(openSubmenu === item ? null : item);
  };

  const submenuItems: { [key: string]: React.ReactNode } = {
    خدمات: (
      <div className="flex flex-col space-y-2 text-base pr-4">
        <HoveredLink href="/">دستیار اینستاگرام</HoveredLink>
        <HoveredLink href="/">دستیار یوتیوب</HoveredLink>
        <HoveredLink href="/">آنالیز احساس کاربران</HoveredLink>
      </div>
    ),
    آموزش: (
      <div className="flex flex-col space-y-2 text-base pr-4">
        <HoveredLink href="/">آموزش دستیار اینستاگرام</HoveredLink>
        <HoveredLink href="/">آموزش دستیار یوتیوب</HoveredLink>
        <HoveredLink href="/">آموزش آنالیز احساس</HoveredLink>
        <HoveredLink href="/">برای Developer ها</HoveredLink>
      </div>
    ),
    "پلن ها": (
      <div className="flex flex-col space-y-2 text-base pr-4">
        <HoveredLink href="/">رایگان</HoveredLink>
        <HoveredLink href="/">حرفه ای</HoveredLink>
        <HoveredLink href="/">سازمانی</HoveredLink>
      </div>
    ),
    "درباره سهن": (
      <div className="flex flex-col space-y-2 text-base pr-4">
        <HoveredLink href="/">درباره ما</HoveredLink>
        <HoveredLink href="/">تیم ما</HoveredLink>
        <HoveredLink href="/">تماس با ما</HoveredLink>
      </div>
    ),
  };

  return (
    <div className="md:hidden my-12">
      <div className="flex flex-col space-y-6">
        {Object.keys(submenuItems).map((item) => (
          <div key={item} className="border-b pb-6">
            <button
              onClick={() => handleSubmenuToggle(item)}
              className="w-full text-right text-xl my-3 font-semibold"
            >
              {item}
            </button>
            <AnimatePresence>
              {openSubmenu === item && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {submenuItems[item]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
