import { UserRole } from '@prisma/client';
import * as z from 'zod'

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER]))
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }
        if (!data.password && data.newPassword) {
            return false;
        }
        return true;
    }, {
        message: "Both old and new password required!",
        path: ["newPassword"]
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(6,({
        message: "Minimum 6 characters required"
    })),
})

export const ResetEmailSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})