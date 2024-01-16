"use client"

import { signOut } from "next-auth/react";

type LogoutButtonProps = {
    children: React.ReactNode,
}

function LogoutButton({
    children,
}: LogoutButtonProps) {
    

    function clicked() {
        signOut()
    }

  return (
      <span onClick={clicked} className="cursor-pointer">{ children }</span>
  )
}

export default LogoutButton