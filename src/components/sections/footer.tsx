import Link from "next/link";
import { Twitter, Github, Instagram, Facebook } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";
import { Container } from "@/components/ui/craft";
import { LogoHomepage } from "@/svgs/logo-homepage";

export const Footer = () => (
  <footer>
    <Container className="grid lg:grid-cols-[5.5fr_1.5fr_0.5fr] border-t">
      <div className="not-prose flex flex-col gap-6">
        <Link
          href="/"
          className="self-center lg:self-start mt-8 mb-2 w-56 rounded-lg flex items-center justify-center"
        >
          <LogoHomepage />
        </Link>
        <p className="text-center lg:text-start">
          <Balancer>
            سهن نحوه ارتباط شما با مخاطبان خود در سوشال مدیا را متحول می کند.
            تعامل را بدون زحمت افزایش دهید و تعاملات را به فرصت‌های تجاری
            ارزشمند تبدیل کنید.
          </Balancer>
        </p>
      </div>
      <div className="text-center place-self-center lg:flex gap-32 mt-8">
        <div className="flex flex-col gap-4 mb-12 lg:mb-0">
          <h5 className="border-b pb-2 w-32">دسترسی سریع</h5>
          <Link href="/">خدمات</Link>
          <Link href="/">محصولات</Link>
          <Link href="/">پلن ها</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="border-b pb-2 w-32">دسترسی سریع</h5>
          <Link href="/privacy-policy">درباره ما</Link>
          <Link href="/terms-of-service">تیم ما</Link>
          <Link href="/cookie-policy">تماس با ما</Link>
        </div>
      </div>
    </Container>

    <Container className="not-prose flex flex-col justify-between gap-6 lg:flex-row md:items-center md:gap-2">
      <div className="flex gap-2 self-center mb-4 lg:mb-0">
        <Button variant="outline" size="icon">
          <Github />
        </Button>
        <Button variant="outline" size="icon">
          <Twitter />
        </Button>
        <Button variant="outline" size="icon">
          <Instagram />
        </Button>
        <Button variant="outline" size="icon">
          <Facebook />
        </Button>
      </div>
      <p className="text-center text-muted-foreground">
        ©<a href="https://github.com/brijr/components">سامانه هوشمند نظرکاوی</a>
        ، تمامی حقوق متعلق به شرکت سهن میباشد
      </p>
    </Container>
  </footer>
);
