import Link from "next/link";
import { Twitter, Github, Instagram, Facebook } from "lucide-react";
import Image from "next/image";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Button } from "../ui/button";

// Local component imports
import { Section, Container } from "@/components/ui/craft";

// Asset imports
// import Logo from "@/public/logo.svg";

const footerLinks = [
  {
    title: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Integrations", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Changelog", href: "#" },
      { title: "Docs", href: "#" },
      { title: "Linear Method", href: "#" },
      { title: "Download", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About us", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Brand", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Community", href: "#" },
      { title: "Contact", href: "#" },
      { title: "DPA", href: "#" },
      { title: "Terms of service", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { title: "API", href: "#" },
      { title: "Status", href: "#" },
      { title: "GitHub", href: "#" },
    ],
  },
];

export const Footer = () => (
  <footer>
      <Container className="grid gap-12 md:grid-cols-[4.5fr_1.5fr_1.5fr] border-t">
        <div className="not-prose flex flex-col gap-6">
          <Link href="/">
            <h3 className="sr-only">سامانه هوشمند نظرکاوی</h3>
            <div className="h-8 w-8 rounded-lg bg-white text-gray-900 flex items-center justify-center font-bold">
              Sa
            </div>
          </Link>
          <p>
            <Balancer>
            سامانه هوشمند نظرکاوی لورم ایپسوما تولید سادگی نامفهوم از صنعت چاپ، ستفاده از روزنامه و مقرار گیرد. لورم ایپسوما تولید سادگی نامفهوم از صنعت چاپ، ستفاده از روزنامه دگی نامفهوم از صنعت چاپ، ستفاده دگی نامفهوم از صنعت چاپ، ستفاده و مقرار گیرد.
            </Balancer>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="border-b pb-2">دسترسی سریع</h5>
          <Link href="/">خدمات</Link>
          <Link href="/">محصولات</Link>
          <Link href="/">پلن ها</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="border-b pb-2">دسترسی سریع</h5>
          <Link href="/privacy-policy">درباره ما</Link>
          <Link href="/terms-of-service">تیم ما</Link>
          <Link href="/cookie-policy">تماس با ما</Link>
        </div>
      </Container>
      <Container className="not-prose flex flex-col justify-between gap-6 md:flex-row md:items-center md:gap-2">
        <div className="flex gap-2">
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
        <p className="text-muted-foreground">
          ©<a href="https://github.com/brijr/components">سامانه هوشمند نظرکاوی</a>،
          تمامی حقوق متعلق به شرکت سهن میباشد
        </p>
      </Container>
    
  </footer>
);
