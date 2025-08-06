// filepath: /Users/kurtcalacday/Documents/Projects/NoLimitMarketing/app/api/send-email/route.ts
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"NoLimitMarketing" <no-reply@nolimitemail.com>',
            to: "kurtdenzel51@gmail.com",
            subject: "New Marketing Analysis Submission",
            text: JSON.stringify(data, null, 2),
        });

        console.log('Email sent:', info.messageId);
        return Response.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        const errorMessage = typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error);
        return Response.json({ success: false, error: errorMessage }, { status: 500 });
    }
}