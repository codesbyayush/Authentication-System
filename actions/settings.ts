'use server'

import * as z from 'zod';

import { SettingSchema } from '@/schemas';
import { db } from '@/lib/db'
import { currentUser } from '@/lib/current-user-server';
import { getUserByEmail, getUserById } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';
import bcrypt from 'bcryptjs'
import { update } from '@/auth';

export const settings = async (values: z.infer<typeof SettingSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized!" };
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return { error: "Unauthorized" };
    }

    if (user.isOAuth) {
        values.password = undefined;
        values.isTwoFactorEnabled = undefined;
    }
    
    values.email = undefined;
    //TODO: Updation of email

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

        if (!passwordMatch) return { error: "Incorrect password!" };

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    if (values.email && values.email !== dbUser.email) {
        const existingUser = await getUserByEmail(values.email);
        if (existingUser) {
            return { error: "Email already in use!"}
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        
        return {
            success: "Verification email sent"
        }
    }

    const updatedUser = await db.user.update({
        where: { id: user.id},
        data: {
            ...values
        }
    })

    

    await update({
        user: updatedUser
    });

    return { success: "Profile Updated!" };
}