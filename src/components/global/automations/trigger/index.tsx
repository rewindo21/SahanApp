'use client'

import { useQueryAutomation } from "@/hooks/user-queries";
import React from "react";
import ActiveTrigger from "./active";
import { Separator } from "@/components/ui/separator";
import ThenAction from "../then/then-action";
import TriggerButton from "../trigger-button";
import { AUTOMATION_TRIGGERS } from "@/constants/automations";
import { useTriggers } from "@/hooks/use-automations";
import { cn } from "@/lib/utils";
import Keywords from "./keywords";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
};

// Trigger displays existing triggers, provides options to add new ones, and allows saving trigger configurations.
const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
  const { data } = useQueryAutomation(id)

  if (data?.data && data?.data?.triggers.length > 0) {
    return (
    <div className="flex flex-col ga-y-6 items-center">
      <ActiveTrigger 
        type={data.data.triggers[0].type}
        keywords={data.data.keywords}
      />

      {data?.data?.triggers.length > 1 && (
        <>
          <div className="relative w-6/12 my-4">
            <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
              یا
            </p>
            <Separator
              orientation="horizontal"
              className="border-muted border-[1px]"
            />
          </div>
          <ActiveTrigger
            type={data.data.triggers[1].type}
            keywords={data.data.keywords}
          />
        </>
      )}

      {!data.data.listener && <ThenAction id={id} />}
    </div>
    )
  }
  return (
    <TriggerButton label="Add Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <div
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              'hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2',
              !types?.find((t: string) => t === trigger.type)
                ? 'bg-background-80'
                : 'bg-gradient-to-br from-[#2ECCB4] font-medium to-[#17665A]'
            )}
          >
            <div className="flex gap-x-2 items-center">
              {trigger.icon}
              <p className="font-bold">{trigger.label}</p>
            </div>
            <p className="text-sm font-light">{trigger.description}</p>
          </div>
        ))}
        <Keywords id={id} />
        <Button
          onClick={onSaveTrigger}
          disabled={types?.length === 0}
          className="bg-gradient-to-br from-[#229987] font-medium text-white to-[#0B332D]"
        >
          <Loader state={isPending}>ایجاد تریگر</Loader>
        </Button>
      </div>
    </TriggerButton>
  )
};

export default Trigger;
