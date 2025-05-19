import { Resend } from 'resend';
import React from "react";

export const sendEmail = async (
    to: string,
    subject: string,
    template: React.ReactNode | Promise<React.ReactNode>
) => {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        react: template,
    });

    if (error) {
        throw error;
    }

    return data;
};