"use server"

import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth';
import * as z from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid credentials"}
    }
    
    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.password) {
        return {
            error: "Email does not exist"
        }
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            email,
            verificationToken.token
          )
        return {
            success: "Confirmation email sent!"
        }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if(!code) {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(email, twoFactorToken.token);

            return { twoFactor: true }
        }

        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

        if (!twoFactorToken || twoFactorToken.token !== code){
            return { error: "Invalid code!" };
        }
        const hasExpired = new Date() < new Date(twoFactorToken.expires)
        if (hasExpired) {
            return { error: "Token has Expired" };
        }

        await db.twoFactorToken.delete({
            where: {id: twoFactorToken.id}
        })

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
        );

        if (existingConfirmation) {
            await db.twoFactorConfirmation.delete({
                where: {id: existingConfirmation.id}
            })
        }

        await db.twoFactorConfirmation.create({
            data: {
                userId: existingUser.id
            }
        })
    }

    try {
        await signIn("credentials", {
            email,
            password,
            // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
        return {
            success: " Login Successful"
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong"};
            }
        }
        throw error;
    }
}