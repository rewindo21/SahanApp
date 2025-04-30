import {
  DesktopHeader,
  MobileHeader,
} from "@/components/sections/landing-header-items";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/global/sheet";
import { LogoHomepage } from "@/svgs/logo-homepage";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      {/* mobile menu */}
      <span className="md:hidden flex justify-between items-center flex-1 gap-x-2">
        <Sheet trigger={<MenuIcon size={36} />} className="" side={"right"}>
          <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
            <div className="px-">
              <MobileHeader />
            </div>
          </div>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="h-12 w-28 rounded-lg flex items-center justify-center">
            <LogoHomepage />
          </div>
        </div>
        <Button className="bg-[#2ECCB4] text-[#262626] hover:bg-[#229987] p-2 text-sm font-semibold">
          <Link href="/dashboard">ثبت نام</Link>
        </Button>
      </span>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-12 w-32 rounded-lg flex items-center justify-center">
            <LogoHomepage />
          </div>
        </div>
        <DesktopHeader />
        <Button className="bg-[#2ECCB4] text-[#262626] hover:bg-[#229987] font-semibold">
          <Link href="/dashboard">ثبت نام</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
