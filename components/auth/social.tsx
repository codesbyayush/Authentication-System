'use client'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useSearchParams } from "next/navigation";



function Social() {

    const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackurl') || "";

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl ||  DEFAULT_LOGIN_REDIRECT
        })
    }
  return (
      <div className="flex items-center w-full gap-x-2">
          <Button
              variant={"outline"}
              size={"lg"}
              className="w-full"
              onClick={() => onClick("google")}
          >
              <FcGoogle className='h-6 w-6'/>
          </Button>
          <Button
              variant={"outline"}
              size={"lg"}
              className="w-full"
              onClick={() => onClick("github")}
          >
              <FaGithub className='h-6 w-6'/>
          </Button>
    </div>
  )
}

export default Social