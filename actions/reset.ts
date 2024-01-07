"use server"

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetEmailSchema } from "@/schemas";
import * as z from 'zod'


export const reset = async (values: z.infer<typeof ResetEmailSchema>) => {
    const validatedFields = ResetEmailSchema.safeParse(values);

    if (!validatedFields.success) return {
        error: "No user with the email"
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found "}
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        email,
        passwordResetToken.token
    );
    
    return {
        success: "Reset email sent"
    }
}