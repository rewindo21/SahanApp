import { useListener } from "@/hooks/use-automations";
import React from "react";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constants/automations";
import { SubscriptionPlan } from "../../subscription-plan";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending,
  } = useListener(id);

  return (
    <TriggerButton label="سپس">
      <div className="flex flex-col gap-y-2">
        {/* Renders a list of automation listeners, each styled and interactive, with special handling for "SMARTAI" type listeners that are wrapped in a subscription plan component. */}
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === "SMARTAI" ? (
            <SubscriptionPlan key={listener.type} type="PRO">
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? "bg-gradient-to-br from-[#2ECCB4] to-[#17665A]"
                    : "bg-background-80",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#2ECCB4] to-[#17665A]"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}

        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2">
          <Textarea
            placeholder={
              Listener === "SMARTAI"
                ? "Add a prompt that your smart ai can use..."
                : "پیامی که میخواهید به کاربر ارسال شود را اضافه کنید"
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register("reply")}
            placeholder="جوابی برای کامنت بنویسید (اختیاری)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button className="bg-gradient-to-br w-full from-[#229987] font-medium text-white to-[#0B332D]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
