"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import Loader from "../loader";
import { AutomationDuoToneWhite } from "@/icons";
import { useCreateAutomation } from "@/hooks/use-automations";
import { v4 } from "uuid";

type Props = {};

const CreateAutomation = (props: Props) => {
  const mutationId = useMemo(() => v4(), [])

  // create automation in datebase using mutate
  const { mutate, isPending } = useCreateAutomation(mutationId)

  return (
    <Button 
    className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#229987] font-medium to-[#17665A]"
    onClick={ () => mutate({ 
        id: mutationId, 
        name: 'Untitled', 
        keywords: [],
        createdAt: new Date() 
      }) 
    }
    >
      <Loader state={ isPending }>
          <AutomationDuoToneWhite />
          <p className="lg:inline hidden">ایجاد اتوماسیون</p>
      </Loader>
    </Button>
  )
};

export default CreateAutomation;
 