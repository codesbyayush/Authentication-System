'use client'

import { useCurrentUser } from "@/hooks/use-current-session"
import { AvatarImage, Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { FaUser } from "react-icons/fa"
import LogoutButton from "./logout-button"
import { Button } from "../ui/button"
import { ExitIcon } from "@radix-ui/react-icons"

export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || "" } className="rounded"/>
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className='h-9 w-9 bg-sky-500/30 rounded-[50%] p-2'/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="py-3">
                <LogoutButton>
                    <Button variant='outline' className="flex gap-2 shadow-sm border bg-gray-100 font-semibold">
                        <ExitIcon /> <span>Logout </span>
                    </Button>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}