"use client";

import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import { Footer } from "@/components/sections/footer";
import { useRef } from "react";
import Plans from "@/components/sections/plans";
// import { InfiniteComment } from "@/components/sections/infiniteComment";
// import { StickyScrollSection } from "@/components/sections/stickyscroll";

export default function Home() {
  const plansRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <section className="relative bg-gradient-to-b from-[#15171A] via-[#17665A] to-bg">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative">
          <div className="container px-4 py-8">
            <Header />
            <Hero plansRef={plansRef} />
          </div>
        </div>
      </section>
      <section className="container w-full py-12 md:py-24 lg:py-32 bg-background">
        <Plans plansRef={plansRef} />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
