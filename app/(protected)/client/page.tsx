'use client'

import UserInfo from '../_component/user-info';
import { useCurrentUser } from '@/hooks/use-current-session';


function ServerComponent() {
  const user = useCurrentUser();

  return (
    <div className="flex w-full flex-col">
      <UserInfo
        user={user}
        label='👨‍💻 Client component'
      />
    </div>
  )
}

export default ServerComponent