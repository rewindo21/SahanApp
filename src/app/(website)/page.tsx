import { Footer } from "@/components/sections/footer";
import Header from "@/components/sections/header";
// import { InfiniteComment } from "@/components/sections/infiniteComment";
// import { StickyScrollSection } from "@/components/sections/stickyscroll";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquareCheckBig } from "lucide-react";

export default function Home() {
  const plans = [
    {
      name: "پلن رایگان",
      description: "سریعترین روش برای استفاده از سهن",
      price: "بدون هزینه ",
      features: [
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، ستفاده از روزنامه و مقرار گیرد.",
        "اختگی با تولید سادگی نامفهوم از صنعت چاپ، ستفاده از روزنامه",
        "ابا تولید سادگی نامفهوم از ص روزنامهاختگی با تولید ستفاده از روزنامه",
      ],
      cta: "شروع کنید",
    },
    {
      name: "پلن حرفه ای سهن",
      description: "با پیشرفته ترین امکانات",
      price: "2 میلیون تومان ",
      features: [
        "لورم ایپسوما تولید سادگی نامفهوم از صنعت چاپ، ستفاده از روزنامه و مقرار گیرد.",
        "اختگی با تولید سادگی نامفهوم از صنعت چاپ، ستفاده از روزنامه",
        "ابا تولید روزنامهاختگی با تولید سادعت چاپ، ستفاده از روزنامه",
        "ابا تولید سادگی ننامهاختگی با تولید سادعت چاپ، ستفاده از روزنامه",
      ],
      cta: "ارتقا پلن",
    },
  ];

  return (
    <main>
      <section className="relative bg-gradient-to-b from-[#15171A] via-[#17665A] to-bg">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative">
          <div className="container px-4 py-8">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <div className="mx-auto mt-32 max-w-3xl text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                تعامل با کابران خود را با سهن متحول کنید
              </h1>
              <p className="mt-6 text-lg text-blue-200">
                سهن نحوه ارتباط شما با مخاطبان خود در سوشال مدیا را متحول می
                کند. تعامل را بدون زحمت افزایش دهید و تعاملات را به فرصت‌های
                تجاری ارزشمند تبدیل کنید.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#2ECCB4] text-[#ececec] hover:bg-[#229987] font-semibold"
                >
                  شروع کنید
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-400 fonts-semibold text-[#ececec] bg-[#229987]/10 hover:bg-transparent"
                >
                  بیشتر
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
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="container w-full py-12 md:py-24 lg:py-32 bg-background">
        {/* <StickyScrollSection /> */}
        {/* <InfiniteComment /> */}
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              پلن مناسب خود را انتخاب کنید
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              پلن مناسب برای افزایش تعامل اینستاگرام خود را انتخاب کنید
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      / ماهانه
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <SquareCheckBig className="mr-2 ml-2 h-4 w-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{plan.cta}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}
