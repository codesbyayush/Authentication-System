'use client'

import { serverActionTestAdmin } from '@/actions/server-action-admin';
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';


function AdminOnlyTest() {

    const onApiRouteClick = () => {
        fetch("/api/admin")
            .then(res => {
                if (res.ok) {
                    toast.success("Successfully Executed")
                } else {
                    toast.error("You are not allowed")
                }})
    }

    const serverActionClick = () => {
        serverActionTestAdmin().then(data => {
            if (data.success) {
                toast.success(data.success);
            } else {
                toast.error(data.error);
            }
        })
    }
  return (
      <div className='flex flex-col gap-2 pt-6'>
          <div className='flex justify-between items-center py-3 shadow-sm px-4 rounded-md'>
              <p className='text-sm font-semibold'>Admin-Only API route</p>
              <Button onClick={onApiRouteClick}>Click to test</Button>
          </div>
          <div className='flex justify-between items-center py-3 shadow-sm px-4 rounded-md'>
              <p className='text-sm font-semibold'>Admin-only Server Action</p>
              <Button onClick={serverActionClick}>Click to test</Button>
          </div>
    </div>
  )
}

export default AdminOnlyTest