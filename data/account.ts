import { db } from "@/lib/db"

export const getAccountByUserId = async (userId: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                id: userId,
            }
        })
        return user;
    } catch {
        return null;
    }
}