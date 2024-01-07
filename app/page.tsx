import LoginButton from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const font = Poppins({
  subsets: ["latin"],
  weight: ['600']
})

export default function Home() {

  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center p-24 bg-sky-500">
      <div className='text-center'>
        <h1 className={cn('text-6xl font-bold pb-6', font.className)}>
          🔐 Auth
        </h1>
        <p className='text-xl font-medium pb-4'>
          Authentication Service
        </p>
      </div>
      <div>
        <LoginButton>
          <Button variant={'secondary'} size={"lg"} className="font-medium">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </main>
  )
}
