import { Button } from "@/components/ui/button";
import { PLANS } from "@/constants/pages";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

type Props = {
  label: string;
  current: "PRO" | "FREE";
  landing?: boolean;
};

const PaymentCard = ({ current, label, landing }: Props) => {
  return (
    <div
      className={cn(
        label !== current
          ? "bg-in-active"
          : "bg-gradient-to-r from-[#2ECCB4] via-[#229987] to-[#1662A6]",
        "p-[2px] rounded-xl overflow-hidden flex"
      )}
    >
      <div
        className={cn(
          landing && "radial--gradient--pink",
          "flex flex-col rounded-xl pl-5 py-5 pr-10 bg-background-90 h-full"
        )}
      >
        {landing ? (
          <h2 className="text-2xl">
            {label === "PRO" && "Premium Plan"}
            {label === "FREE" && "Standard"}
          </h2>
        ) : (
          <h2 className="text-2xl">
            {label === current
              ? "پلن فعال شما"
              : current === "PRO"
              ? "Downgrade"
              : "فعالسازی پلن ویژه"}
          </h2>
        )}
        <p className="text-text-secondary text-sm mb-2">
          {/* سریعترین روش برای استفاده از سهن{" "} */}
        </p>
        {label === "PRO" ? (
          <span className="bg-gradient-to-r text-3xl from-[#2ECCB4] via-[#229987] to-[#1662A6] bg-clip-text text-transparent">
            پلن حرفه ای سهن
          </span>
        ) : (
          <p className="font-bold mt-2 text-text-secondary">بدون هزینه</p>
        )}
        {label === "PRO" ? (
          <p className="mb-2">
            <b className="text-xl">2 میلیون تومان </b>/ ماهانه
          </p>
        ) : (
          <p className="text-xl mb-2">رایگان</p>
        )}

        {PLANS[label === "PRO" ? 1 : 0].features.map((i) => (
          <p key={i} className="mt-2 text-muted-foreground flex gap-2 ">
            <CircleCheck className="text-indigo-500" />
            {i}
          </p>
        ))}

        {landing ? (
          <Button
            className={cn(
              "rounded-full mt-5",
              label === "PRO"
                ? "bg-gradient-to-r from-indigo-500 text-white via-purple-500 to-pink-500"
                : "bg-background-80 text-white hover:text-background-80"
            )}
          >
            {label === current
              ? "Get Started"
              : current === "PRO"
              ? "Free"
              : "Get Started"}
          </Button>
        ) : (
          <Button
            className="rounded-full mt-5 bg-background-80 text-white hover:text-background-80"
            disabled={label === current}
          >
            {label === current
              ? "فعال"
              : current === "PRO"
              ? "Downgrade"
              : "ارتقا"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
