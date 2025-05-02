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
import { useEffect, useRef } from "react";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const hasRedirected = useRef(false); // 👈

  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || isSignedIn) return null;

  return <SignIn />;
}
