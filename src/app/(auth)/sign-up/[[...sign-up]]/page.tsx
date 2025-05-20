// import { SignUp } from '@clerk/nextjs'
// import React from 'react'

// type Props = {}

// const Page = (props: Props) => {
//     return(<SignUp />)
// }

// export default Page

// app/sign-up/page.tsx

// "use client";
// import { SignUp } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function SignUpPage() {
//   const { isLoaded, isSignedIn } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       router.push("/dashboard"); // or your initial redirect logic
//     }
//   }, [isLoaded, isSignedIn]);

//   if (!isLoaded || isSignedIn) return null;

//   return <SignUp />;
// }

"use client";
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const slug = `${user.firstName ?? ""}${user.lastName ?? ""}`;
      router.push(`/dashboard/${slug}`);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || isSignedIn) return null;

  return <SignUp />;
}
