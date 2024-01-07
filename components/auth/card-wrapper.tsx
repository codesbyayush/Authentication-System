"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import Header from "@/components/auth/header"
import Social from "@/components/auth/social"
import BackButton from "@/components/auth/back-button"

type Props = {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean
}

function CardWrapper({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
}: Props) {
  return (
    <Card className=" aspect-[3/2] max-w-[450px] w-full">
          <CardHeader>
              <Header label={ headerLabel } />
          </CardHeader>
          <CardContent>
              { children }
          </CardContent>
          {showSocial &&
              <CardFooter>
                  <Social />
              </CardFooter>
          }
          <CardFooter>
              <BackButton
                  label={backButtonLabel}
                  href={backButtonHref}
              />
          </CardFooter>
    </Card>
  )
}

export default CardWrapper