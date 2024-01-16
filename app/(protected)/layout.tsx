import React from 'react'
import LayoutShell from './_component/layout-shell'
import Navbar from './_component/navbar'

type Props = {
    children: React.ReactNode
}

function ProtectedLayout({
    children
}: Props) {
  return (
      <div className='bg-sky-500 h-full w-full  flex flex-col justify-center items-center gap-4'>
      <Navbar />
      <div className='max-w-[700px] w-full rounded-md bg-white'>
        {children}
      </div>
    </div>
  )
}

export default ProtectedLayout