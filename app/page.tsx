"use client";

import { LandingPage } from "@/components/LandingPage";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  const [emailRoute, setEmailRoute] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  return <ComingSoon />;

  //! This is the original code
  /*
   * This hook handle routing to the correct page after arriving from an email link
   */
  // useEffect(() => {
  //   if (pathname?.startsWith("/member-invite")) {
  //     setEmailRoute("member-invite");
  //     router.push("/member-invite");
  //   }
  //   if (pathname?.startsWith("/confirm-email")) {
  //     setEmailRoute("confirm-email");
  //     router.push("/confirm-email");
  //   }
  // }, []);

  // if (emailRoute) return <></>;
  // return <LandingPage />;
}
