'use server'

import { currentUserRole } from "@/lib/current-user-role"

export const serverActionTestAdmin = async () => {
    const role = await currentUserRole();

    if (role === 'ADMIN')
        return { success: "you have done it" };

    return { error: "It's not for you" };
}