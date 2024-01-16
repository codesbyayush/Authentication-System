import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { currentUser } from "@/lib/current-user-server"
import UserInfo from '../_component/user-info';


async function ServerComponent() {
  const user = await currentUser();

  return (
    <div className="flex w-full flex-col">
      <UserInfo
        user={user}
        label='💻 Server component'
      />
    </div>
  )
}

export default ServerComponent