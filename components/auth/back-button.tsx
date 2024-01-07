import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
    label: string,
    href: string
}

function BackButton({
    label,
    href
}: Props) {
  return (
      <Button
          variant="link"
          size="sm"
          className="font-normal w-full"
          asChild
      >
          <Link
            href={href}
          >
              {label}
          </Link> 
      </Button>
  )
}

export default BackButton