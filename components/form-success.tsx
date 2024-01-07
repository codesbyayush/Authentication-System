import { CheckCircledIcon } from "@radix-ui/react-icons"

type Props = {
    message?: string
}

function FormSuccess({
    message
}: Props) {

    if (!message) return null;

  return (
      <div className="flex justify-center bg-green-400/25 text-green-900 py-2 items-center gap-x-3 rounded-sm px-2">
          <CheckCircledIcon className="h-4 w-4"/>
          <p>{ message }</p>
    </div>
  )
}

export default FormSuccess