// import { SignUp } from '@clerk/nextjs'
// import React from 'react'

// type Props = {}

// const Page = (props: Props) => {
//     return(<SignUp />)
// }

// export default Page








// "use client";
// import { SignUp } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, startTransition } from "react";

// export default function SignUpPage() {
//   const { isLoaded, isSignedIn } = useUser();
//   const router = useRouter();
//   const hasRedirected = useRef(false);

//   useEffect(() => {
//     if (isLoaded && isSignedIn && !hasRedirected.current) {
//       hasRedirected.current = true;
//       startTransition(() => {
//         router.push("/dashboard");
//       });
//     }
//   }, [isLoaded, isSignedIn]);

//   if (!isLoaded || (isLoaded && isSignedIn)) return null;

//   return <SignUp />;
// }







"use client";
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return null;

  return isSignedIn ? null : <SignUp />;
}