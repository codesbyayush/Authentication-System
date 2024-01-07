import CardWrapper from "@/components/auth/card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


function AuthError() {
  return (
    <CardWrapper
      headerLabel="Something went wrong"
      showSocial={false}
      backButtonLabel="Go back to sign in"
      backButtonHref="/auth/signin"
    >
      <div className="flex w-full justify-center items-center text-destructive">
        <ExclamationTriangleIcon className="h-8 w-8" />
      </div>
      </CardWrapper>
  )
}

export default AuthError