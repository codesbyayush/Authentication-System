import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

type Props = {
    message?: string
}

function FormError({
    message
}: Props) {

    if (!message) return null;

  return (
      <div className="flex justify-center bg-destructive/15 text-destructive py-2 items-center gap-x-3 rounded-sm px-2">
          <ExclamationTriangleIcon className="h-4 w-4"/>
          <p>{ message }</p>
    </div>
  )
}

export default FormError