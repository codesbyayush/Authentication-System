import React from 'react'

type Props = {
    label: string
}

function header({
    label
}: Props) {
  return (
      <div className='w-full bg-transparent flex flex-col justify-center items-center py-2 px-8 gap-2'>
          <h1 className='text-center text-4xl font-bold px-4'>
              🔐 Auth
          </h1>
          <p className='text-center text-normal font-medium px-4 pl-6'>
              {label}
          </p>
    </div>
  )
}

export default header