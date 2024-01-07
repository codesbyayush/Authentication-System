"use server"

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { ResetPasswordSchema } from '@/schemas'
import * as z from 'zod'
import bcrypt from 'bcryptjs' 

export const newPassword = async (
    values: z.infer<typeof ResetPasswordSchema>,
    token?: string | null,
) => {

    console.log(token)
    if (!token) {
        return { error: "Missing token!"
        }
    }
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!"}
    }
    
    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Invalid token"
        }
    }
    const hasExpired = new Date() > new Date(existingToken.expires);
    if (hasExpired) {
        return {
            error: "Token expired!"
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist"}
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {
            token
        }
    })

    return {
        success: "Password updated!"
    }
}