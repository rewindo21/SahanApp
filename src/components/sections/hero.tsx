import { RefObject } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface HeroProps {
  plansRef: RefObject<HTMLDivElement>;
}

const Hero = ({ plansRef }: HeroProps) => {
  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto mt-32 max-w-3xl text-center">
      <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
        تعامل با کابران خود را با سهن متحول کنید
      </h1>
      <p className="mt-6 text-lg text-blue-200">
        سهن نحوه ارتباط شما با مخاطبان خود در سوشال مدیا را متحول می کند. تعامل
        را بدون زحمت افزایش دهید و تعاملات را به فرصت‌های تجاری ارزشمند تبدیل
        کنید.
      </p>
      <div className="mt-16 flex justify-center gap-4">
        <Button
          size="lg"
          className="bg-[#2ECCB4] text-[#ececec] hover:bg-[#229987] font-semibold"
        >
          <Link href="/dashboard">شروع رایگان</Link>
        </Button>
        <Button
          onClick={scrollToPlans}
          size="lg"
          variant="outline"
          className="border-gray-400 fonts-semibold text-[#ececec] bg-[#229987]/10 hover:bg-transparent"
        >
          پلن ها
        </Button>
      </div>
      <div className="relative h-40 md:h-96 md:w-full w-full mt-10">
        {/* <Image
      src="/dashboard.png"
      alt="Community member"
      fill
      className="object-cover"
    /> */}
      </div>
    </div>
  );
};

export default Hero;
