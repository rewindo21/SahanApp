// import { SignIn } from '@clerk/nextjs'
// import React from 'react'

// type Props = {}

// const Page = (props: Props) => {
//     return(<SignIn />)
// }

// export default Page

// app/sign-in/page.tsx
"use client";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard"); // or your initial redirect logic
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || isSignedIn) return null;

  return <SignIn />;
}
