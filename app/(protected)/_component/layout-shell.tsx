"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import Header from "@/components/auth/header"
import BackButton from "@/components/auth/back-button"
import Navbar from "./navbar"

type Props = {
    children: React.ReactNode,
    headerLabel: string,
}

function LayoutShell({
    children,
    headerLabel,
}: Props) {
  return (
    <Card className=" aspect-[3/2] max-w-[700px] w-full">
          <CardHeader>
              <Header label={ headerLabel } />
          </CardHeader>
          <CardContent>
              <Navbar />
              { children }
          </CardContent>
    </Card>
  )
}

export default LayoutShell