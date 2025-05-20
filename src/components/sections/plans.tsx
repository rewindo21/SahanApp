import Link from "next/link";
import { RefObject } from "react";
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

interface PlansProps {
  plansRef: RefObject<HTMLDivElement>;
}

const Plans = ({ plansRef }: PlansProps) => {
  const plans = [
    {
      name: "پلن رایگان",
      description: "سریعترین روش برای استفاده از سهن",
      price: "بدون هزینه",
      features: [
        "آپلود ماهیانه دو فایل ",
        "دسترسی همیشگی به داکیومنت ها",
        "با سرعت معمولی و آنالیز دقیق",
      ],
      cta: "شروع کنید",
    },
    {
      name: "پلن حرفه ای سهن",
      description: "با پیشرفته ترین امکانات",
      price: "2 میلیون تومان ",
      features: [
        "آپلود بینهایت فایل",
        "دسترسی همیشگی به داکیومنت ها ",
        "با سریعترین سرعت و آنالیز دقیق",
      ],
      cta: "به زودی",
    },
  ];

  return (
    <div ref={plansRef} className="container px-4 md:px-16">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          پلن مناسب خود را انتخاب کنید
        </h2>
        <p className="max-w-[900px] text-muted-foreground">
          پلن مناسب برای افزایش تعامل خود با کاربران را انتخاب کنید
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
              <Button className="w-full">
                <Link href="/dashboard">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Plans;
