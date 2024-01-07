import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Hello world',
        html: `<p> Click <a href="${confirmLink}"> here </a> to verify your email</p>`
    })
};

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Reset password',
        html: `<p> Click <a href="${resetLink}"> here </a> to reset your password</p>`
    })
}

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => { 

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: '2FA Code',
        html: `<p> Your 2FA Code is: ${token}</p>`
    })
}