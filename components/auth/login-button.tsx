"use client"

import { useRouter } from "next/navigation"

type LoginButtonProps = {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean
}

function LoginButton({
    children,
    mode = 'redirect',
    asChild
}: LoginButtonProps) {
    
    const router = useRouter();

    if (mode === 'modal') {
        return (<h1>TODO: Modal SignIn</h1>)
    }


    function clicked() {
        router.push('/auth/signin')
    }

  return (
      <span onClick={clicked} className="cursor-pointer">{ children }</span>
  )
}

export default LoginButton