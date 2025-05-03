// import { SignIn } from '@clerk/nextjs'
// import React from 'react'

// type Props = {}

// const Page = (props: Props) => {
//     return(<SignIn />)
// }

// export default Page










// "use client";
// import { SignIn } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, startTransition } from "react";

// export default function SignInPage() {
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

//   return <SignIn />;
// }






"use client";

import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRedirected) {
      setHasRedirected(true);
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, hasRedirected, router]);

  if (!isLoaded) return null;
  if (isSignedIn) return null;

  return <SignIn />;
}